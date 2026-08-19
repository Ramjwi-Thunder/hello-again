import "./Registration.css";

export const Component = ({
  property1 = "off",
  className = "",
  title = "text",
  description = "text",
  onClick,
}) => {
  return (
    <div
      className={`component ${property1} ${className}`.trim()}
      onClick={onClick}
    >
      <div className="component__title">{title}</div>
      <div className="component__description">{description}</div>
    </div>
  );
};
