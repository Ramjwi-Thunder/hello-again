import React, { useState } from 'react';
import AppShell from './components/common/AppShell';
import HomePage from './pages/Home/HomePage';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '24px 20px', textAlign: 'left' }}>
    <h2 style={{ margin: 0, fontSize: '24px' }}>{title}</h2>
  </div>
);

const pages = [
  { key: 'home', component: <HomePage />, title: '홈' },
  { key: 'history', component: <PlaceholderPage title="기록 페이지" />, title: '기록' },
  { key: 'chat', component: <PlaceholderPage title="대화 페이지" />, title: '대화' },
  { key: 'archive', component: <PlaceholderPage title="보관함 페이지" />, title: '보관함' },
  { key: 'settings', component: <PlaceholderPage title="설정 페이지" />, title: '설정' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const currentPage = pages.find((page) => page.key === activeTab) ?? pages[0];

  return (
    <AppShell
      title={currentPage.title}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div style={{ height: '100%', overflowY: 'auto' }}>{currentPage.component}</div>
    </AppShell>
  );
}

export default App;
