import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

/**
 * Chat Edge Function에 메시지를 보내고 AI 응답을 받습니다.
 *
 * @param {string} message - 사용자가 입력한 메시지
 * @returns {Promise<string>} AI 응답
 */
export async function sendChatMessage(message) {
    if (typeof message !== "string" || message.trim().length === 0) {
        throw new Error("message가 필요합니다.");
    }

    const { data, error } = await supabase.functions.invoke("chat", {
        body: {
            message: message.trim(),
        },
    });

    if (error) {
        console.error("Chat API error:", error);
        throw new Error("AI 응답을 가져오지 못했습니다.");
    }

    if (!data?.message) {
        throw new Error("AI 응답이 비어 있습니다.");
    }

    return data.message;
}