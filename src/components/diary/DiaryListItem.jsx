import React from 'react';

import './DiaryListItem.css';

import rightChevronIcon from '../../assets/images/auth/right_chevron.svg';

function DiaryListItem({ item, onClick }) {
    const { title, date, created_at, isReply = false } = item;
    const displayDate = date || (created_at ? new Date(created_at).toISOString().split('T')[0] : '20XX-XX-XX');

    return (
        <article
            className={`diary-list-item ${isReply || title.startsWith('└') ? 'is-reply' : ''}`}
            onClick={() => onClick?.(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onClick?.(item);
                }
            }}
        >
            <div className="diary-list-item-content">
                <div className="diary-list-item-header">
                    <h3 className="diary-list-item-title">{title}</h3>
                    <time className="diary-list-item-date">{displayDate}</time>
                </div>

                <div className="diary-list-item-action" aria-hidden="true">
                    <img
                        src={rightChevronIcon}
                        alt=""
                        className="diary-list-item-chevron"
                    />
                </div>
            </div>

            <div className="diary-list-item-divider" aria-hidden="true" />
        </article>
    );
}

export default DiaryListItem;
