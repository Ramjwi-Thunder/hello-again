import React, { useState } from 'react';
import AppShell from './components/common/AppShell';
import HomePage from './pages/Home/HomePage';
import ArchivePage from './pages/Archive/ArchivePage';
import SplashPage from './pages/Onboarding/Splash';
import OnboardingPage from './pages/Onboarding/Onboarding_1';
import AuthPage from './pages/Auth/AuthPage';
import SignUpPage from './pages/Auth/SignUpPage';
import TermsServicePage from './pages/Auth/TermsServicePage';
import TermsPrivacyPage from './pages/Auth/TermsPrivacyPage';
import TermsSensitivePage from './pages/Auth/TermsSensitivePage';

import ArchiveUpload from './pages/Archive/ArchiveUpload';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '24px 20px', textAlign: 'left' }}>
    <h2 style={{ margin: 0, fontSize: '24px' }}>{title} 페이지</h2>
  </div>
);

const HistoryPage = () => <PlaceholderPage title="기록 페이지" />;
const ChatPage = () => <PlaceholderPage title="대화 페이지" />;
const SettingsPage = () => <PlaceholderPage title="설정 페이지" />;

const pages = [
  { key: 'home', component: HomePage, title: '홈', showTopBar: false },
  { key: 'history', component: HistoryPage, title: '기록', showTopBar: true },
  { key: 'chat', component: ChatPage, title: '대화', showTopBar: true },
  { key: 'archive', component: ArchivePage, title: '기억 보관함', showTopBar: true },
  { key: 'settings', component: SettingsPage, title: '설정', showTopBar: true },
  { key: 'signup', component: SignUpPage, title: '', showTopBar: true },
  {
    key: 'terms-service',
    component: TermsServicePage,
    title: '서비스 이용약관 동의',
    showTopBar: false,
  },
  {
    key: 'terms-privacy',
    component: TermsPrivacyPage,
    title: '개인정보 수집 및 이용 안내',
    showTopBar: false,
  },
  {
    key: 'terms-sensitive',
    component: TermsSensitivePage,
    title: '민감정보 처리 동의',
    showTopBar: false,
  },
];

const SHOW_SPLASH = true;

function App() {
  // -----------------------------
  // 상태
  // -----------------------------
  const [activeTab, setActiveTab] = useState(
    SHOW_SPLASH ? 'splash' : 'auth'
  );

  const [isArchiveUploading, setIsArchiveUploading] = useState(false);

  // ⭐ 추가
  // 보관함 상세 화면인지 여부
  const [isArchiveDetail, setIsArchiveDetail] = useState(false);

  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    sensitiveInfo: false,
  });

  // -----------------------------
  // 탭 변경
  // -----------------------------
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // 다른 페이지로 이동하면 보관함 상세 상태 초기화
    setIsArchiveUploading(false);
    setIsArchiveDetail(false);
  };

  // -----------------------------
  // 홈에서 다른 페이지 이동
  // -----------------------------
  const handleNavigation = (targetView) => {
    if (activeTab === 'home') {
      handleTabChange(targetView);
    }
  };

  // -----------------------------
  // 약관 열기
  // -----------------------------
  const handleOpenTerms = (targetView) => {
    setActiveTab(targetView);
  };

  // -----------------------------
  // 약관 동의
  // -----------------------------
  const handleAcceptTerms = (termKey) => {
    setAgreements((prev) => ({
      ...prev,
      [termKey]: true,
    }));

    setActiveTab('signup');
  };

  // -----------------------------
  // 스플래시
  // -----------------------------
  if (activeTab === 'splash') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
        isSplash
      >
        <SplashPage
          onComplete={() => setActiveTab('onboarding')}
        />
      </AppShell>
    );
  }

  // -----------------------------
  // 온보딩
  // -----------------------------
  if (activeTab === 'onboarding') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
        isOnboarding
      >
        <OnboardingPage
          onComplete={() => setActiveTab('auth')}
        />
      </AppShell>
    );
  }

  // -----------------------------
  // 로그인
  // -----------------------------
  if (activeTab === 'auth') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
        isAuth
      >
        <AuthPage
          onSignUp={() => setActiveTab('signup')}
        />
      </AppShell>
    );
  }

  // -----------------------------
  // 일반 페이지
  // -----------------------------
  const currentPage =
    pages.find((page) => page.key === activeTab) ?? pages[0];

  const PageComponent = currentPage.component;

  // 업로드 화면
  const isUploading =
    activeTab === 'archive' && isArchiveUploading;

  // 제목
  const pageTitle = isUploading
    ? '업로드'
    : currentPage.title;

  // 업로드 화면 OR 보관함 상세 화면이면 하단 네비 숨김
  const showBottomNav =
    !isUploading &&
    !isArchiveDetail &&
    activeTab !== 'signup' &&
    !activeTab.startsWith('terms-');

  // -----------------------------
  // 뒤로가기
  // -----------------------------
const handleBackClick =
  activeTab === 'signup'
    ? () => setActiveTab('auth')

    : activeTab === 'terms-service' ||
      activeTab === 'terms-privacy' ||
      activeTab === 'terms-sensitive'
    ? () => setActiveTab('signup')

    // 보관함 상세 → 보관함 목록
    : isArchiveDetail
    ? () => setIsArchiveDetail(false)

    // 업로드 화면 → 보관함 목록
    : isUploading
    ? () => setIsArchiveUploading(false)

    // 보관함 목록 → 홈
    : activeTab === 'archive'
    ? () => {
        setActiveTab('home');
        setIsArchiveUploading(false);
        setIsArchiveDetail(false);
      }

    : undefined;

  return (
    <AppShell
      title={pageTitle}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      showTopBar={currentPage.showTopBar}
      bottomNav={showBottomNav}
      onBackClick={handleBackClick}
      isAuth={
        activeTab === 'auth' ||
        activeTab === 'signup'
      }
      isTerms={activeTab.startsWith('terms-')}
    >
      <div
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        {isArchiveUploading ? (
          <ArchiveUpload
            onCancel={() =>
              setIsArchiveUploading(false)
            }
            onSuccess={() =>
              setIsArchiveUploading(false)
            }
          />
        ) : (
          <PageComponent
            title={currentPage.title}

            isUploading={isArchiveUploading}
            setIsUploading={setIsArchiveUploading}

            // ⭐ 보관함 상세 상태 전달
            isArchiveDetail={isArchiveDetail}
            setIsArchiveDetail={setIsArchiveDetail}

            onBackClick={handleBackClick}

            agreements={agreements}
            setAgreements={setAgreements}

            onStartHome={
              activeTab === 'signup'
                ? () => setActiveTab('home')
                : undefined
            }

            onAcceptTerms={
              activeTab === 'terms-service'
                ? () =>
                    handleAcceptTerms(
                      'termsOfService'
                    )

                : activeTab === 'terms-privacy'
                ? () =>
                    handleAcceptTerms(
                      'privacyPolicy'
                    )

                : activeTab === 'terms-sensitive'
                ? () =>
                    handleAcceptTerms(
                      'sensitiveInfo'
                    )

                : undefined
            }

            onStartChat={() =>
              handleNavigation('chat')
            }

            onOpenArchive={() =>
              handleNavigation('archive')
            }

            onGoToSettings={() =>
              handleNavigation('settings')
            }

            onGoToHistory={() =>
              handleNavigation('history')
            }

            onOpenTerms={handleOpenTerms}
          />
        )}
      </div>
    </AppShell>
  );
}

export default App;