import React from 'react';
import backButton from '../../assets/images/TopBar/BackButton.svg';

const topBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '39px', // 높이 지정
  padding: '0 16px', // 좌우 여백
  boxSizing: 'border-box',
};

const iconButtonStyle = {
  width: '39px',
  height: '39px',
  border: 'none',
  padding: 0,
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const titleStyle = {
  color: 'var(--color-black)',
  fontSize: 'var(--font-lg)',
  fontWeight: 'var(--weight-semibold)',
  lineHeight: '26px',
};

const TopBar = ({ title, onBackClick }) => {
  return (
    <header style={topBarStyle}>
      <button type="button" style={iconButtonStyle} onClick={onBackClick} aria-label="Go back">
        <img src={backButton} alt="" aria-hidden="true" />
      </button>
      <h1 style={titleStyle}>{title}</h1>
      <div style={iconButtonStyle} /> {/* 오른쪽 아이콘 영역 */}
    </header>
  );
};

export default TopBar;
