import React from 'react';
import TopBar from '../../../components/common/TopBar';
import { Input as AreaInput } from '../../../components/common/InputBox/InputBox_area';
import SignupStartButton from '../../../components/common/Button/SignupStartButton';
import './PostLegacy2.css';

const PostLegacy2 = ({ onRegistrationNext, onRegistrationBack }) => (
  <div className="ver">
    <TopBar title="사후 등록" onBackClick={onRegistrationBack} />
    <main className="legacy-screen">
      <h2 className="legacy-screen__title">추억과 마지막 순간</h2>
      <p className="legacy-screen__subtitle">
        그분과의 이야기를 들려주세요.
        <br />
        더 진솔할수록 대화가 자연스러워져요.
      </p>
      <section className="legacy-screen__fields">
        <AreaInput inputPlaceholder="고인과의 추억" className="legacy-screen__textarea" />
        <AreaInput inputPlaceholder="마지막 순간 또는 별세 당시 상황" className="legacy-screen__textarea" />
        <AreaInput inputPlaceholder="장례식 일시 및 장소" className="legacy-screen__textarea" />
      </section>
    </main>
    <div className="legacy-screen__footer">
      <SignupStartButton text="다음" onClick={onRegistrationNext} />
    </div>
  </div>
);

export default PostLegacy2;
