import "./Toggle_off.css";

export const Input = ({
  inputPlaceholder,
  className,
}) => {
  return (
    <div className={`input ${className}`}>
      <div className="toggle-input">{inputPlaceholder}</div>
      <div className="toggle">
        <div className="ellipse" />
      </div>
    </div>
  );
};
