import React from 'react';
import TopBar from '../../../components/common/TopBar';
import { Input as AreaInput } from '../../../components/common/InputBox/InputBox_area';
import SignupStartButton from '../../../components/common/Button/SignupStartButton';
import './PreLegacy2.css';

const PreLegacy2 = ({ onRegistrationNext, onRegistrationBack }) => {
  return (
    <div className="ver">
      <TopBar title="생전 등록" onBackClick={onRegistrationBack} />
      <main className="legacy-screen">
        <h2 className="legacy-screen__title">나의 이야기</h2>
        <p className="legacy-screen__subtitle">
          평소 나의 모습을 남겨주세요.
          <br />
          훗날 가족이 그대로 느낄 수 있게요.
        </p>
        <section className="legacy-screen__fields">
          <AreaInput inputPlaceholder="성격 및 특징" className="legacy-screen__textarea" />
          <AreaInput inputPlaceholder="관심사 및 취미" className="legacy-screen__textarea" />
          <AreaInput inputPlaceholder="자주 하는 말투나 표현" className="legacy-screen__textarea" />
          <AreaInput inputPlaceholder="특별히 소중하게 여기던 것들" className="legacy-screen__textarea" />
        </section>
      </main>
      <div className="legacy-screen__footer">
        <SignupStartButton text="다음" onClick={onRegistrationNext} />
      </div>
    </div>
  );
};

export default PreLegacy2;
