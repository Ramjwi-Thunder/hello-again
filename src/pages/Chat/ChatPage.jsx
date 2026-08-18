import React, { useState } from 'react';
import './Chat.css';
import ChatHeader from '../../components/chat/ChatHeader';
import AvatarCircle from '../../components/chat/AvatarCircle';
import { MessageInput } from '../../components/common/MessageInput';
import { sendChatMessage } from '../../util/chat';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    if (isLoading) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
      },
    ]);

    setIsLoading(true);

    try {
      const response = await sendChatMessage(message);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response,
        },
      ]);
    } catch (error) {
      console.error('Chat response error:', error);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'AI 응답을 가져오지 못했습니다.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-page-header">
        <ChatHeader />
      </div>

      <div className="chat-page-content">
        {messages.length === 0 ? (
          <AvatarCircle />
        ) : (
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message chat-message--${message.role}`}
              >
                {message.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-page-bottom">
        <MessageInput
          onSend={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default ChatPage;