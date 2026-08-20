import React from 'react';
import TopBar from '../../../components/common/TopBar';
import { Input as AreaInput } from '../../../components/common/InputBox/InputBox_area';
import SignupStartButton from '../../../components/common/Button/SignupStartButton';
import './PreLegacy3.css';

const PreLegacy3 = ({ onRegistrationNext, onRegistrationBack }) => {
  return (
    <div className="ver">
      <TopBar title="생전 등록" onBackClick={onRegistrationBack} />
      <main className="legacy-screen">
        <h2 className="legacy-screen__title">남기고 싶은 말</h2>
        <p className="legacy-screen__subtitle">사랑하는 사람에게 전하고 싶은 말을 남겨주세요.</p>
        <section className="legacy-screen__fields">
          <AreaInput inputPlaceholder="메시지" className="legacy-screen__textarea" />
        </section>
      </main>
      <div className="legacy-screen__footer">
        <SignupStartButton text="다음" onClick={onRegistrationNext} />
      </div>
    </div>
  );
};

export default PreLegacy3;
