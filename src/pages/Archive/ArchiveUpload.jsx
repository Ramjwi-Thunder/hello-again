import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import './ArchiveUpload.css';
import { InfoIcon, UploadIcon } from './ArchiveIcons';

const getCategory = (file) => {
  const type = file.type || '';
  const name = file.name.toLowerCase();

  if (
    type.startsWith('image/') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.png')
  ) {
    return 'photo';
  }

  if (
    type.startsWith('video/') ||
    name.endsWith('.mp4') ||
    name.endsWith('.mov')
  ) {
    return 'video';
  }

  if (
    type.startsWith('audio/') ||
    name.endsWith('.mp3') ||
    name.endsWith('.m4a') ||
    name.endsWith('.wav')
  ) {
    return 'audio';
  }

  return 'text';
};

function ArchiveUpload({ onCancel, onSuccess }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      // ① 현재 로그인 세션 확인
      let {
        data: { session },
      } = await supabase.auth.getSession();

      // 로그인되어 있지 않으면 익명 로그인
      if (!session) {
        const { data, error } = await supabase.auth.signInAnonymously();

        if (error) {
          console.error('익명 로그인 실패:', error);
          throw error;
        }

        session = data.session;
      }

      // ② 현재 사용자 확인
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('로그인한 사용자를 찾을 수 없습니다.');
      }

      console.log('현재 사용자:', user.id);

      // ③ profiles 생성/확인
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          {
            id: user.id,
            name: '익명 사용자',
          },
          {
            onConflict: 'id',
          }
        );

      if (profileError) {
        console.error('profiles 생성 실패:', profileError);
        throw profileError;
      }

      // ④ 기존 memorial 찾기
      let {
        data: memorial,
        error: memorialSelectError,
      } = await supabase
        .from('memorials')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (memorialSelectError) {
        console.error('기존 memorial 조회 실패:', memorialSelectError);
        throw memorialSelectError;
      }

      // 기존 memorial이 없을 때만 생성
      if (!memorial) {
        const {
          data: newMemorial,
          error: memorialInsertError,
        } = await supabase
          .from('memorials')
          .insert({
            user_id: user.id,
            name: '고인',
            status: 'active',
          })
          .select()
          .single();

        if (memorialInsertError) {
          console.error('memorial 생성 실패:', memorialInsertError);
          throw memorialInsertError;
        }

        memorial = newMemorial;

        console.log('새 memorial 생성:', memorial.id);
      } else {
        console.log('기존 memorial 사용:', memorial.id);
      }

      // ⑤ 기존 archive 찾기
      let {
        data: archive,
        error: archiveSelectError,
      } = await supabase
        .from('archives')
        .select('*')
        .eq('memorial_id', memorial.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (archiveSelectError) {
        console.error('기존 archive 조회 실패:', archiveSelectError);
        throw archiveSelectError;
      }

      // 기존 archive가 없을 때만 생성
      if (!archive) {
        const {
          data: newArchive,
          error: archiveInsertError,
        } = await supabase
          .from('archives')
          .insert({
            memorial_id: memorial.id,
            title: '기억 보관함',
            description: '고인의 소중한 기억을 보관합니다.',
          })
          .select()
          .single();

        if (archiveInsertError) {
          console.error('archive 생성 실패:', archiveInsertError);
          throw archiveInsertError;
        }

        archive = newArchive;

        console.log('새 archive 생성:', archive.id);
      } else {
        console.log('기존 archive 사용:', archive.id);
      }

      // ⑥ 선택한 파일들을 Storage + memories에 저장
      for (const file of selectedFiles) {
        const fileExtension = file.name.split('.').pop();

        const filePath = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

        // Storage 업로드
        const {
          data: uploadData,
          error: uploadError,
        } = await supabase.storage
          .from('archive-files')
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          console.error('Storage 업로드 실패:', uploadError);
          throw uploadError;
        }

        console.log('파일 업로드 성공:', uploadData.path);

        // memories 테이블에 파일 정보 저장
        const {
          data: memory,
          error: memoryError,
        } = await supabase
          .from('memories')
          .insert({
            archive_id: archive.id,
            type: getCategory(file),
            title: file.name,
            content: null,
            file_path: filePath,
            file_name: file.name,
            mime_type: file.type,
            created_by: user.id,
          })
          .select()
          .single();

        if (memoryError) {
          console.error('memories 저장 실패:', memoryError);
          throw memoryError;
        }

        console.log('memory 저장 성공:', memory);
      }

      alert('파일 업로드가 완료되었습니다.');

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('업로드 중 오류:', err);

      alert(
        `파일 업로드에 실패했습니다.\n${
          err.message || '알 수 없는 오류'
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="archive-upload-container">
      <div className="archive-upload-content">
        <div
          style={{
            color: '#090909',
            fontSize: 18,
            fontFamily: 'Pretendard',
            fontWeight: '500',
            lineHeight: '21px',
            wordWrap: 'break-word',
            marginBottom: 6,
            transform: 'translateX(-50px)',
          }}
        >
          고인의 데이터를 입력해주세요
        </div>

        <div
          style={{
            color: '#646464',
            fontSize: 11.5,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            lineHeight: '18.20px',
            wordWrap: 'break-word',
            marginBottom: 20,
          }}
        >
          사진, 음성, 영상, 글이 많을수록 더 자연스러운 대화가 만들어져요.
        </div>

        {/* Dropzone Area */}
        <div
          className={`archive-dropzone ${
            isDragging ? 'dragging' : ''
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            style={{ display: 'none' }}
            accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
          />

          <div className="archive-dropzone-icon">
            <UploadIcon />
          </div>

          <p className="archive-dropzone-text">
            파일을 끌어다 놓거나
            <br />
            탭해서 선택하세요
          </p>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="archive-file-list">
            <div className="archive-file-list-header">
              선택된 파일 ({selectedFiles.length}개)
            </div>

            {selectedFiles.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="archive-file-item"
              >
                <span className="archive-file-type">
                  {getCategory(file)}
                </span>

                <span className="archive-file-name">
                  {file.name}
                </span>

                <button
                  type="button"
                  className="archive-file-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(idx);
                  }}
                  aria-label="파일 삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Notice Section */}
        <div className="archive-notice-card">
          <div className="archive-notice-header">
            <InfoIcon fill="#090909" />
            <span>등록 전 유의사항</span>
          </div>

          <ul className="archive-notice-list">
            <li>
              업로드된 파일은 권한 있는 유가족만 열람할 수 있습니다.
            </li>
            <li>
              파일은 외부에 공개되거나 AI 학습에 자동 사용되지 않습니다.
            </li>
            <li>
              등록 후에는 보관소에서 개별 파일을 삭제할 수 있습니다.
            </li>
            <li>
              지원 형식: JPG·PNG (사진), MP4 (영상), MP3·M4A
              (음성), TXT·PDF (텍스트)
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="archive-upload-actions">
        <button
          type="button"
          className="archive-btn-cancel"
          onClick={onCancel}
          disabled={submitting}
        >
          취소
        </button>

        <button
          type="button"
          className="archive-btn-submit"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? '업로드 중...' : '등록 완료'}
        </button>
      </div>
    </div>
  );
}

export default ArchiveUpload;