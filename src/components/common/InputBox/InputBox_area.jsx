import "./InputBox_area.css";

export const Input = ({ inputPlaceholder, className }) => {
  return (
    <div className={`input ${className}`}>
      <div className="area-input">{inputPlaceholder}</div>
      <div className="input-box" />
    </div>
  );
};
