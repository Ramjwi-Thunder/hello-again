import { useState } from 'react';
import './RegistrationMain.css';
import { Component as Registration } from '../../components/common/Toggle/Registration';
import SignupStartButton from '../../components/common/Button/SignupStartButton';

function RegistrationMain() {
  const [selected, setSelected] = useState('after');

  return (
    <main className="registration-main" aria-label="등록 메인 화면">
      <section className="registration-main__copy" aria-label="인사말">
        <h1 className="registration-main__title">다시, 안녕</h1>
        <p className="registration-main__subtitle">어떤 방식으로 시작할까요?</p>
      </section>

      <section className="registration-main__options" aria-label="등록 방식 선택">
        <Registration
          property1={selected === 'after' ? 'on' : 'off'}
          className="registration-main__option"
          title="사후 등록"
          description="소중한 사람을 떠나보낸 유가족이신가요?"
          onClick={() => setSelected('after')}
        />
        <Registration
          property1={selected === 'before' ? 'on' : 'off'}
          className="registration-main__option"
          title="생전 등록"
          description="나의 기록을 미리 남겨두고 싶으신가요?"
          onClick={() => setSelected('before')}
        />
      </section>

      <div className="registration-main__footer">
        <SignupStartButton
          text="다음"
          onClick={() => {
            // 등록 메인에서는 선택만 하고, 실제 시작은 다음 단계에서 처리
          }}
        />
      </div>
    </main>
  );
}

export default RegistrationMain;
