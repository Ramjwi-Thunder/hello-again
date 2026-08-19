import './Onboarding_1.css';
import { useState } from 'react';
import { LongButton } from '../../components/common/Button/LongButton';
import grapeImage from '../../assets/images/rolling_grape.svg';

interface OnboardingProps {
  onComplete?: () => void;
}

const steps = [
  {
    title: '다시, 안녕',
    description: '어떤 방식으로 시작할까요?',
  },
  {
    title: '사후 등록',
    description: '소중한 사람을 떠나보낸 유가족이신가요?',
  },
  {
    title: '생전 등록',
    description: '나의 기록을 미리 남겨두고 싶으신가요?',
  },
];

const Onboarding_1 = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const current = steps[currentStep];

  const handlePrimaryAction = () => {
    onComplete?.();
  };

  return (
    <div className="onboarding">
      <div className="onboarding__screen" aria-label={`온보딩 ${currentStep + 1}단계`}>
        <div className="onboarding__hero" aria-hidden="true">
          <img src={grapeImage} alt="" className="onboarding__grape" />
        </div>
      </div>

      <div className="onboarding__content">
        <h1 className="onboarding__title">{current.title}</h1>
        <p className="onboarding__description">
          {current.description}
        </p>
        <div className="onboarding__cards">
          <button type="button" className="onboarding__card onboarding__card--active">
            <span className="onboarding__card-title">사후 등록</span>
            <span className="onboarding__card-description">소중한 사람을 떠나보낸 유가족이신가요?</span>
          </button>
          <button type="button" className="onboarding__card">
            <span className="onboarding__card-title">생전 등록</span>
            <span className="onboarding__card-description">나의 기록을 미리 남겨두고 싶으신가요?</span>
          </button>
        </div>
      </div>

      <div className="onboarding__footer">
        <LongButton
          property1="on"
          className="onboarding__button"
          text="다음"
          onClick={handlePrimaryAction}
        />
      </div>
    </div>
  );
};

export default Onboarding_1;
