function ArchivePage() {
  const tags = ['전체', '사진', '영상', '문서', '스티커'];
  const files = [
    { name: '제목1.jpg', meta: '2024.09.10' },
    { name: '제목2.mp3', meta: '2024.09.10' },
    { name: '제목3.mov', meta: '2024.09.10' },
    { name: '제목4.pdf', meta: '2024.09.10' },
    { name: '제목5.txt', meta: '2024.09.10' },
    { name: '제목6.png', meta: '2024.09.10' },
  ];

  return (
    <main
      style={{
        width: '100%',
        height: '100%',
        padding: '12px 16px 18px',
        boxSizing: 'border-box',
        background: '#eeecef',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          background: '#f2e8ff',
          borderRadius: '22px',
          padding: '14px 14px 10px',
          boxShadow: '0 8px 18px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: '11px',
            color: '#111827',
            marginBottom: '12px',
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px' }}>◔◔</span>
            <span style={{ fontSize: '10px' }}>▣</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>기억 보관함</h2>
          <button
            type="button"
            style={{
              width: '28px',
              height: '28px',
              border: 'none',
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              fontSize: '18px',
              color: '#111827',
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '12px',
            padding: '8px 10px',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontSize: '13px' }}>⌕</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>검색</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {tags.map((tag, index) => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: index === 0 ? '48px' : 'auto',
                padding: '6px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 600,
                color: index === 0 ? '#111827' : '#4b5563',
                background: index === 0 ? '#ffffff' : '#f3f4f6',
                border: index === 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '12px 12px 8px',
            border: '1px solid rgba(17,24,39,0.05)',
          }}
        >
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>보관 정보</div>
          <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.55', color: '#374151' }}>
            아직 보관된 파일이 없습니다.
            <br />
            이미지, 문서, 음성 등을 저장하면
            <br />
            여기에 정리됩니다.
          </p>
        </div>
      </div>

      <div
        style={{
          background: '#f7f7f9',
          borderRadius: '20px',
          padding: '12px 12px 8px',
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>최근 파일</h3>
          <button type="button" style={{ background: 'transparent', border: 'none', fontSize: '18px', color: '#111827', cursor: 'pointer' }}>
            ⋯
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 8px',
                borderRadius: '12px',
                background: index % 2 === 0 ? '#ffffff' : '#f2f4f7',
                border: '1px solid rgba(17,24,39,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '8px',
                    background: '#dfe7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: '#4f46e5',
                    fontWeight: 700,
                  }}
                >
                  {file.name.split('.').pop().toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{file.name}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{file.meta}</div>
                </div>
              </div>
              <span style={{ fontSize: '16px', color: '#6b7280' }}>›</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          paddingTop: '8px',
        }}
      >
        <button
          type="button"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            border: 'none',
            background: '#ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            fontSize: '18px',
            color: '#111827',
          }}
        >
          ⊕
        </button>
      </div>
    </main>
  );
}

export default ArchivePage;
