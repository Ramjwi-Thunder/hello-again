import React from 'react';
import { supabase } from '../../lib/supabase';
import './ArchiveDetail.css';

function ArchiveDetail({ memory, onBack, onDeleted }) {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [textContent, setTextContent] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const loadFile = async () => {
      if (!memory?.file_path) {
        setError('파일 경로를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const { data, error: urlError } = await supabase.storage
          .from('archive-files')
          .createSignedUrl(memory.file_path, 60 * 60);

        if (urlError) {
          throw urlError;
        }

        const signedUrl = data?.signedUrl;

        if (!signedUrl) {
          throw new Error('파일 URL을 생성할 수 없습니다.');
        }

        setFileUrl(signedUrl);

        // TXT 파일이면 실제 파일 내용 읽기
        if (memory.type === 'text') {
          const response = await fetch(signedUrl);

          if (!response.ok) {
            throw new Error('텍스트 파일을 읽을 수 없습니다.');
          }

          const text = await response.text();
          setTextContent(text);
        }
      } catch (err) {
        console.error('파일 불러오기 실패:', err);
        setError('파일을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [memory]);

  // -----------------------------
  // 파일 삭제
  // -----------------------------
  const handleDelete = async () => {
    if (!memory) return;

    const fileName =
      memory.file_name ||
      memory.title ||
      '이 파일';

    const confirmed = window.confirm(
      `"${fileName}"을(를) 삭제하시겠습니까?\n\n삭제한 파일은 복구할 수 없습니다.`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      // ① Storage에서 실제 파일 삭제
      if (memory.file_path) {
        const { error: storageError } = await supabase.storage
          .from('archive-files')
          .remove([memory.file_path]);

        if (storageError) {
          console.error('Storage 파일 삭제 실패:', storageError);
          throw storageError;
        }
      }

      // ② memories 테이블에서 데이터 삭제
      const { error: memoryError } = await supabase
        .from('memories')
        .delete()
        .eq('id', memory.id);

      if (memoryError) {
        console.error('memory DB 삭제 실패:', memoryError);
        throw memoryError;
      }

      // ③ 삭제 성공
      alert('파일이 삭제되었습니다.');

      // ⭐ 부모 ArchivePage의 목록을 즉시 새로고침
      if (onDeleted) {
        await onDeleted();
      }

      // ⭐ 상세 화면 닫기
      if (onBack) {
        onBack();
      }
    } catch (err) {
      console.error('파일 삭제 중 오류:', err);

      alert(
        `파일 삭제에 실패했습니다.\n${
          err.message || '알 수 없는 오류가 발생했습니다.'
        }`
      );
    } finally {
      setDeleting(false);
    }
  };

  // -----------------------------
  // memory가 없는 경우
  // -----------------------------
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

  // -----------------------------
  // 파일 화면
  // -----------------------------
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

    // 사진
    if (memory.type === 'photo') {
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
    if (memory.type === 'video') {
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
    if (memory.type === 'audio') {
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

    // TXT
    if (memory.type === 'text') {
      return (
        <div className="archive-detail-text-wrapper">
          <p className="archive-detail-text">
            {textContent || '내용이 없는 텍스트 파일입니다.'}
          </p>
        </div>
      );
    }

    // PDF
    if (memory.type === 'pdf') {
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
          disabled={deleting}
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

        {/* Delete Button */}
        <button
          type="button"
          className="archive-detail-delete"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? '삭제 중...' : '파일 삭제'}
        </button>

      </div>

    </main>
  );
}

export default ArchiveDetail;