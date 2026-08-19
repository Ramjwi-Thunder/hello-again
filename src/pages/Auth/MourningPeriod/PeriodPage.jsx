import React, { useState } from 'react';
import TopBar from '../../../components/common/TopBar';
import { LongButton } from '../../../components/common/Button/LongButton';
import './PeriodPage.css';

const PERIOD_OPTIONS = [
  [
    { id: 'recommended', label: '마음이 조금 정리됐다면', value: '추천' },
    { id: 'days', label: '아직 시간이 필요하다면', value: '일수 입력' },
  ],
];

showTopBar: false

const PeriodPage = ({ onMourningPeriodNext, onRegistrationBack }) => {
  const [selectedOption, setSelectedOption] = useState('recommended');

  return (
    <div className="period-page">
      <TopBar title="애도 기간" onBackClick={onRegistrationBack} />

      <main className="period-page__content">
        <h2 className="period-page__title">애도 기간을 설정해주세요.</h2>
        <p className="period-page__description">
          선택한 기간에 맞춰 홈 화면의 기억의 여정 진행률과 특별한 날 알림이 조정돼요.
        </p>

        <section className="period-page__options" aria-label="애도 기간 설정 방식">
          {PERIOD_OPTIONS.map((group, groupIndex) => (
            <div key={groupIndex} className="period-page__option-row">
              {group.map((option) => {
                const isSelected = selectedOption === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`period-page__option${isSelected ? ' period-page__option--selected' : ''}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <span className="period-page__option-label">{option.label}</span>
                    <span className="period-page__option-value">{option.value}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </section>
      </main>

      <div className="period-page__footer">
        <LongButton
  property1="on"
  text="다음"
  onClick={onMourningPeriodNext}
/>
      </div>
    </div>
  );
};

export default PeriodPage;
