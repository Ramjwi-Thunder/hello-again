import './AppShell.css';
import BottomNav from './BottomNav';
import StatusBar from './StatusBar';
import TopBar from './TopBar';
import HomeIndicator from './HomeIndicator';

function AppShell({
  children,
  title,
  onBackClick,
  bottomNav = true,
  activeTab,
  onTabChange,
  showTopBar = true,
}) {
  const shellClassName = `app-shell${activeTab === 'home' ? ' app-shell-home' : ''}`;

  return (
    <div className={shellClassName}>
      <StatusBar />
      {showTopBar && <TopBar title={title} onBackClick={onBackClick} />}
      <div className="app-content">{children}</div>
      <div className="app-shell-bottom">
        {bottomNav && <BottomNav activeTab={activeTab} onTabChange={onTabChange} />}
        <HomeIndicator />
      </div>
    </div>
  );
}

export default AppShell;
