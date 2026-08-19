import React from 'react';
import TopBar from '../../../components/common/TopBar';
import { Input as TextInput } from '../../../components/common/InputBox/InputBox_text';
import { Input as SelectInput } from '../../../components/common/Select';
import SignupStartButton from '../../../components/common/Button/SignupStartButton';
import './PostLegacy1.css';

const PostLegacy1 = ({ onRegistrationNext, onRegistrationBack }) => {
  return (
    <div className="ver">
      <TopBar title="사후 등록" onBackClick={onRegistrationBack} />
      <main className="legacy-screen">
        <h2 className="legacy-screen__title">기본 정보</h2>
        <p className="legacy-screen__subtitle">기억하고 싶은 분을 입력해주세요.</p>
        <section className="legacy-screen__fields">
          <TextInput inputPlaceholder="이름" />
          <SelectInput inputPlaceholder="관계" />
          <TextInput inputPlaceholder="별명 (선택사항)" />
          <TextInput inputPlaceholder="성별" />
          <SelectInput inputPlaceholder="생년월일" />
          <SelectInput inputPlaceholder="별세일" />
        </section>
      </main>
      <div className="legacy-screen__footer">
        <SignupStartButton text="다음" onClick={onRegistrationNext} />
      </div>
    </div>
  );
};

export default PostLegacy1;
