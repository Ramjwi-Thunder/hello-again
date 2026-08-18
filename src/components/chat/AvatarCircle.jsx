import React from 'react';
import './AvatarCircle.css';

function AvatarCircle() {
  return (
    <div className="avatar-circle-container">
      {/* 바깥쪽 레이어 */}
      <div className="avatar-circle avatar-circle--outer" />
      
      {/* 중간 레이어 */}
      <div className="avatar-circle avatar-circle--middle" />
      
      {/* 안쪽 레이어 (메인) */}
      <div className="avatar-circle avatar-circle--inner" />
    </div>
  );
}

export default AvatarCircle;
