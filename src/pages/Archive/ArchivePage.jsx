import React from 'react';
import './Archive.css';
import { supabase } from '../../lib/supabase';
import ArchiveUpload from './ArchiveUpload';
import { SearchIcon, InfoIcon, PlusIcon } from './ArchiveIcons';

function ArchivePage({ isUploading: propIsUploading, setIsUploading: propSetIsUploading }) {
  const [localIsUploading, setLocalIsUploading] = React.useState(false);
  const isUploading = propIsUploading !== undefined ? propIsUploading : localIsUploading;
  const setIsUploading = propSetIsUploading || setLocalIsUploading;

  const [archives, setArchives] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchArchives = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('archives')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('자료 불러오기 실패:', error);
      setLoading(false);
      return;
    }

    setArchives(data || []);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  const tags = ['전체', '사진', '영상', '음성', '텍스트'];
  const [activeTag, setActiveTag] = React.useState('전체');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredArchives = archives.filter((item) => {
    const matchesTag =
      activeTag === '전체' || item.type === activeTag || item.category === activeTag;
    const name = item.name || item.title || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  if (isUploading) {
    return (
      <ArchiveUpload
        onCancel={() => setIsUploading(false)}
        onSuccess={() => {
          setIsUploading(false);
          fetchArchives();
        }}
      />
    );
  }

  return (
    <main className="archive-main">
      {/* Search Bar */}
      <div className="archive-search-bar">
        <SearchIcon className="archive-search-icon" />
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="archive-search-input"
        />
      </div>

      {/* Tags */}
      <div className="archive-tags-container">
        {tags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`tag-button ${isActive ? 'active' : 'inactive'}`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="archive-status-message loading">
          불러오는 중...
        </div>
      ) : filteredArchives.length > 0 ? (
        <div className="archive-grid">
          {filteredArchives.map((item, index) => (
            <div key={item.id || index} className="archive-card">
              <span className="archive-card-tag">{item.type || '자료'}</span>
              <p className="archive-card-name">{item.name || item.title || '이름 없음'}</p>
              {item.created_at && (
                <span className="archive-card-date">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="archive-empty-container">
          <div className="archive-empty-wrapper">
            <div className="archive-empty-icon-wrapper">
              <InfoIcon className="archive-empty-icon" />
            </div>
            <p className="archive-empty-text">
              아직 등록된 자료가 없습니다.
              <br />
              대표 관리자가 유품을 업로드하면 이곳에 표시됩니다.
              <br />
              모든 자료는 안전하게 암호화되어 보관되며 가족만 열람할 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        type="button"
        onClick={() => setIsUploading(true)}
        className="archive-fab-button"
      >
        <PlusIcon className="archive-fab-icon" />
      </button>
    </main>
  );
}

export default ArchivePage;
