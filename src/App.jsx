import React, { useState } from 'react';
import AppShell from './components/common/AppShell';
import HomePage from './pages/Home/HomePage';
import ArchivePage from './pages/Archive/ArchivePage';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '24px 20px', textAlign: 'left' }}>
    <h2 style={{ margin: 0, fontSize: '24px' }}>{title} 페이지</h2>
  </div>
);

const pages = [
  { key: 'home', component: <HomePage />, title: '홈', showTopBar: true },
  { key: 'history', component: <PlaceholderPage title="기록 페이지" />, title: '기록', showTopBar: true },
  { key: 'chat', component: <PlaceholderPage title="대화 페이지" />, title: '대화', showTopBar: true },
  { key: 'archive', component: <ArchivePage />, title: '', showTopBar: false },
  { key: 'settings', component: <PlaceholderPage title="설정 페이지" />, title: '설정', showTopBar: true },
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
      showTopBar={activeTab !== 'home'}
      showTopBar={currentPage.showTopBar}
    >
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <PageComponent
          title={currentPage.title}
          onStartChat={activeTab === 'home' ? () => setActiveTab('chat') : undefined}
        />
      </div>
    </AppShell>
  );
}

export default App;
