import "./InputBox_pw.css";

export const Input = ({
  inputPlaceholder,
  className,
}) => {
  return (
    <div className={`input ${className}`}>
      <div className="password-input">{inputPlaceholder}</div>
      <div className="input-box" />
    </div>
  );
};
