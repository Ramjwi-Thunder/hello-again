import React from 'react';
import './BottomNav.css';
import homeActive from '../../assets/images/BottomNav/color-Icon-Home.svg';
import homeInactive from '../../assets/images/BottomNav/Icon-Home.svg';
import historyActive from '../../assets/images/BottomNav/color-clarity-note-solid.svg';
import historyInactive from '../../assets/images/BottomNav/clarity-note-line.svg';
import chatActive from '../../assets/images/BottomNav/color-mingcute-chat-1-fill.svg';
import chatInactive from '../../assets/images/BottomNav/mingcute-chat-1-line.svg';
import archiveActive from '../../assets/images/BottomNav/color-Vector.svg';
import archiveInactive from '../../assets/images/BottomNav/Vector.svg';
import settingsActive from '../../assets/images/BottomNav/color-lsicon-setting-outline.svg';
import settingsInactive from '../../assets/images/BottomNav/lsicon-setting-outline.svg';

const tabs = [
  { key: 'home', label: '홈', activeIcon: homeActive, inactiveIcon: homeInactive },
  { key: 'history', label: '기록', activeIcon: historyActive, inactiveIcon: historyInactive },
  { key: 'chat', label: '대화', activeIcon: chatActive, inactiveIcon: chatInactive },
  { key: 'archive', label: '보관함', activeIcon: archiveActive, inactiveIcon: archiveInactive },
  { key: 'settings', label: '설정', activeIcon: settingsActive, inactiveIcon: settingsInactive },
];

function BottomNav({ activeTab = 'home', onTabChange }) {
  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <div className="bottom-nav-rail">
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          const iconSrc = active ? tab.activeIcon : tab.inactiveIcon;
          const buttonClassName = `tab-button ${active ? 'active' : ''}`;

          return (
            <button
              key={tab.key}
              type="button"
              className={buttonClassName}
              onClick={() => onTabChange?.(tab.key)}
              aria-label={tab.label}
            >
              <img
                src={iconSrc}
                alt=""
                aria-hidden="true"
                className="tab-button-icon"
              />
              <span className="tab-button-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
