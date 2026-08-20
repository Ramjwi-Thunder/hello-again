import React from 'react';

import './DiarySearchBar.css';

import searchIcon from '../../assets/images/search.svg';

function DiarySearchBar({ searchTerm = '', onSearchChange, onClearSearch }) {
    return (
        <div className="diary-search-bar" role="search">
            <div className="diary-search-icon-wrapper">
                <img
                    src={searchIcon}
                    alt=""
                    className="diary-search-icon"
                    aria-hidden="true"
                />
            </div>

            <input
                type="text"
                className="diary-search-input"
                placeholder="검색"
                value={searchTerm}
                onChange={(event) => onSearchChange?.(event.target.value)}
                aria-label="애도 기록 검색"
            />

            {searchTerm && (
                <button
                    type="button"
                    className="diary-search-clear-button"
                    onClick={onClearSearch}
                    aria-label="검색어 지우기"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default DiarySearchBar;
