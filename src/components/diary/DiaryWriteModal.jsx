import React, { useState } from 'react';

import './DiaryWriteModal.css';

function DiaryWriteModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('기록');
    const [type, setType] = useState('normal'); // 'normal', 'letter', 'reply'
    const [content, setContent] = useState('');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title.trim()) return;

        let formattedTitle = title.trim();
        if (type === 'letter' && !formattedTitle.startsWith('✉️')) {
            formattedTitle = `✉️ ${formattedTitle}`;
        } else if (type === 'reply' && !formattedTitle.startsWith('└')) {
            formattedTitle = `└ ${formattedTitle}`;
        }

        onSave({
            id: Date.now().toString(),
            title: formattedTitle,
            category,
            content: content.trim(),
            date,
            created_at: new Date().toISOString(),
        });

        setTitle('');
        setContent('');
        setType('normal');
        onClose();
    };

    return (
        <div className="diary-modal-backdrop" onClick={onClose}>
            <div
                className="diary-modal-sheet"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="write-modal-title"
            >
                <div className="diary-modal-header">
                    <h2 id="write-modal-title" className="diary-modal-title">
                        새 기록 작성
                    </h2>
                    <button
                        type="button"
                        className="diary-modal-close-button"
                        onClick={onClose}
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="diary-modal-form">
                    <div className="diary-form-group">
                        <label className="diary-form-label">분류</label>
                        <div className="diary-form-options">
                            {['기록', '특별한 날'].map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`diary-type-button ${category === cat ? 'active' : ''}`}
                                    onClick={() => setCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="diary-form-group">
                        <label className="diary-form-label">유형</label>
                        <div className="diary-form-options">
                            <button
                                type="button"
                                className={`diary-type-button ${type === 'normal' ? 'active' : ''}`}
                                onClick={() => setType('normal')}
                            >
                                일반 기록
                            </button>
                            <button
                                type="button"
                                className={`diary-type-button ${type === 'letter' ? 'active' : ''}`}
                                onClick={() => setType('letter')}
                            >
                                ✉️ 편지
                            </button>
                            <button
                                type="button"
                                className={`diary-type-button ${type === 'reply' ? 'active' : ''}`}
                                onClick={() => setType('reply')}
                            >
                                └ 답장
                            </button>
                        </div>
                    </div>

                    <div className="diary-form-group">
                        <label htmlFor="diary-title-input" className="diary-form-label">
                            제목
                        </label>
                        <input
                            id="diary-title-input"
                            type="text"
                            className="diary-form-input"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>

                    <div className="diary-form-group">
                        <label htmlFor="diary-date-input" className="diary-form-label">
                            날짜
                        </label>
                        <input
                            id="diary-date-input"
                            type="date"
                            className="diary-form-input"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </div>

                    <div className="diary-form-group">
                        <label htmlFor="diary-content-input" className="diary-form-label">
                            내용
                        </label>
                        <textarea
                            id="diary-content-input"
                            className="diary-form-textarea"
                            placeholder="그리운 마음과 기억을 남겨보세요..."
                            rows={4}
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>

                    <div className="diary-modal-actions">
                        <button
                            type="button"
                            className="diary-modal-cancel-button"
                            onClick={onClose}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="diary-modal-submit-button"
                        >
                            저장하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DiaryWriteModal;
