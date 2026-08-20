import React from 'react';
import './ChatHeader.css';
import calendarIcon from './calendar.svg';
import starIcon from './star.svg';

function ChatHeader({ title = 'Dear' }) {
  return (
    <div className="chat-header">
      {/* 달력 아이콘 - 왼쪽 */}
      <div className="chat-header-icon chat-header-icon--left">
        <img src={calendarIcon} alt="" />
      </div>

      {/* 제목 - 중앙 */}
      <h1 className="chat-header-title">{title}</h1>

      {/* 별 아이콘 - 오른쪽 */}
      <div className="chat-header-icon chat-header-icon--right">
        <img src={starIcon} alt="" />
      </div>
    </div>
  );
}

export default ChatHeader;
