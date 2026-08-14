import React, { useEffect, useState } from 'react';
import mobileSignal from '../../assets/images/Mobile-Signal.svg';
import wifi from '../../assets/images/Wifi.svg';
import battery from '../../assets/images/StatusBar-battery.svg';

const statusBarStyle = {
  width: '100%',
  height: '59px',
  padding: '0 27px 0 27px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'var(--color-black)',
};

const timeStyle = {
  color: 'black',
  fontSize: '17px',
  fontFamily: 'SF Pro Text, Pretendard, Apple SD Gothic Neo, Noto Sans KR, sans-serif',
  fontWeight: '600',
  lineHeight: '22px',
  wordWrap: 'break-word',
};

const iconsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
};

const iconStyle = {
  display: 'block',
  flexShrink: 0,
};

function getCurrentTime() {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

function StatusBar() {
  const [time, setTime] = useState(getCurrentTime);

  useEffect(() => {
    const updateTime = () => setTime(getCurrentTime());
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    let intervalId;
    const timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60 * 1000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div style={statusBarStyle} aria-label="Status bar">
      <div style={timeStyle}>{time}</div>
      <div style={iconsStyle} aria-hidden="true">
        <img src={mobileSignal} alt="" style={iconStyle} />
        <img src={wifi} alt="" style={iconStyle} />
        <img src={battery} alt="" style={iconStyle} />
      </div>
    </div>
  );
}

export default StatusBar;
