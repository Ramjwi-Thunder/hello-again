import React, { useEffect, useState } from 'react';
import './HomePage.css';

import galleryIcon from '../../assets/images/gallery.svg';
import memoryIcon from '../../assets/images/memory.svg';
import Notification from '../../components/home/notification';

import rollingGrape from '../../assets/images/rolling_grape.svg';
import chevronSmall from '../../assets/images/chevron_small.svg';

import { supabase } from '../../lib/supabase';

const quickPromptText = '오늘의 감정이나 기억을\n자유롭게 남겨보세요';

function StartChatButton({ onStartChat }) {
  return (
    <button type="button" className="homepage_cta" onClick={onStartChat}>
      대화 시작하기
    </button>
  );
}

function JourneyProgressCard({ onGoToSettings, period }) {
  // 현재 진행 일수
  // 우선 기존 화면과 동일하게 8일을 사용합니다.
  // 추후 created_at을 기준으로 실제 경과일을 계산할 수 있습니다.
  const journeyDays = 8;

  // DB의 period 값 사용
  const totalDays = Number(period) || 30;

  const progressPercent = Math.min(
    100,
    Math.round((journeyDays / totalDays) * 100)
  );

  return (
    <section
      className="homepage_progress-card"
      aria-label="기억의 여정 진행률"
      onClick={onGoToSettings}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onGoToSettings?.();
        }
      }}
    >
      <div className="homepage_progress-title-row">
        <h2 className="homepage_progress-title">
          기억의 여정 진행률
        </h2>

        <div className="homepage_progress-percent">
          {progressPercent}%
        </div>
      </div>

      <div className="homepage_progress-count">
        <span className="homepage_progress-count-current">
          {journeyDays}
        </span>

        <span className="homepage_progress-count-total">
          / {totalDays}일
        </span>
      </div>

      <div
        className="homepage_progress-track"
        aria-hidden="true"
      >
        <div
          className="homepage_progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <button
        type="button"
        className="homepage_progress-period"
        onClick={(event) => {
          event.stopPropagation();
          onGoToSettings?.();
        }}
      >
        <span>진행 기간</span>

        <span className="homepage_progress-period-value">
          {totalDays}일
          <img
            src={chevronSmall}
            alt=""
            className="homepage_progress-chevron"
            aria-hidden="true"
          />
        </span>
      </button>
    </section>
  );
}

function MemoryPromptCard({ onGoToHistory }) {
  return (
    <article
      className="homepage_memory-card homepage_memory-card--prompt"
      onClick={onGoToHistory}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onGoToHistory?.();
        }
      }}
      aria-label="새로운 기억 남기기"
    >
      <p className="homepage_memory-card-text">
        {quickPromptText}
      </p>

      <img
        src={memoryIcon}
        alt=""
        className="homepage_memory-illustration"
        aria-hidden="true"
      />
    </article>
  );
}

function MemoryStoryCard({ onOpenArchive }) {
  return (
    <article
      className="homepage_memory-card homepage_memory-card--story"
      onClick={onOpenArchive}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenArchive?.();
        }
      }}
      aria-label="기억 보러가기"
    >
      <p className="homepage_memory-card-text homepage_memory-card-text--story">
        2018.08.16.
        {'\n'}
        '강릉'에서 기억 보러 가기
      </p>

      <img
        src={galleryIcon}
        alt=""
        className="homepage_memory-illustration"
        aria-hidden="true"
      />
    </article>
  );
}

function HomeHero({ name }) {
  return (
    <section className="homepage_hero" aria-label="인사말">
      <div className="homepage_hero-copy">
        <h1 className="homepage_title">
          다시, 안녕
        </h1>

        <p className="homepage_subtitle">
          안녕하세요, {name || 'ㅇㅇ'}님
          {'\n'}
          오늘은 어떤 이야기를 나누고 싶으신가요?
        </p>
      </div>

      <div className="homepage_notification-wrap">
        <Notification unreadCount={1} />
      </div>

      <div
        className="homepage_profile-badge"
        aria-hidden="true"
      >
        <span className="homepage_profile-dot" />
      </div>
    </section>
  );
}

function HomePage({
  onStartChat,
  onOpenArchive,
  onGoToHistory,
  onGoToSettings,
  memorialId,
}) {
  const [name, setName] = useState('');
  const [period, setPeriod] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMemorial = async () => {
      try {
        setIsLoading(true);

        // 현재 로그인한 사용자 확인
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          console.warn('로그인된 사용자가 없습니다.');
          return;
        }

        let query = supabase
          .from('memorials')
          .select('id, name, period, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        // 현재 memorialId가 있다면 해당 고인 정보 우선 조회
        if (memorialId) {
          query = supabase
            .from('memorials')
            .select('id, name, period, created_at')
            .eq('id', memorialId)
            .single();

          const { data, error } = await query;

          if (error) {
            throw error;
          }

          if (data) {
            setName(data.name || '');
            setPeriod(Number(data.period) || 30);
          }

          return;
        }

        const { data, error } = await query.maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setName(data.name || '');
          setPeriod(Number(data.period) || 30);
        }
      } catch (error) {
        console.error('홈 데이터 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMemorial();
  }, [memorialId]);

  return (
    <main className="homepage">
      <HomeHero name={name} />

      <img
        src={rollingGrape}
        alt=""
        className="homepage_background-grape"
        aria-hidden="true"
      />

      <div className="homepage_cta-wrap">
        <StartChatButton
          onStartChat={onStartChat}
        />
      </div>

      <JourneyProgressCard
        onGoToSettings={onGoToSettings}
        period={period}
      />

      <section
        className="homepage_memory-grid"
        aria-label="기억 카드"
      >
        <MemoryPromptCard
          onGoToHistory={onGoToHistory}
        />

        <MemoryStoryCard
          onOpenArchive={onOpenArchive}
        />
      </section>
    </main>
  );
}

export default HomePage;