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
                const { message } = await req.json();

                if (
                    typeof message !== "string" ||
                    message.trim().length === 0
                ) {
                    return Response.json(
                        { error: "message가 필요합니다." },
                        { status: 400 },
                    );
                }

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
                        input: message,
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