import "./Select.css";
import vector from "../../assets/images/Select/chevron.svg";

export const Input = ({
  inputPlaceholder,
  value,
  onChange,
  options = [],
  className = "",
}) => {
  return (
    <div className={`input ${className}`}>
      <div className="select-input-text">
        {inputPlaceholder}
      </div>

      <div className="select-box">
        <select value={value} onChange={onChange}>
          <option value="">선택</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="chevron">
          <img className="vector" alt="Vector" src={vector} />
        </div>
      </div>
    </div>
  );
};