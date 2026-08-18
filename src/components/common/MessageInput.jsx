import plusIcon from '../../assets/images/plus.svg';
import sendIcon from '../../assets/images/send.svg';
import './MessageInput.css';

export const MessageInput = () => {
  return (
    <div className="message-input">
      <div className="ic-round-plus">
        <img src={plusIcon} alt="" />
      </div>

      <div className="text-wrapper">메시지를 입력하세요</div>

      <div className="iconamoon-send">
        <img src={sendIcon} alt="" />
      </div>
    </div>
  );
};