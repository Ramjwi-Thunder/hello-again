import React from 'react';
import './Chat.css';
import ChatHeader from '../../components/chat/ChatHeader';
import AvatarCircle from '../../components/chat/AvatarCircle';
import { MessageInput } from '../../components/common/MessageInput';

function ChatPage() {
  return (
    <div className="chat-page">
      {/* 헤더 영역 */}
      <div className="chat-page-header">
        <ChatHeader />
      </div>

      {/* 콘텐츠 영역 - 중앙에 아바타 표시 */}
      <div className="chat-page-content">
        <AvatarCircle />
      </div>

      {/* 하단 메시지 입력 필드 */}
      <div className="chat-page-bottom">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatPage;
