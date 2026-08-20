import { useState } from 'react';
import './RegistrationMain.css';
import { Component as Registration } from '../../components/common/Toggle/Registration';
import SignupStartButton from '../../components/common/Button/SignupStartButton';

function RegistrationMain({ onStartRegistration }) {
  const [selected, setSelected] = useState('after');

  return (
    <main className="registration-main" aria-label="등록 메인 화면">

      {/* =========================
          기존 상태바
          기존 프로젝트의 상태바는 건드리지 않음
      ========================= */}

      {/* =========================
          상단 인사말
      ========================= */}
      <section
        className="registration-main__copy"
        aria-label="인사말"
      >
        <h1 className="registration-main__title">
          다시, 안녕
        </h1>

        <p className="registration-main__subtitle">
          어떤 방식으로 시작할까요?
        </p>
      </section>

      {/* =========================
          오른쪽 상단 장식
      ========================= */}
      <div className="registration-main__decoration">
        <div className="registration-main__ellipse registration-main__ellipse--1" />
        <div className="registration-main__ellipse registration-main__ellipse--2" />
      </div>

      {/* =========================
          등록 방식 선택
      ========================= */}
      <section
        className="registration-main__options"
        aria-label="등록 방식 선택"
      >
        <Registration
          property1={selected === 'after' ? 'on' : 'off'}
          className="registration-main__option registration-main__option--after"
          title="사후 등록"
          description="소중한 사람을 떠나보낸 유가족이신가요?"
          onClick={() => setSelected('after')}
        />

        <Registration
          property1={selected === 'before' ? 'on' : 'off'}
          className="registration-main__option registration-main__option--before"
          title="생전 등록"
          description="나의 기록을 미리 남겨두고 싶으신가요?"
          onClick={() => setSelected('before')}
        />
      </section>

      {/* =========================
          다음 버튼
      ========================= */}
      <div className="registration-main__footer">
        <SignupStartButton
          text="다음"
          onClick={() =>
            onStartRegistration?.(
              selected === 'before' ? 'before' : 'after'
            )
          }
        />
      </div>

      {/* =========================
          기존 홈 인디케이터
      ========================= */}
      <div className="registration-main__home-indicator">
        <div className="registration-main__home-indicator-bar" />
      </div>

    </main>
  );
}

export default RegistrationMain;