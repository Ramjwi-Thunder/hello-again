import React from 'react';
import './Archive.css';
import { supabase } from '../../lib/supabase';
import ArchiveUpload from './ArchiveUpload';
import { SearchIcon, InfoIcon, PlusIcon } from './ArchiveIcons';
import ArchiveDetail from './ArchiveDetail';

function ArchivePage({
  isUploading: propIsUploading,
  setIsUploading: propSetIsUploading,
}) {
  const [localIsUploading, setLocalIsUploading] = React.useState(false);

  const isUploading =
    propIsUploading !== undefined ? propIsUploading : localIsUploading;

  const setIsUploading =
    propSetIsUploading || setLocalIsUploading;

  const [memories, setMemories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const [activeTag, setActiveTag] = React.useState('전체');
  const [searchTerm, setSearchTerm] = React.useState('');

  // 선택한 파일
  const [selectedMemory, setSelectedMemory] = React.useState(null);

  // -----------------------------
  // memories 불러오기
  // -----------------------------
  const fetchMemories = React.useCallback(async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('기억 자료 불러오기 실패:', error);
      setError('자료를 불러오지 못했습니다.');
      setMemories([]);
      setLoading(false);
      return;
    }

    setMemories(data || []);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  // -----------------------------
  // 파일 타입 → 화면 표시 이름
  // -----------------------------
  const getTypeLabel = (type) => {
    switch (type) {
      case 'photo':
        return '사진';

      case 'video':
        return '영상';

      case 'audio':
        return '음성';

      case 'pdf':
      case 'text':
        return '텍스트';

      default:
        return '자료';
    }
  };

  // -----------------------------
  // 검색 + 필터
  // -----------------------------
  const filteredMemories = memories.filter((item) => {
    const matchesTag =
      activeTag === '전체' ||
      getTypeLabel(item.type) === activeTag;

    const fileName =
      item.file_name ||
      item.title ||
      '';

    const matchesSearch = fileName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTag && matchesSearch;
  });

  // -----------------------------
  // 날짜 표시
  // -----------------------------
  const formatDate = (dateString) => {
    if (!dateString) return '';

    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // -----------------------------
  // Storage URL
  // -----------------------------
  const getFileUrl = async (filePath) => {
    if (!filePath) return null;

    const { data, error } = await supabase.storage
      .from('archive-files')
      .createSignedUrl(filePath, 60 * 60);

    if (error) {
      console.error('파일 URL 생성 실패:', error);
      return null;
    }

    return data?.signedUrl || null;
  };

  // -----------------------------
  // 사진/영상 미리보기 URL
  // -----------------------------
  const [previewUrls, setPreviewUrls] = React.useState({});

  React.useEffect(() => {
    let cancelled = false;

    const loadPreviewUrls = async () => {
      const mediaMemories = filteredMemories.filter(
        (item) =>
          (item.type === 'photo' || item.type === 'video') &&
          item.file_path
      );

      if (mediaMemories.length === 0) {
        setPreviewUrls({});
        return;
      }

      const entries = await Promise.all(
        mediaMemories.map(async (item) => {
          const url = await getFileUrl(item.file_path);

          return [item.id, url];
        })
      );

      if (!cancelled) {
        const urlMap = Object.fromEntries(
          entries.filter(([, url]) => url)
        );

        setPreviewUrls(urlMap);
      }
    };

    loadPreviewUrls();

    return () => {
      cancelled = true;
    };
  }, [filteredMemories]);

  // -----------------------------
  // 상세 페이지
  // -----------------------------
  if (selectedMemory) {
    return (
      <ArchiveDetail
  memory={selectedMemory}
  onBack={() => setSelectedMemory(null)}
  onDeleted={fetchMemories}
/>
    );
  }

  // -----------------------------
  // 업로드 화면
  // -----------------------------
  if (isUploading) {
    return (
      <ArchiveUpload
        onCancel={() => setIsUploading(false)}
        onSuccess={() => {
          setIsUploading(false);
          fetchMemories();
        }}
      />
    );
  }

  // -----------------------------
  // 미디어 갤러리
  // -----------------------------
  const renderMediaGallery = () => {
    if (filteredMemories.length === 0) {
      return null;
    }

    return (
      <div className="archive-media-grid">
        {filteredMemories.map((item) => {
          const url = previewUrls[item.id];

          return (
            <div
              key={item.id}
              className="archive-media-card"
              onClick={() => setSelectedMemory(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedMemory(item);
                }
              }}
            >
              {item.type === 'photo' ? (
                url ? (
                  <img
                    src={url}
                    alt={item.file_name || item.title || '사진'}
                    className="archive-media-image"
                  />
                ) : (
                  <div className="archive-media-placeholder">
                    사진 불러오는 중...
                  </div>
                )
              ) : (
                url ? (
                  <video
                    src={url}
                    className="archive-media-image"
                    controls
                    preload="metadata"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="archive-media-placeholder">
                    영상 불러오는 중...
                  </div>
                )
              )}

              <div className="archive-media-info">
                <p className="archive-media-name">
                  {item.file_name || item.title || '이름 없음'}
                </p>

                <span className="archive-media-date">
                  {formatDate(item.created_at)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // -----------------------------
  // 전체 / 음성 / 텍스트 리스트
  // -----------------------------
  const renderList = () => {
    if (filteredMemories.length === 0) {
      return null;
    }

    return (
      <div className="archive-list">
        {filteredMemories.map((item) => (
          <div
            key={item.id}
            className="archive-list-item"
            onClick={() => setSelectedMemory(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedMemory(item);
              }
            }}
          >
            <div className="archive-list-main">
              <span className="archive-list-type">
                {getTypeLabel(item.type)}
              </span>

              <p className="archive-list-name">
                {item.file_name ||
                  item.title ||
                  '이름 없음'}
              </p>
            </div>

            <span className="archive-list-date">
              {formatDate(item.created_at)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // -----------------------------
  // 화면
  // -----------------------------
  return (
    <main className="archive-main">

      {/* Search */}
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
        {['전체', '사진', '영상', '음성', '텍스트'].map((tag) => {
          const isActive = activeTag === tag;

          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`tag-button ${
                isActive ? 'active' : 'inactive'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="archive-status-message loading">
          불러오는 중...
        </div>
      ) : error ? (
        <div className="archive-status-message">
          {error}
        </div>
      ) : filteredMemories.length === 0 ? (
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
      ) : activeTag === '사진' || activeTag === '영상' ? (
        renderMediaGallery()
      ) : (
        renderList()
      )}

      {/* FAB */}
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