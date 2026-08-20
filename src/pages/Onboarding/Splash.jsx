import React, { useEffect } from 'react';
import './Splash.css';
import MainLogo from '../../assets/images/logo_main.svg';

function SplashPage({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000); // 2초

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="screen splash-screen">
      <div className="logo-box">
        <img src={MainLogo} alt="다시, 안녕 로고" className="logo" />
      </div>
    </div>
  );
}

export default SplashPage;