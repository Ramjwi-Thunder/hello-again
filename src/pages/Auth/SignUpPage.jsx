import React, { useState } from "react";
import "./SignUpPage.css";
import rightChevron from "../../assets/images/auth/right_chevron.svg";

const Property1Off = ({ className, ...props }) => (
  <div
    className={`property-1-off-placeholder ${className || ""}`}
    {...props}
  ></div>
);

const SignUpStartButton = ({ text, className, ...props }) => (
  <button className={className || ""} {...props}>
    <span className="signup-start-button__text">{text}</span>
  </button>
);

export default function SignUpPage({ onStartHome }) {
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    sensitiveInfo: false,
  });

  const allAgreed = Object.values(agreements).every(Boolean);

  const terms = [
    {
      key: "termsOfService",
      text: "(필수) 서비스 이용약관 동의",
      vector: rightChevron,
      itemClass: "service-terms",
      detailClass: "service-terms-detail",
      textClass: "div",
      vectorWrapClass: "vector",
    },
    {
      key: "privacyPolicy",
      text: "(필수) 개인정보 수집 및 이용 안내",
      vector: rightChevron,
      itemClass: "privacy-policy",
      detailClass: "privacy-policy-2",
      textClass: "div",
      vectorWrapClass: "vector",
    },
    {
      key: "sensitiveInfo",
      text: "(필수) 민감정보 처리 동의",
      vector: rightChevron,
      itemClass: "terms-agreement",
      detailClass: "terms-agreement-2",
      textClass: "sensitive-info-2",
      vectorWrapClass: "vector",
    },
  ];

  const handleAgreeAll = () => {
    const newValue = !allAgreed;
    setAgreements({
      termsOfService: newValue,
      privacyPolicy: newValue,
      sensitiveInfo: newValue,
    });
  };

  const handleAgreementChange = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="div-wrapper">
      <div className="NEW-statusbar-instance" />

      <p className="agreement-notice">
        서비스 이용을 위해
        <br />
        약관 내용을 확인해주세요!
      </p>

      <div className="all-terms-agreement" onClick={handleAgreeAll}>
        <Property1Off className={`check ${allAgreed ? "checked" : ""}`} />
        <div className="text-wrapper">약관 전체동의</div>
      </div>

      <div className="terms-stack">
        {terms.map((term) => (
          <div className={term.itemClass} key={term.key}>
            <div className={term.detailClass}>
              <Property1Off
                className={`property-1-off ${agreements[term.key] ? "checked" : ""}`}
                onClick={() => handleAgreementChange(term.key)}
              />
              <div className={term.textClass} onClick={() => handleAgreementChange(term.key)}>
                {term.text}
              </div>
            </div>
            <img className={term.vectorWrapClass} alt="Vector" src={term.vector} />
          </div>
        ))}
      </div>

      <SignUpStartButton
        className={`signup-start-button ${allAgreed ? "on" : "off"}`}
        text="동의하고 시작하기"
        disabled={!allAgreed}
        onClick={onStartHome}
      />

      <div className="NEW-home-indicator" />
    </div>
  );
}
