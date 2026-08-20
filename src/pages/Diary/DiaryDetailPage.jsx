import React from 'react';

import './DiaryFormPage.css';

function DiaryDetailPage({ item, onBackClick }) {
    if (!item) return null;

    return (
        <main className="diary-detail-page">
            <header className="diary-page-header">
                <button type="button" className="diary-back-button" onClick={onBackClick} aria-label="뒤로 가기">‹</button>
                <h1>나의 애도 기록</h1>
                <span aria-hidden="true" />
            </header>
            <article className="diary-detail-content-page">
                {item.emotions?.length > 0 && <div className="diary-detail-emotions">{item.emotions.map((emotion) => <span key={emotion} className="diary-detail-category">{emotion}</span>)}</div>}
                <h2>{item.title}</h2>
                <div className="diary-detail-image-placeholder">이미지</div>
                <p>{item.content || '등록된 상세 내용이 없습니다.'}</p>
            </article>
        </main>
    );
}

export default DiaryDetailPage;
