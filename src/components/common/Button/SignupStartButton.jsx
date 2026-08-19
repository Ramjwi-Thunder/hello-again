import "./SignupStartButton.css";

const SignupStartButton = ({ text, className = "", ...props }) => {
  return (
    <button className={`signup-start-button ${className}`.trim()} {...props}>
      <span className="signup-start-button__text">{text}</span>
    </button>
  );
};

export default SignupStartButton;
