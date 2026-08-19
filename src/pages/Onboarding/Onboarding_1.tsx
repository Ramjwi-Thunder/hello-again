import './Onboarding_1.css';
import { useState } from 'react';
import { LongButton } from '../../components/common/Button/LongButton';

const onboardingImage1 = new URL('../../assets/images/onboarding-1.png', import.meta.url).href;
const onboardingImage2 = new URL('../../assets/images/onboarding-2.png', import.meta.url).href;
const onboardingImage3 = new URL('../../assets/images/onboarding-3.png', import.meta.url).href;

interface OnboardingProps {
  onComplete?: () => void;
}

const steps = [
  {
    image: onboardingImage1,
    title: '다시, 안녕',
    description: '소중했던 그 사람과 다시 한번 이야기를 나누고\n따뜻했던 기억을 마주하는 시간',
  },
  {
    image: onboardingImage2,
    title: '남겨진 기억을 연결합니다.',
    description: '사진, 글, 목소리에 담긴 소중한 추억들을 모아\n변치 않는 그리움의 기록으로 이어드릴게요.',
  },
  {
    image: onboardingImage3,
    title: '과거에 머무르기 위한 곳이 아닙니다.',
    description: '고인을 대신하는 것이 아니라 남겨진 기억을 통해\n일상의 건강한 힘을 얻으실 수 있도록 돕습니다.',
  },
];

const Onboarding_1 = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const current = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handlePrimaryAction = () => {
    if (isLastStep) {
      onComplete?.();
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  return (
    <div className="onboarding">
      <div className="onboarding__screen" aria-label={`온보딩 ${currentStep + 1}단계`}>
        <img src={current.image} alt={`Onboarding step ${currentStep + 1}`} className="onboarding__image" />
      </div>

      <div className="onboarding__content">
        <h1 className="onboarding__title">{current.title}</h1>
        <p className="onboarding__description">
          {current.description.split('\n').map((line, index) => (
            <span key={`${currentStep}-${index}`}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>

      <div className="onboarding__footer">
        <div className="onboarding__pagination" aria-hidden="true">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`onboarding__dot ${currentStep === index ? 'onboarding__dot--active' : ''}`}
            />
          ))}
        </div>
        <LongButton
          property1={isLastStep ? 'on' : 'off'}
          className="onboarding__button"
          text={isLastStep ? '시작하기' : '다음'}
          onClick={handlePrimaryAction}
        />
      </div>
    </div>
  );
};

export default Onboarding_1;