import "./LongButton.css";

export const Component = ({ property1 = "on", className }) => {
  return (
    <div className={`component ${property1} ${className}`}>
      <div className="button-label">text</div>
    </div>
  );
};