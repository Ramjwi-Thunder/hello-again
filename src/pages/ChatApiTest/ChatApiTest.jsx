import { useState } from "react";
import { sendChatMessage } from "../../util/chat";

function ChatApiTest() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTest = async () => {
        if (!message.trim()) {
            setError("메시지를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setResponse("");
        setError("");

        try {
            const result = await sendChatMessage(message);

            setResponse(result);
        } catch (requestError) {
            console.error(requestError);

            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "알 수 없는 오류가 발생했습니다.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main style={{ padding: "40px" }}>
            <h1>Chat API Test</h1>

            <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="테스트 메시지를 입력하세요."
                rows={5}
                style={{ width: "100%", maxWidth: "600px" }}
            />

            <br />

            <button
                type="button"
                onClick={handleTest}
                disabled={isLoading}
                style={{ marginTop: "12px" }}
            >
                {isLoading ? "응답받는 중..." : "AI에게 보내기"}
            </button>

            {response && (
                <section style={{ marginTop: "24px" }}>
                    <h2>AI 응답</h2>
                    <p>{response}</p>
                </section>
            )}

            {error && (
                <section style={{ marginTop: "24px" }}>
                    <h2>오류</h2>
                    <p>{error}</p>
                </section>
            )}
        </main>
    );
}

export default ChatApiTest;