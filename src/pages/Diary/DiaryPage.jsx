import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { supabase } from '../../lib/supabase';

import DiarySearchBar from '../../components/diary/DiarySearchBar';
import DiaryCategoryChips from '../../components/diary/DiaryCategoryChips';
import DiaryListItem from '../../components/diary/DiaryListItem';
import DiaryWriteModal from '../../components/diary/DiaryWriteModal';
import DiaryDetailModal from '../../components/diary/DiaryDetailModal';

import './DiaryPage.css';

import plusIcon from '../../assets/images/plus.svg';

const INITIAL_DIARY_ITEMS = [
    {
        id: '1',
        title: '✉️ 제목',
        date: '20XX-XX-XX',
        category: '기록',
        content: '마음속에 간직해 둔 첫 번째 편지입니다. 따뜻했던 목소리가 여전히 생생합니다.',
    },
    {
        id: '2',
        title: '└ 제목',
        date: '20XX-XX-XX',
        category: '기록',
        content: '언제나 곁에서 힘이 되어주던 그 말, 잊지 않고 기억할게요.',
    },
    {
        id: '3',
        title: '제목',
        date: '20XX-XX-XX',
        category: '기록',
        content: '함께 걸었던 길, 함께 나누었던 작은 기억들을 적어둡니다.',
    },
    {
        id: '4',
        title: '제목',
        date: '20XX-XX-XX',
        category: '기록',
        content: '오늘도 문득 생각이 나서 이렇게 일기를 남겨봅니다.',
    },
    {
        id: '5',
        title: '✉️ 제목',
        date: '20XX-XX-XX',
        category: '특별한 날',
        content: '특별한 날을 맞이하여 전하고 싶은 마음을 가득 담았습니다.',
    },
    {
        id: '6',
        title: '└ 제목',
        date: '20XX-XX-XX',
        category: '특별한 날',
        content: '소중한 날 함께했던 추억들을 꺼내어봅니다.',
    },
];

function DiaryPage() {
    const [items, setItems] = useState(INITIAL_DIARY_ITEMS);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('전체');
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchDiaryItems = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('memories')
                .select('*')
                .eq('type', 'text')
                .order('created_at', { ascending: false });

            if (error) {
                console.warn('기록 목록 조회 실패 (Mock 데이터 유지):', error.message);
                return;
            }

            if (data && data.length > 0) {
                const formattedItems = data.map((item) => ({
                    id: item.id,
                    title: item.title || item.file_name || '제목 없음',
                    date: item.created_at ? item.created_at.split('T')[0] : '20XX-XX-XX',
                    category: item.category || '기록',
                    content: item.content || item.description || '',
                    created_at: item.created_at,
                }));
                setItems(formattedItems);
            }
        } catch (error) {
            console.error('기록 불러오기 중 오류 발생:', error);
        }
    }, []);

    useEffect(() => {
        fetchDiaryItems();
    }, [fetchDiaryItems]);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesCategory =
                activeCategory === '전체' || item.category === activeCategory;

            const normalizedSearch = searchTerm.trim().toLowerCase();
            const matchesSearch =
                !normalizedSearch ||
                item.title.toLowerCase().includes(normalizedSearch) ||
                (item.content && item.content.toLowerCase().includes(normalizedSearch));

            return matchesCategory && matchesSearch;
        });
    }, [items, activeCategory, searchTerm]);

    const handleSaveNewItem = (newItem) => {
        setItems((prev) => [newItem, ...prev]);
    };

    const handleDeleteItem = (itemId) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    return (
        <main className="diary-page">
            <header className="diary-header">
                <h1 className="diary-title">나의 애도 기록</h1>
            </header>

            <section className="diary-search-section">
                <DiarySearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onClearSearch={handleClearSearch}
                />
            </section>

            <section className="diary-filter-section">
                <DiaryCategoryChips
                    categories={['전체', '기록', '특별한 날']}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                />
            </section>

            <section className="diary-list-section" aria-label="애도 기록 목록">
                {filteredItems.length > 0 ? (
                    <div className="diary-list">
                        {filteredItems.map((item) => (
                            <DiaryListItem
                                key={item.id}
                                item={item}
                                onClick={setSelectedItem}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="diary-empty-state">
                        <p className="diary-empty-message">
                            {searchTerm
                                ? '검색 결과와 일치하는 기록이 없습니다.'
                                : '등록된 기록이 없습니다.'}
                        </p>
                    </div>
                )}
            </section>

            <button
                type="button"
                className="diary-fab-button"
                onClick={() => setIsWriteModalOpen(true)}
                aria-label="새 기록 작성하기"
            >
                <img
                    src={plusIcon}
                    alt=""
                    className="diary-fab-icon"
                    aria-hidden="true"
                />
            </button>

            <DiaryWriteModal
                isOpen={isWriteModalOpen}
                onClose={() => setIsWriteModalOpen(false)}
                onSave={handleSaveNewItem}
            />

            <DiaryDetailModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onDelete={handleDeleteItem}
            />
        </main>
    );
}

export default DiaryPage;
