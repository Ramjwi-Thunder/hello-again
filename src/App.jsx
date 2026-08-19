import React, { useState } from 'react';

import AppShell from './components/common/AppShell';

import RegistrationMain from './pages/Auth/RegistrationMain';
import ArchivePage from './pages/Archive/ArchivePage';

import SplashPage from './pages/Onboarding/Splash';
import OnboardingPage from './pages/Onboarding/Onboarding_1';

import AuthPage from './pages/Auth/AuthPage';
import SignUpPage from './pages/Auth/SignUpPage';

import TermsServicePage from './pages/Auth/TermsServicePage';
import TermsPrivacyPage from './pages/Auth/TermsPrivacyPage';
import TermsSensitivePage from './pages/Auth/TermsSensitivePage';

import PreLegacy1 from './pages/Auth/PreLegacy/PreLegacy1';
import PreLegacy2 from './pages/Auth/PreLegacy/PreLegacy2';
import PreLegacy3 from './pages/Auth/PreLegacy/PreLegacy3';

import PostLegacy1 from './pages/Auth/PostLegacy/PostLegacy1';
import PostLegacy2 from './pages/Auth/PostLegacy/PostLegacy2';
import PostLegacy3 from './pages/Auth/PostLegacy/PostLegacy3';

import HomePage from './pages/Home/HomePage';
import MourningPeriodPage from './pages/Auth/MourningPeriod/PeriodPage';

import ArchiveUpload from './pages/Archive/ArchiveUpload';

const PlaceholderPage = ({ title }) => (
  <div
    style={{
      padding: '24px 20px',
      textAlign: 'left',
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: '24px',
      }}
    >
      {title} 페이지
    </h2>
  </div>
);

const HistoryPage = () => (
  <PlaceholderPage title="기록 페이지" />
);

const ChatPage = () => (
  <PlaceholderPage title="대화 페이지" />
);

const SettingsPage = () => (
  <PlaceholderPage title="설정 페이지" />
);

