import React, { useState } from 'react';
import AppShell from './components/common/AppShell';
import HomePage from './pages/Home/HomePage';
import ArchivePage from './pages/Archive/ArchivePage';
import SplashPage from './pages/Onboarding/Splash';
import OnboardingPage from './pages/Onboarding/Onboarding_1';
import AuthPage from './pages/Auth/AuthPage';


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
];

const SHOW_SPLASH = true; // 앱 시작 시 스플래시를 먼저 노출

function App() {
  // 1. 모든 상태 선언 (최상단)
  const [activeTab, setActiveTab] = useState(SHOW_SPLASH ? 'splash' : 'auth');
  const [isArchiveUploading, setIsArchiveUploading] = useState(false);

  // 2. 핸들러 함수 정의
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsArchiveUploading(false);
  };

  const handleNavigation = (targetView) => {
    if (activeTab === 'home') {
      handleTabChange(targetView);
    }
  };

  // 3. 스플래시 화면 분기 (훅 선언 이후에 배치)
  if (activeTab === 'splash') {
    return (
      <AppShell showTopBar={false} bottomNav={false} isSplash>
        <SplashPage onComplete={() => setActiveTab('onboarding')} />
      </AppShell>
    );
  }

  // 온보딩 화면 분기
  if (activeTab === 'onboarding') {
    return (
      <AppShell showTopBar={false} bottomNav={false} isOnboarding>
        <OnboardingPage onComplete={() => setActiveTab('auth')} />
      </AppShell>
    );
  }

  if (activeTab === 'auth') {
    return (
      <AppShell showTopBar={false} bottomNav={false} isAuth>
        <AuthPage onSignUp={() => setActiveTab('home')} />
      </AppShell>
    );
  }

  // 4. 일반 페이지 및 업로드 상태 계산
  const currentPage = pages.find((page) => page.key === activeTab) ?? pages[0];
  const PageComponent = currentPage.component;

  const isUploading = activeTab === 'archive' && isArchiveUploading;
  const pageTitle = isUploading ? '업로드' : currentPage.title;
  const showBottomNav = !isUploading;
  const handleBackClick = isUploading ? () => setIsArchiveUploading(false) : undefined;

  return (
    <AppShell
      title={pageTitle}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      showTopBar={currentPage.showTopBar}
      bottomNav={showBottomNav}
      onBackClick={handleBackClick}
    >
      <div style={{ height: '100%', overflow: 'auto' }}>
        <PageComponent
          title={currentPage.title}
          isUploading={isArchiveUploading}
          // onComplete is not a prop for PageComponent, but for OnboardingPage
          setIsUploading={setIsArchiveUploading}
          onStartChat={() => handleNavigation('chat')}
          onOpenArchive={() => handleNavigation('archive')}
          onGoToSettings={() => handleNavigation('settings')}
          onGoToHistory={() => handleNavigation('history')}
        />
      </div>
    </AppShell>
  );
}

export default App;
