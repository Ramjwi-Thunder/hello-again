import "./InputBox_text.css";

export const Input = ({ inputPlaceholder }) => {
  return (
    <div className="input">
      <div className="text-input">{inputPlaceholder}</div>
      <div className="input-box" />
    </div>
  );
};
