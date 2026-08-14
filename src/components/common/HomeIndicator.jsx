import './HomeIndicator.css';
import React from 'react';

function HomeIndicator() {
  return (
    <div className="home-indicator-container">
      {/* 이 div가 홈 인디케이터의 검은 선이 됩니다. */}
      <div className="home-indicator-bar" />
    </div>
  );
}

export default HomeIndicator;