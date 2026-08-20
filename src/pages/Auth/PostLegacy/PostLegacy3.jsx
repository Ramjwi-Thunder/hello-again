import React from 'react';
import TopBar from '../../../components/common/TopBar';
import { Input as AreaInput } from '../../../components/common/InputBox/InputBox_area';
import SignupStartButton from '../../../components/common/Button/SignupStartButton';
import './PostLegacy3.css';

const PostLegacy3 = ({ onRegistrationNext, onRegistrationBack }) => (
  <div className="ver">
    <TopBar title="사후 등록" onBackClick={onRegistrationBack} />
    <main className="legacy-screen">
      <h2 className="legacy-screen__title">성격과 특징</h2>
      <p className="legacy-screen__subtitle">
        그분만의 말투와 습관을 알려주세요.
        <br />
        대화에 그대로 담아드릴게요.
      </p>
      <section className="legacy-screen__fields">
        <AreaInput inputPlaceholder="성격 및 특징" className="legacy-screen__textarea" />
        <AreaInput inputPlaceholder="관심사 및 취미" className="legacy-screen__textarea" />
        <AreaInput inputPlaceholder="자주 하던 말투나 표현" className="legacy-screen__textarea" />
        <AreaInput inputPlaceholder="특별히 소중하게 여기던 것들" className="legacy-screen__textarea" />
      </section>
    </main>
    <div className="legacy-screen__footer">
      <SignupStartButton text="완료" onClick={onRegistrationNext} />
    </div>
  </div>
);

export default PostLegacy3;
