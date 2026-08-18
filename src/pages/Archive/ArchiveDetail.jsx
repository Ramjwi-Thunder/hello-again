import React from 'react';
import { supabase } from '../../lib/supabase';
import './ArchiveDetail.css';

function ArchiveDetail({ memory, onBack }) {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const loadFile = async () => {
      if (!memory?.file_path) {
        setError('파일 경로를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.storage
        .from('archive-files')
        .createSignedUrl(memory.file_path, 60 * 60);

      if (error) {
        console.error('파일 불러오기 실패:', error);
        setError('파일을 불러오지 못했습니다.');
        setLoading(false);
        return;
      }

      setFileUrl(data?.signedUrl || null);
      setLoading(false);
    };

    loadFile();
  }, [memory]);

  if (!memory) {
    return (
      <div className="archive-detail">
        <button
          type="button"
          className="archive-detail-back"
          onClick={onBack}
        >
          ←
        </button>

        <p>파일을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const type = memory.type;

  const fileName =
    memory.file_name ||
    memory.title ||
    '이름 없는 파일';

  const formatDate = (dateString) => {
    if (!dateString) return '';

    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="archive-detail-loading">
          파일을 불러오는 중...
        </div>
      );
    }

    if (error) {
      return (
        <div className="archive-detail-error">
          {error}
        </div>
      );
    }

    if (!fileUrl) {
      return (
        <div className="archive-detail-error">
          파일을 불러오지 못했습니다.
        </div>
      );
    }

    // 사진
    if (type === 'photo') {
      return (
        <div className="archive-detail-photo-wrapper">
          <img
            src={fileUrl}
            alt={fileName}
            className="archive-detail-photo"
          />
        </div>
      );
    }

    // 영상
    if (type === 'video') {
      return (
        <div className="archive-detail-video-wrapper">
          <video
            src={fileUrl}
            controls
            className="archive-detail-video"
          />
        </div>
      );
    }

    // 음성
    if (type === 'audio') {
      return (
        <div className="archive-detail-audio-wrapper">
          <div className="archive-detail-audio-icon">
            🔊
          </div>

          <p className="archive-detail-audio-name">
            {fileName}
          </p>

          <audio
            src={fileUrl}
            controls
            className="archive-detail-audio"
          />
        </div>
      );
    }

    // 텍스트
    if (type === 'text') {
      return (
        <div className="archive-detail-text-wrapper">
          {memory.content ? (
            <p className="archive-detail-text">
              {memory.content}
            </p>
          ) : (
            <p className="archive-detail-no-content">
              이 텍스트 파일은 아직 미리보기 내용을 제공하지 않습니다.
              <br />
              파일을 열어서 확인해주세요.
            </p>
          )}
        </div>
      );
    }

    // PDF
    if (type === 'pdf') {
      return (
        <div className="archive-detail-pdf-wrapper">
          <iframe
            src={fileUrl}
            title={fileName}
            className="archive-detail-pdf"
          />
        </div>
      );
    }

    return (
      <div className="archive-detail-unknown">
        지원하지 않는 파일 형식입니다.
      </div>
    );
  };

  return (
    <main className="archive-detail">
      {/* Header */}
      <div className="archive-detail-header">
        <button
          type="button"
          className="archive-detail-back"
          onClick={onBack}
          aria-label="뒤로가기"
        >
          ←
        </button>

        <h1 className="archive-detail-title">
          {fileName}
        </h1>
      </div>

      {/* Content */}
      <div className="archive-detail-content">
        {renderContent()}
      </div>

      {/* File Information */}
      <div className="archive-detail-info">
        <p className="archive-detail-file-name">
          {fileName}
        </p>

        <p className="archive-detail-date">
          {formatDate(memory.created_at)}
        </p>
      </div>
    </main>
  );
}

export default ArchiveDetail;