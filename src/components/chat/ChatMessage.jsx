import React from 'react';
import './ChatMessage.css';

function ChatMessage({ message, isFirstMessage, assistantName = '아무개' }) {
  const isUser = message.role === 'user';
  const time = message.timestamp ? new Date(message.timestamp).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) : '';

  return (
    <div className={`chat-message-wrapper chat-message-wrapper--${message.role}`}>
      {/* 상대방 메시지의 경우 아바타 표시 */}
      {!isUser && isFirstMessage && (
        <div className="chat-message-avatar">
          <div className="chat-message-avatar-placeholder" />
        </div>
      )}

      {/* 상대방 메시지인데 첫 메시지가 아닌 경우 공간 유지 */}
      {!isUser && !isFirstMessage && (
        <div className="chat-message-avatar-spacer" />
      )}

      <div className="chat-message-content-group">
        {/* 상대방 이름 - 첫 메시지일 때만 표시 */}
        {!isUser && isFirstMessage && (
          <div className="chat-message-name">{assistantName}</div>
        )}

        {/* 메시지 말풍선 */}
        <div className="chat-message-bubble">
          {message.content}
        </div>

        {/* 메시지 시간 */}
        {time && (
          <div className={`chat-message-time chat-message-time--${message.role}`}>
            {time}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
