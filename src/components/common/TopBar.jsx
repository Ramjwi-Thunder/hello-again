import React from 'react';
import backButton from '../../assets/images/TopBar/BackButton.svg';
import './TopBar.css';

const TopBar = ({ title, onBackClick, rightContent }) => {
  return (
    <header className="top-bar">
      <button type="button" className="top-bar__button" onClick={onBackClick} aria-label="Go back">
        <img src={backButton} alt="" aria-hidden="true" />
      </button>
      {title ? <h1 className="top-bar__title">{title}</h1> : <div className="top-bar__button" aria-hidden="true" />}
      <div className="top-bar__button">{rightContent}</div>
    </header>
  );
};

export default TopBar;
