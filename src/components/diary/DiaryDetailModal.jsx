import React from 'react';

import './DiaryDetailModal.css';

function DiaryDetailModal({ item, onClose, onDelete }) {
    if (!item) return null;

    const { title, date, created_at, category = '기록', content } = item;
    const displayDate = date || (created_at ? new Date(created_at).toISOString().split('T')[0] : '20XX-XX-XX');

    return (
        <div className="diary-detail-backdrop" onClick={onClose}>
            <div
                className="diary-detail-sheet"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="detail-modal-title"
            >
                <div className="diary-detail-header">
                    <span className="diary-detail-category-badge">{category}</span>
                    <button
                        type="button"
                        className="diary-detail-close-button"
                        onClick={onClose}
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                <h2 id="detail-modal-title" className="diary-detail-title">
                    {title}
                </h2>

                <time className="diary-detail-date">{displayDate}</time>

                <div className="diary-detail-divider" />

                <div className="diary-detail-body">
                    {content ? (
                        <p className="diary-detail-content">{content}</p>
                    ) : (
                        <p className="diary-detail-empty-content">
                            등록된 상세 내용이 없습니다. 소중한 마음을 담은 기록입니다.
                        </p>
                    )}
                </div>

                <div className="diary-detail-actions">
                    {onDelete && (
                        <button
                            type="button"
                            className="diary-detail-delete-button"
                            onClick={() => {
                                onDelete(item.id);
                                onClose();
                            }}
                        >
                            삭제
                        </button>
                    )}
                    <button
                        type="button"
                        className="diary-detail-confirm-button"
                        onClick={onClose}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DiaryDetailModal;
