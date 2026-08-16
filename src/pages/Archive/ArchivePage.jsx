import React from 'react';
import './Archive.css';
import { supabase } from '../../lib/supabase';

function ArchivePage() {
const [archives, setArchives] = React.useState([]);
const [loading, setLoading] = React.useState(true);

React.useEffect(() => {
  const fetchArchives = async () => {
    const { data, error } = await supabase
      .from('archives')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('자료 불러오기 실패:', error);
      return;
    }

    setArchives(data || []);
    setLoading(false);
  };

  fetchArchives();
}, []);

  const tags = ['전체', '사진', '영상', '음성', '텍스트'];
  const [activeTag, setActiveTag] = React.useState('전체');
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <main
      style={{
        width: '100%',
        height: '100%',
        padding: '16px 20px 20px',
        boxSizing: 'border-box',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <h1 style={{ margin: '0 0 20px 0', fontSize: '23px', fontWeight: 700, color: '#111827', textAlign: 'left' }}>
        기억 보관함
      </h1>

      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '45px',
          padding: '16px 15px',
          alignItems: 'center',
          gap: '7px',
          borderRadius: '12px',
          background: '#F3F4F6',
          marginBottom: '16px',
          boxSizing: 'border-box',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            width: '20px',
            height: '20px',
            flexShrink: 0,
            aspectRatio: '1/1',
          }}
        >
          <path d="M7.91667 13.3333C6.40278 13.3333 5.12167 12.8089 4.07333 11.76C3.025 10.7111 2.50056 9.43 2.5 7.91667C2.49944 6.40333 3.02389 5.12222 4.07333 4.07333C5.12278 3.02444 6.40389 2.5 7.91667 2.5C9.42944 2.5 10.7108 3.02444 11.7608 4.07333C12.8108 5.12222 13.335 6.40333 13.3333 7.91667C13.3333 8.52778 13.2361 9.10417 13.0417 9.64583C12.8472 10.1875 12.5833 10.6667 12.25 11.0833L16.9167 15.75C17.0694 15.9028 17.1458 16.0972 17.1458 16.3333C17.1458 16.5694 17.0694 16.7639 16.9167 16.9167C16.7639 17.0694 16.5694 17.1458 16.3333 17.1458C16.0972 17.1458 15.9028 17.0694 15.75 16.9167L11.0833 12.25C10.6667 12.5833 10.1875 12.8472 9.64583 13.0417C9.10417 13.2361 8.52778 13.3333 7.91667 13.3333ZM7.91667 11.6667C8.95833 11.6667 9.84389 11.3022 10.5733 10.5733C11.3028 9.84444 11.6672 8.95889 11.6667 7.91667C11.6661 6.87444 11.3017 5.98917 10.5733 5.26083C9.845 4.5325 8.95944 4.16778 7.91667 4.16667C6.87389 4.16556 5.98861 4.53028 5.26083 5.26083C4.53306 5.99139 4.16833 6.87667 4.16667 7.91667C4.165 8.95667 4.52972 9.84222 5.26083 10.5733C5.99194 11.3044 6.87722 11.6689 7.91667 11.6667Z" fill="#9E9E9E" />
        </svg>
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 0 0',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: '#9E9E9E',
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '23px',
            letterSpacing: '-0.32px',
          }}
        />
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflow: 'auto', paddingBottom: '4px' }}>
        {tags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`tag-button ${isActive ? 'active' : 'inactive'}`}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                color: isActive ? '#000000' : '#a9a9a9',
                background: isActive ? '#ffffff' : '#F3F4F6',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '12px',
          marginTop: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            width: '100%',
            maxWidth: '320px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              flexShrink: 0,
              marginTop: '-4px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 22 22"
              fill="none"
              style={{
                width: '18px',
                height: '18px',
                aspectRatio: '1/1',
              }}
            >
              <path d="M10.5423 2.75C12.8519 2.75 15.0669 3.66748 16.7 5.30061C18.3332 6.93374 19.2507 9.14874 19.2507 11.4583C19.2507 13.7679 18.3332 15.9829 16.7 17.6161C15.0669 19.2492 12.8519 20.1667 10.5423 20.1667C8.23272 20.1667 6.01772 19.2492 4.3846 17.6161C2.75147 15.9829 1.83398 13.7679 1.83398 11.4583C1.83398 9.14874 2.75147 6.93374 4.3846 5.30061C6.01772 3.66748 8.23272 2.75 10.5423 2.75ZM10.5423 3.66667C8.47584 3.66667 6.494 4.48757 5.03278 5.94879C3.57156 7.41001 2.75065 9.39185 2.75065 11.4583C2.75065 13.5248 3.57156 15.5067 5.03278 16.9679C6.494 18.4291 8.47584 19.25 10.5423 19.25C11.5655 19.25 12.5787 19.0485 13.5241 18.6569C14.4694 18.2653 15.3283 17.6914 16.0519 16.9679C16.7754 16.2444 17.3493 15.3854 17.7409 14.4401C18.1324 13.4947 18.334 12.4815 18.334 11.4583C18.334 9.39185 17.5131 7.41001 16.0519 5.94879C14.5906 4.48757 12.6088 3.66667 10.5423 3.66667ZM10.084 7.33333V9.16667H11.0007V7.33333H10.084ZM10.084 11V15.5833H11.0007V11H10.084Z" fill="#646464" />
            </svg>
          </div>
          <p
            style={{
              margin: 0,
              color: '#646464',
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '130%',
              letterSpacing: '-0.28px',
              textAlign: 'left',
              flex: 1,
            }}
          >
            아직 등록된 자료가 없습니다.
            <br />
            대표 관리자가 유품을 업로드하면 이곳에 표시됩니다.
            <br />
            모든 자료는 안전하게 암호화되어 보관되며 가족만 열람할 수 있습니다.
          </p>
        </div>
      </div>

      {/* FAB Button */}
      <button
        type="button"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '35px',
          height: '35px',
          aspectRatio: '1/1',
          borderRadius: '99px',
          border: 'none',
          background: '#8B8DFF',
          color: '#ffffff',
          cursor: 'pointer',
          boxShadow: '0 4px 5px 0 rgba(158, 158, 158, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            width: '23.333px',
            height: '23.333px',
            aspectRatio: '1/1',
          }}
        >
          <path d="M20.3325 13.1111H13.1102V20.3333C13.1102 20.7164 12.9581 21.0838 12.6872 21.3547C12.4163 21.6256 12.0489 21.7778 11.6658 21.7778C11.2827 21.7778 10.9153 21.6256 10.6444 21.3547C10.3735 21.0838 10.2214 20.7164 10.2214 20.3333V13.1111H2.99913C2.61604 13.1111 2.24864 12.9589 1.97776 12.688C1.70687 12.4171 1.55469 12.0497 1.55469 11.6667C1.55469 11.2836 1.70687 10.9162 1.97776 10.6453C2.24864 10.3744 2.61604 10.2222 2.99913 10.2222H10.2214V2.99999C10.2214 2.6169 10.3735 2.2495 10.6444 1.97861C10.9153 1.70772 11.2827 1.55554 11.6658 1.55554C12.0489 1.55554 12.4163 1.70772 12.6872 1.97861C12.9581 2.2495 13.1102 2.6169 13.1102 2.99999V10.2222H20.3325C20.7156 10.2222 21.083 10.3744 21.3538 10.6453C21.6247 10.9162 21.7769 11.2836 21.7769 11.6667C21.7769 12.0497 21.6247 12.4171 21.3538 12.688C21.083 12.9589 20.7156 13.1111 20.3325 13.1111Z" fill="white" />
        </svg>
      </button>
    </main>
  );
}

export default ArchivePage;
