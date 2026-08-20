import { useState } from 'react';
import plusIcon from '../../assets/images/plus.svg';
import sendIcon from '../../assets/images/send.svg';
import './MessageInput.css';

export const MessageInput = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    await onSend?.(trimmedMessage);
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="message-input">
      <button
        type="button"
        className="ic-round-plus"
        aria-label="추가"
        disabled={disabled}
      >
        <img src={plusIcon} alt="" />
      </button>

      <input
        type="text"
        className="text-wrapper"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요"
        disabled={disabled}
      />

      <button
        type="button"
        className="iconamoon-send"
        aria-label="메시지 보내기"
        onClick={handleSubmit}
        disabled={disabled || !message.trim()}
      >
        <img src={sendIcon} alt="" />
      </button>
    </div>
  );
};