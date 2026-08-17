import React, { useState } from 'react';
import AppShell from './components/common/AppShell';
import HomePage from './pages/Home/HomePage';
import ArchivePage from './pages/Archive/ArchivePage';
import SplashPage from './pages/Onboarding/Splash';

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

const SHOW_SPLASH = true; // 스플래시 화면을 보려면 true로 설정

function App() {
  const [currentView, setCurrentView] = useState(SHOW_SPLASH ? 'splash' : 'home');

  const activeTab = currentView;
  const setActiveTab = (tab) => {
    setCurrentView(tab);
  };

  if (currentView === 'splash') {
    return (
      <AppShell showTopBar={false} bottomNav={false} isSplash>
        <SplashPage onComplete={() => setCurrentView('home')} />
      </AppShell>
    );
  }

  const currentPage = pages.find((page) => page.key === activeTab) ?? pages[0];
  const PageComponent = currentPage.component;

  const handleNavigation = (targetView) => {
    if (activeTab === 'home') {
      setActiveTab(targetView);
    }
  };

  return (
    <AppShell
      title={currentPage.title}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showTopBar={currentPage.showTopBar}
    >
      <div style={{ height: '100%', overflow: 'auto' }}>
        <PageComponent
          title={currentPage.title}
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
