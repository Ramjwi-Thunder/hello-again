import React from 'react';

import './DiaryCategoryChips.css';

const DEFAULT_CATEGORIES = ['전체', '기록', '특별한 날'];

function DiaryCategoryChips({
    categories = DEFAULT_CATEGORIES,
    activeCategory = '전체',
    onSelectCategory,
}) {
    return (
        <div className="diary-category-chips" role="tablist" aria-label="기록 카테고리 필터">
            {categories.map((category) => {
                const isActive = activeCategory === category;
                const buttonClassName = `diary-category-chip ${isActive ? 'active' : 'inactive'}`;

                return (
                    <button
                        key={category}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={buttonClassName}
                        onClick={() => onSelectCategory?.(category)}
                    >
                        <span className="diary-category-chip-label">{category}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default DiaryCategoryChips;
