import "./Toggle_on.css";

export const Input = ({
  inputPlaceholder,
  className,
}) => {
  return (
    <div className={`input ${className}`}>
      <div className="toggle-on-input">{inputPlaceholder}</div>
      <div className="toggle">
        <div className="ellipse" />
      </div>
    </div>
  );
};
