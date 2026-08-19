import React, { useState } from 'react';
import TopBar from '../../../components/common/TopBar';
import { LongButton } from '../../../components/common/Button/LongButton';
import { supabase } from '../../../lib/supabase';
import './PeriodPage.css';

const PERIOD_OPTIONS = [
  { id: '30', label: '30일', value: 30 },
  { id: '60', label: '60일', value: 60 },
  { id: '90', label: '90일', value: 90 },
];

const PeriodPage = ({
  onMourningPeriodNext,
  onRegistrationBack,
  memorialId,
}) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState('30');

  const [customPeriod, setCustomPeriod] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  const [isCustom, setIsCustom] =
    useState(false);

  const handlePeriodSelect = (value) => {
    setIsCustom(false);
    setSelectedPeriod(String(value));
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    setSelectedPeriod('custom');
  };

  const handleNext = async () => {
    let period;

    if (isCustom) {
      period = Number(customPeriod);
    } else {
      period = Number(selectedPeriod);
    }

    // 기간 유효성 검사
    if (!period || period < 1) {
      alert('애도 기간을 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      // 현재 로그인한 사용자
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        alert('로그인이 필요합니다.');
        return;
      }

      let query = supabase
        .from('memorials')
        .update({
          period: period,
        });

      // memorialId가 있으면 해당 고인에게 저장
      if (memorialId) {
        query = query.eq('id', memorialId);
      } else {
        // memorialId가 없으면 현재 사용자의 가장 최근 고인에게 저장
        query = query
          .eq('user_id', user.id)
          .order('created_at', {
            ascending: false,
          })
          .limit(1);
      }

      const { error } = await query;

      if (error) {
        console.error(
          '애도 기간 저장 실패:',
          error
        );

        alert(
          '애도 기간 저장에 실패했습니다.'
        );

        return;
      }

      console.log(
        '애도 기간 저장 성공:',
        period
      );

      // 홈으로 이동
      onMourningPeriodNext?.();
    } catch (error) {
      console.error(
        '애도 기간 저장 중 오류:',
        error
      );

      alert(
        '오류가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="period-page">
      <TopBar
        title="애도 기간"
        onBackClick={onRegistrationBack}
      />

      <main className="period-page__content">
        <h2 className="period-page__title">
          애도 기간을 설정해주세요.
        </h2>

        <p className="period-page__description">
          선택한 기간에 맞춰 홈 화면의 기억의
          여정 진행률이 조정돼요.
        </p>

        <section
          className="period-page__options"
          aria-label="애도 기간 설정"
        >
          {PERIOD_OPTIONS.map((option) => {
            const isSelected =
              !isCustom &&
              selectedPeriod === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`period-page__option${
                  isSelected
                    ? ' period-page__option--selected'
                    : ''
                }`}
                onClick={() =>
                  handlePeriodSelect(
                    option.value
                  )
                }
              >
                <span className="period-page__option-label">
                  {option.label}
                </span>

                <span className="period-page__option-value">
                  {isSelected ? '선택됨' : ''}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            className={`period-page__option${
              isCustom
                ? ' period-page__option--selected'
                : ''
            }`}
            onClick={handleCustomSelect}
          >
            <span className="period-page__option-label">
              직접 설정
            </span>

            <span className="period-page__option-value">
              {isCustom ? '입력하기' : ''}
            </span>
          </button>

          {isCustom && (
            <div
              style={{
                marginTop: '12px',
                width: '100%',
              }}
            >
              <input
                type="number"
                min="1"
                value={customPeriod}
                onChange={(event) =>
                  setCustomPeriod(
                    event.target.value
                  )
                }
                placeholder="기간을 입력해주세요"
                style={{
                  width: '100%',
                  height: '52px',
                  padding: '0 16px',
                  borderRadius: '14px',
                  border: '1px solid #E5E7EB',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />

              <p
                style={{
                  marginTop: '8px',
                  fontSize: '13px',
                  color: '#888',
                }}
              >
                원하는 애도 기간을 일 단위로
                입력해주세요.
              </p>
            </div>
          )}
        </section>
      </main>

      <div className="period-page__footer">
        <LongButton
          property1="on"
          text={
            isLoading
              ? '저장 중...'
              : '다음'
          }
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default PeriodPage;