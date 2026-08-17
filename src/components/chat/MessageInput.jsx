import image from "../../assets/images/plus.svg";
import "./MessageInput.css";
import vector from "../../assets/images/send.svg";

export const MessageInput = () => {
  return (
    <div className="message-input">
      <div className="ic-round-plus">
        <img className="vector" alt="Vector" src={vector} />
      </div>
      <div className="text-wrapper">메시지를 입력하세요</div>
      <div className="iconamoon-send">
        <img className="img" alt="Vector" src={image} />
      </div>
    </div>
  );
};
