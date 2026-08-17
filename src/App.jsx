import React, { useState } from 'react';
import AppShell from './components/common/AppShell';
import HomePage from './pages/Home/HomePage';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '24px 20px', textAlign: 'left' }}>
    <h2 style={{ margin: 0, fontSize: '24px' }}>{title} 페이지</h2>
  </div>
);

const pages = [
  { key: 'home', component: HomePage, title: '홈' },
  { key: 'history', component: PlaceholderPage, title: '기록' },
  { key: 'chat', component: PlaceholderPage, title: '대화' },
  { key: 'archive', component: PlaceholderPage, title: '보관함' },
  { key: 'settings', component: PlaceholderPage, title: '설정' },
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
