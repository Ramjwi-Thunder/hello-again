import "./LongButton.css";

export const LongButton = ({
  property1 = "on",
  className = "",
  text = "text",
  onClick,
  type = "button",
}) => {
  return (
    <button type={type} className={`component ${property1} ${className}`} onClick={onClick}>
      <div className="button-label">{text}</div>
    </button>
  );
};

export default LongButton;
