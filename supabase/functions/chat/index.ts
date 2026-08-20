import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-5.6";

export default {
    fetch: withSupabase(
        { auth: ["publishable", "secret"] },
        async (req) => {
            if (req.method === "OPTIONS") {
                return new Response("ok", { headers: corsHeaders });
            }

            if (req.method !== "POST") {
                return Response.json(
                    { error: "POST 요청만 허용됩니다." },
                    { status: 405 },
                );
            }

            try {
                const { message, chatRoomId } = await req.json();

                if (
                    typeof message !== "string" ||
                    message.trim().length === 0
                ) {
                    return Response.json(
                        { error: "message가 필요합니다." },
                        { status: 400 },
                    );
                }

                if (
                    typeof chatRoomId !== "string" ||
                    chatRoomId.trim().length === 0
                ) {
                    return Response.json(
                        { error: "chatRoomId가 필요합니다." },
                        { status: 400 },
                    );
                }

                const supabaseUrl = Deno.env.get("SUPABASE_URL");
                const authorization = req.headers.get("authorization");
                const publishableKey = req.headers.get("apikey");

                if (!supabaseUrl || !authorization || !publishableKey) {
                    console.error(
                        "Supabase 인증 또는 환경 설정이 누락되었습니다.",
                    );

                    return Response.json(
                        { error: "Supabase 인증을 확인할 수 없습니다." },
                        { status: 500, headers: corsHeaders },
                    );
                }

                const memoriesResponse = await fetch(
                    `${supabaseUrl}/rest/v1/rpc/get_chat_memories`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: authorization,
                            apikey: publishableKey,
                        },
                        body: JSON.stringify({
                            p_chat_room_id: chatRoomId,
                        }),
                    },
                );

                const memoriesData = await memoriesResponse.json();

                if (!memoriesResponse.ok) {
                    console.error("Memories RPC error:", memoriesData);

                    return Response.json(
                        {
                            error:
                                memoriesResponse.status === 401 ||
                                memoriesResponse.status === 403
                                    ? "채팅방에 접근할 수 없습니다."
                                    : "추억 데이터를 불러오지 못했습니다.",
                        },
                        {
                            status:
                                memoriesResponse.status === 401 ||
                                memoriesResponse.status === 403
                                    ? 403
                                    : 500,
                            headers: corsHeaders,
                        },
                    );
                }

                const memories = Array.isArray(memoriesData)
                    ? memoriesData
                    : [];

                const formattedMemories = [];

                // ✅ 맵(map) 대신 비동기 통신(fetch)을 순차적으로 처리하기 위해 for문 사용
                for (let i = 0; i < memories.length; i++) {
                    const memory = memories[i];
                    let imageUrl = "";

                    // 1. 사진(photo)인 경우 Supabase Storage API를 호출해 임시 URL(Signed URL) 생성
                    if (
                        (memory.type === "photo" || memory.mime_type?.startsWith("image/")) &&
                        memory.file_path
                    ) {
                        try {
                            const signRes = await fetch(
                                `${supabaseUrl}/storage/v1/object/sign/archive-files/${memory.file_path}`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: authorization,
                                        apikey: publishableKey,
                                    },
                                    body: JSON.stringify({ expiresIn: 60 }), // 60초 동안만 유효한 임시 주소
                                }
                            );

                            if (signRes.ok) {
                                const signData = await signRes.json();
                                if (signData.signedURL) {
                                    // Supabase가 반환한 상대 경로에 기본 URL을 붙여서 완전한 인터넷 주소로 만듦
                                    imageUrl = `${supabaseUrl}/storage/v1${signData.signedURL}`;
                                }
                            }
                        } catch (err) {
                            console.error("Signed URL 생성 실패:", err);
                        }
                    }

                    // 2. AI에게 전달할 Context 문자열 조립
                    formattedMemories.push(
                        [
                            `Memory ${i + 1}`,
                            `type: ${memory.type ?? ""}`,
                            `title: ${memory.title ?? ""}`,
                            `content: ${memory.content ?? ""}`,
                            `file_name: ${memory.file_name ?? ""}`,
                            // imageUrl이 생성되었다면 image_url 전달, 아니면 기존 file_path 전달
                            imageUrl ? `image_url: ${imageUrl}` : `file_path: ${memory.file_path ?? ""}`,
                            `mime_type: ${memory.mime_type ?? ""}`,
                            `created_at: ${memory.created_at ?? ""}`,
                        ].join("\n")
                    );
                }

                const memoriesContext = formattedMemories.length > 0
                    ? formattedMemories.join("\n\n")
                    : "No stored memories are available for this memorial.";

                const apiKey = Deno.env.get("OPENAI_API_KEY");

                if (!apiKey) {
                    console.error("OPENAI_API_KEY가 설정되지 않았습니다.");

                    return Response.json(
                        { error: "OPENAI_API_KEY가 설정되지 않았습니다." },
                        { status: 500 },
                    );
                }

                // ✅ 프롬프트(input)에 image_url을 확인하라는 규칙 추가
                const input = `
당신은 사용자의 추억보관소에 저장된 정보를 참고해 답변하는 AI입니다.

아래의 기억 정보는 참고 자료입니다.
'image_url'이 포함된 경우, 반드시 해당 인터넷 주소로 접속해 사진 내용을 직접 확인하고 답변에 활용하세요.
기억에 없는 내용은 추측하거나 만들어내지 마세요.

[Memory Context]
${memoriesContext}

[User Message]
${message}

[Response Rules]
- 자연스러운 한국어 대화체로 답하세요.
- Markdown blockquote(>)를 사용하지 마세요.
- 문장이나 문단 앞에 ">" 기호를 붙이지 마세요.
- 기억 원문을 인용하더라도 ">" 없이 일반 텍스트로 작성하세요.
- 기억에 없는 사실은 "확인할 수 없습니다"라고 말하세요.
`;

                const openAiResponse = await fetch(OPENAI_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: OPENAI_MODEL,
                        input: input,
                    }),
                });

                const data = await openAiResponse.json();

                if (!openAiResponse.ok) {
                    console.error("OpenAI API error:", data);

                    return Response.json(
                        {
                            error: "OpenAI API 호출에 실패했습니다.",
                        },
                        { status: 502 },
                    );
                }

                const outputText = (data.output ?? [])
                    .filter(
                        (item: { type?: string }) =>
                            item.type === "message",
                    )
                    .flatMap(
                        (
                            item: {
                                content?: Array<{
                                    type?: string;
                                    text?: string;
                                }>;
                            },
                        ) => item.content ?? [],
                    )
                    .filter(
                        (content: {
                            type?: string;
                            text?: string;
                        }) => content.type === "output_text",
                    )
                    .map(
                        (content: {
                            type?: string;
                            text?: string;
                        }) => content.text ?? "",
                    )
                    .join("");

                return Response.json(
                    {
                        message: outputText,
                    },
                    {
                        headers: corsHeaders,
                    },
                );
            } catch (error) {
                console.error("Chat function error:", error);

                return Response.json(
                    { error: "서버에서 요청을 처리하지 못했습니다." },
                    { status: 500 },
                );
            }
        },
    ),
};