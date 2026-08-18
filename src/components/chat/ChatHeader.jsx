import React from 'react';
import './ChatHeader.css';

function ChatHeader() {
  return (
    <div className="chat-header">
      {/* 달력 아이콘 - 왼쪽 */}
      <div className="chat-header-icon chat-header-icon--left">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </div>

      {/* 제목 - 중앙 */}
      <h1 className="chat-header-title">Dear</h1>

      {/* 별 아이콘 - 오른쪽 */}
      <div className="chat-header-icon chat-header-icon--right">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 10.26 24 10.26 17.55 16.26 19.64 24 12 18.36 4.36 24 6.45 16.26 0 10.26 8.91 10.26 12 2" />
        </svg>
      </div>
    </div>
  );
}

export default ChatHeader;