const pages = [
  {
    key: 'home',
    component: HomePage,
    title: '홈',
    showTopBar: false,
  },
  {
    key: 'registration-main',
    component: RegistrationMain,
    title: '등록 메인',
    showTopBar: false,
  },
  {
    key: 'history',
    component: HistoryPage,
    title: '기록',
    showTopBar: true,
  },
  {
    key: 'chat',
    component: ChatPage,
    title: '대화',
    showTopBar: true,
  },
  {
    key: 'archive',
    component: ArchivePage,
    title: '기억 보관함',
    showTopBar: true,
  },
  {
    key: 'settings',
    component: SettingsPage,
    title: '설정',
    showTopBar: true,
  },
  {
    key: 'signup',
    component: SignUpPage,
    title: '',
    showTopBar: true,
  },
  {
    key: 'pre-1',
    component: PreLegacy1,
    title: '생전 등록',
    showTopBar: false,
  },
  {
    key: 'pre-2',
    component: PreLegacy2,
    title: '생전 등록',
    showTopBar: false,
  },
  {
    key: 'pre-3',
    component: PreLegacy3,
    title: '생전 등록',
    showTopBar: false,
  },
  {
    key: 'post-1',
    component: PostLegacy1,
    title: '사후 등록',
    showTopBar: false,
  },
  {
    key: 'post-2',
    component: PostLegacy2,
    title: '사후 등록',
    showTopBar: false,
  },
  {
    key: 'post-3',
    component: PostLegacy3,
    title: '사후 등록',
    showTopBar: false,
  },
  {
    key: 'mourning-period',
    component: MourningPeriodPage,
    title: '애도 기간',
    showTopBar: false,
  },
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
  const [activeTab, setActiveTab] = useState(
    SHOW_SPLASH ? 'splash' : 'auth'
  );

  const [isArchiveUploading, setIsArchiveUploading] =
    useState(false);

  const [registrationMode, setRegistrationMode] =
    useState('after');

  // 고인 ID
  const [memorialId, setMemorialId] = useState(null);

  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    sensitiveInfo: false,
  });

  const allAgreementsAccepted =
    Object.values(agreements).every(Boolean);

  const effectiveTab =
    activeTab === 'registration-main' &&
    !allAgreementsAccepted
      ? 'signup'
      : activeTab;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsArchiveUploading(false);
  };

  const handleNavigation = (targetView) => {
    if (
      activeTab === 'home' ||
      activeTab === 'registration-main'
    ) {
      handleTabChange(targetView);
    }
  };

  const handleOpenTerms = (targetView) => {
    setActiveTab(targetView);
  };

  const handleAcceptTerms = (termKey) => {
    setAgreements((prev) => ({
      ...prev,
      [termKey]: true,
    }));

    setActiveTab('signup');
  };

  const handleStartRegistrationMain = () => {
    if (allAgreementsAccepted) {
      setActiveTab('registration-main');
      return;
    }

    setActiveTab('signup');
  };

  const handleStartRegistrationFlow = (mode) => {
    setRegistrationMode(mode);

    setActiveTab(
      mode === 'before'
        ? 'pre-1'
        : 'post-1'
    );
  };

  const handleRegistrationStep = (direction) => {
    const flow =
      registrationMode === 'before'
        ? ['pre-1', 'pre-2', 'pre-3']
        : ['post-1', 'post-2', 'post-3'];

    const currentIndex = flow.indexOf(activeTab);

    if (currentIndex === -1) {
      return;
    }

    const nextIndex =
      direction === 'next'
        ? currentIndex + 1
        : currentIndex - 1;

    if (
      nextIndex >= 0 &&
      nextIndex < flow.length
    ) {
      setActiveTab(flow[nextIndex]);
      return;
    }

    if (
      direction === 'next' &&
      currentIndex === flow.length - 1
    ) {
      setActiveTab('mourning-period');
      return;
    }

    if (
      direction === 'back' &&
      currentIndex === 0
    ) {
      setActiveTab('registration-main');
    }
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
          onComplete={() =>
            setActiveTab('onboarding')
          }
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
          onComplete={() =>
            setActiveTab('signup')
          }
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
          onSignUp={() =>
            setActiveTab('signup')
          }
        />
      </AppShell>
    );
  }

  // -----------------------------
  // 등록 메인
  // -----------------------------

  if (activeTab === 'registration-main') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
      >
        <RegistrationMain
          onStartRegistration={
            handleStartRegistrationFlow
          }
        />
      </AppShell>
    );
  }

  const currentPage =
    pages.find(
      (page) => page.key === effectiveTab
    ) ?? pages[0];

  const PageComponent =
    currentPage.component;

  const isUploading =
    effectiveTab === 'archive' &&
    isArchiveUploading;

  const pageTitle = isUploading
    ? '업로드'
    : currentPage.title;

  const showBottomNav =
    !isUploading &&
    effectiveTab !== 'registration-main' &&
    effectiveTab !== 'signup' &&
    !effectiveTab.startsWith('terms-') &&
    !effectiveTab.startsWith('pre-') &&
    !effectiveTab.startsWith('post-') &&
    effectiveTab !== 'mourning-period';

  const handleBackClick =
    effectiveTab === 'signup'
      ? () => setActiveTab('auth')
      : effectiveTab.startsWith('pre-') ||
          effectiveTab.startsWith('post-')
        ? () =>
            handleRegistrationStep('back')
        : effectiveTab.startsWith('terms-')
          ? () => setActiveTab('signup')
          : isUploading
            ? () =>
                setIsArchiveUploading(false)
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
        effectiveTab === 'auth' ||
        effectiveTab === 'signup'
      }
      isTerms={effectiveTab.startsWith('terms-')}
    >
      <div className="page-scroll-area">
        {isUploading ? (
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
            setIsUploading={
              setIsArchiveUploading
            }
            memorialId={memorialId}
            onBackClick={handleBackClick}
            agreements={agreements}
            setAgreements={setAgreements}

            onStartRegistrationMain={
              effectiveTab === 'signup'
                ? handleStartRegistrationMain
                : undefined
            }

            onAcceptTerms={
              effectiveTab === 'terms-service'
                ? () =>
                    handleAcceptTerms(
                      'termsOfService'
                    )
                : effectiveTab === 'terms-privacy'
                  ? () =>
                      handleAcceptTerms(
                        'privacyPolicy'
                      )
                  : effectiveTab ===
                      'terms-sensitive'
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

            // 등록 페이지 다음 버튼
            onRegistrationNext={(data) => {
              if (data?.id) {
                setMemorialId(data.id);
              }

              // 한 번만 다음 단계로 이동
              handleRegistrationStep('next');
            }}

            onRegistrationBack={() =>
              handleRegistrationStep('back')
            }

            onRegistrationComplete={() =>
              setActiveTab('home')
            }

            onMourningPeriodNext={() =>
              setActiveTab('home')
            }
          />
        )}
      </div>
    </AppShell>
  );
}

export default App;