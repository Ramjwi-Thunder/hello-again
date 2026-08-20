import React, { useState } from 'react';

import './DiaryFormPage.css';

const EMOTIONS = ['그리움', '평온', '슬픔', '행복', '애틋', '편안', '무감각', '혼란', '감사', '공허', '적응', '우울'];

function DiaryWritePage({ onBackClick, onSave }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedEmotions, setSelectedEmotions] = useState([]);

    const handleEmotionClick = (emotion) => {
        setSelectedEmotions((previous) => (
            previous.includes(emotion) ? previous.filter((item) => item !== emotion) : [...previous, emotion]
        ));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ id: Date.now().toString(), title: title.trim() || '제목 없는 기록', content: content.trim(), category: '기록', emotions: selectedEmotions, date: new Date().toISOString().split('T')[0], created_at: new Date().toISOString() });
    };

    const handleContentChange = (event) => {
        const contentInput = event.target;

        setContent(contentInput.value);
        contentInput.style.height = '30px';
        contentInput.style.height = `${contentInput.scrollHeight}px`;
    };

    return (
        <main className="diary-form-page">
            <header className="diary-page-header">
                <button type="button" className="diary-back-button" onClick={onBackClick} aria-label="뒤로 가기">‹</button>
                <h1>기록하기</h1>
                <button type="submit" form="diary-write-form" className="diary-header-save-button">저장</button>
            </header>
            <form id="diary-write-form" className="diary-form" onSubmit={handleSubmit}>
                <p className="diary-emotion-question">오늘의 감정은 어떤가요?</p>
                <div className="diary-emotion-chips">
                    {EMOTIONS.map((emotion) => <button key={emotion} type="button" className={`diary-emotion-chip ${selectedEmotions.includes(emotion) ? 'is-selected' : ''}`} onClick={() => handleEmotionClick(emotion)}>{emotion}</button>)}
                </div>
                <input id="diary-write-title" className="diary-field-input diary-underline-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="제목을 입력해주세요. (선택)" />
                <textarea id="diary-write-content" className="diary-field-textarea diary-underline-textarea" value={content} onChange={handleContentChange} placeholder="오늘의 감정이나 기억을 자유롭게 남겨보세요." />
                <button type="button" className="diary-upload-button">파일 업로드</button>
            </form>
        </main>
    );
}

export default DiaryWritePage;
