import React, { useState } from 'react';
import AppShell from './components/common/AppShell';
import HomePage from './pages/Home/HomePage';
import ArchivePage from './pages/Archive/ArchivePage';

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

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const currentPage = pages.find((page) => page.key === activeTab) ?? pages[0];
  const PageComponent = currentPage.component;

  return (
    <AppShell
      title={currentPage.title}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showTopBar={currentPage.showTopBar}
    >
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <PageComponent
          title={currentPage.title}
          onStartChat={activeTab === 'home' ? () => setActiveTab('chat') : undefined}
          onOpenArchive={activeTab === 'home' ? () => setActiveTab('archive') : undefined}
          onGoToSettings={activeTab === 'home' ? () => setActiveTab('settings') : undefined}
          onGoToHistory={activeTab === 'home' ? () => setActiveTab('history') : undefined}
        />
      </div>
    </AppShell>
  );
}

export default App;
