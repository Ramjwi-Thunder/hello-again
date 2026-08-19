import React from 'react';
import TopBar from '../../../components/common/TopBar';
import { Input as TextInput } from '../../../components/common/InputBox/InputBox_text';
import { Input as SelectInput } from '../../../components/common/Select';
import SignupStartButton from '../../../components/common/Button/SignupStartButton';
import './PreLegacy1.css';

const PreLegacy1 = ({ onRegistrationNext, onRegistrationBack }) => {
  return (
    <div className="ver">
      <TopBar title="생전 등록" onBackClick={onRegistrationBack} />
      <main className="legacy-screen">
        <h2 className="legacy-screen__title">본인 정보</h2>
        <p className="legacy-screen__subtitle">본인의 정보를 입력해주세요.</p>
        <section className="legacy-screen__fields">
          <TextInput inputPlaceholder="이름" />
          <SelectInput inputPlaceholder="생년월일" />
          <TextInput inputPlaceholder="성별" />
          <TextInput inputPlaceholder="별명 (선택사항)" />
          <TextInput inputPlaceholder="코드" />
        </section>
        <p className="legacy-screen__note">
          추천인 코드로 유가족이 이 기록을 나중에 불러볼 수 있는
          기능은 준비 중이에요.
        </p>
      </main>
      <div className="legacy-screen__footer">
        <SignupStartButton text="다음" onClick={onRegistrationNext} />
      </div>
    </div>
  );
};

export default PreLegacy1;
