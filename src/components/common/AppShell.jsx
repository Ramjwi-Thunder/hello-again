import './AppShell.css';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import TopBar from './TopBar';
import HomeIndicator from './HomeIndicator';

function AppShell({ children, title, onBackClick, bottomNav = true, activeTab, onTabChange }) {
  return (
    <div className="app-shell">
      <StatusBar />
      <TopBar title={title} onBackClick={onBackClick} />
      <div className="app-content">{children}</div>
      <div className="app-shell-bottom">
        {bottomNav && <BottomNav activeTab={activeTab} onTabChange={onTabChange} />}
        <HomeIndicator />
      </div>
    </div>
  );
}

export default AppShell;
