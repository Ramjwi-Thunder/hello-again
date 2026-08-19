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
                const memoriesContext = memories.length > 0
                    ? memories
                        .map(
                            (memory: {
                                type?: string;
                                title?: string;
                                content?: string;
                                file_name?: string;
                                file_path?: string;
                                mime_type?: string;
                                created_at?: string;
                            }, index: number) => [
                                `Memory ${index + 1}`,
                                `type: ${memory.type ?? ""}`,
                                `title: ${memory.title ?? ""}`,
                                `content: ${memory.content ?? ""}`,
                                `file_name: ${memory.file_name ?? ""}`,
                                `file_path: ${memory.file_path ?? ""}`,
                                `mime_type: ${memory.mime_type ?? ""}`,
                                `created_at: ${memory.created_at ?? ""}`,
                            ].join("\n"),
                        )
                        .join("\n\n")
                    : "No stored memories are available for this memorial.";

                const apiKey = Deno.env.get("OPENAI_API_KEY");

                if (!apiKey) {
                    console.error("OPENAI_API_KEY가 설정되지 않았습니다.");

                    return Response.json(
                        { error: "OPENAI_API_KEY가 설정되지 않았습니다." },
                        { status: 500 },
                    );
                }

                const openAiResponse = await fetch(OPENAI_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: OPENAI_MODEL,
                        input: [
                            "Use the following memorial memories as context when relevant.",
                            "Do not claim details that are not present in the memories.",
                            "",
                            "[Memories context]",
                            memoriesContext,
                            "",
                            "[User message]",
                            message.trim(),
                        ].join("\n"),
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
                    .filter((item: { type?: string }) => item.type === "message")
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
                        (content: { type?: string; text?: string }) =>
                            content.type === "output_text",
                    )
                    .map(
                        (content: { type?: string; text?: string }) =>
                            content.text ?? "",
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