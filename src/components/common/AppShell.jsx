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
  isSplash = false,
  isAuth = false,
  isTerms = false,
}) {
    const shellClassName = `app-shell${activeTab === 'home' || activeTab === 'registration-main' ? ' app-shell-home' : ''}${activeTab === 'archive' ? ' app-shell--archive' : ''}${activeTab === 'history' || activeTab === 'diary' ? ' app-shell--diary' : ''}${activeTab === 'auth' ? ' app-shell-auth' : ''}${isSplash ? ' app-shell-splash' : ''}${isAuth ? ' app-shell-auth' : ''}${isTerms ? ' app-shell-terms' : ''}`;

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
