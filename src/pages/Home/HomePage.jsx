import './HomePage.css';
import galleryIcon from '../../assets/images/gallery.svg';
import memoryIcon from '../../assets/images/memory.svg'; // 아이콘 경로가 다를 경우 수정해주세요.

const quickPromptText = '오늘의 감정이나 기억을\n자유롭게 남겨보세요';

function StartChatButton({ onStartChat }) {
  return (
    <button type="button" className="homepage_cta" onClick={onStartChat}>
      대화 시작하기
    </button>
  );
}

function JourneyProgressCard() {
  const journeyDays = 8; {/*추후 수정하기*/}
  const totalDays = 30; {/*추후 수정하기*/}
  const progressPercent = Math.round((journeyDays / totalDays) * 100);

  return (
    <section className="homepage_progress-card" aria-label="기억의 여정 진행률">
      <div className="homepage_progress-title-row">
        <h2 className="homepage_progress-title">기억의 여정 진행률</h2>
        <div className="homepage_progress-percent">{progressPercent}%</div>
      </div>

      <div className="homepage_progress-count">
        <span className="homepage_progress-count-current">{journeyDays} </span>
        <span className="homepage_progress-count-total">/ {totalDays}일</span>
      </div>

      <div className="homepage_progress-track" aria-hidden="true">
        <div className="homepage_progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <button type="button" className="homepage_progress-period">
        <span>진행 기간</span> {/*추후 수정하기*/}
        <span className="homepage_progress-period-value">
          2026.08.07. - 2026.09.06.
          <span className="homepage_progress-chevron" aria-hidden="true" />
        </span>
      </button>
    </section>
  );
}

function MemoryPromptCard() {
  return (
    <article
      className="homepage_memory-card homepage_memory-card--prompt"
      aria-label="새로운 기억 남기기"
    >
      <p className="homepage_memory-card-text">{quickPromptText}</p>
      <img src={memoryIcon} alt="" className="homepage_memory-illustration" aria-hidden="true" />
    </article>
  );
}

function MemoryStoryCard() {
  return (
    <article className="homepage_memory-card homepage_memory-card--story">
      <p className="homepage_memory-card-text homepage_memory-card-text--story">
        2018.08.16.
        {'\n'}
        '강릉'에서 기억 보러 가기
      </p> {/*추후 수정하기*/}

      <img src={galleryIcon} alt="" className="homepage_memory-illustration" aria-hidden="true" />
    </article>
  );
}

function HomeHero() {
  return (
    <section className="homepage_hero" aria-label="인사말">
      <div className="homepage_hero-copy">
        <h1 className="homepage_title">다시, 안녕</h1>
        <p className="homepage_subtitle">
          안녕하세요, ㅇㅇ님{'\n'}오늘은 어떤 이야기를 나누고 싶으신가요?
        </p> {/*추후 수정하기*/}
        
      </div>

      <div className="homepage_profile-badge" aria-hidden="true">
        <span className="homepage_profile-dot" />
      </div>
    </section>
  );
}

function HomePage({ onStartChat }) {
  return (
    <main className="homepage">
      <HomeHero />
      <div className="homepage_glow" aria-hidden="true" />
      <div className="homepage_glow homepage_glow--small" aria-hidden="true" />

      <div className="homepage_cta-wrap">
        <StartChatButton onStartChat={onStartChat} />
      </div>

      <JourneyProgressCard />

      <section className="homepage_memory-grid" aria-label="기억 카드">
        <MemoryPromptCard />
        <MemoryStoryCard />
      </section>
    </main>
  );
}

export default HomePage;
