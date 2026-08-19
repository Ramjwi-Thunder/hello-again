import "./InputBox_text.css";

export const Input = ({
  inputPlaceholder,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="input">
      <div className="text-input">{inputPlaceholder}</div>

      <div className="input-box">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={inputPlaceholder}
        />
      </div>
    </div>
  );
};