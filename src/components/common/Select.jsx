import "./Select.css";
import vector from "../../assets/images/Select/chevron.svg";

export const Input = ({
  inputPlaceholder,
  className,
}) => {
  return (
    <div className={`input ${className}`}>
      <div className="select-input-text">{inputPlaceholder}</div>
      <div className="select-box">
        <div className="select-input-label">Select…</div>
        <div className="chevron">
          <img className="vector" alt="Vector" src={vector} />
        </div>
      </div>
    </div>
  );
};
