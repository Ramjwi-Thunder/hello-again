import React from 'react';

function TermItem({ iconSrc, text, agreed = false, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 20px',
        border: 'none',
        borderRadius: '16px',
        background: '#fff',
        cursor: 'pointer',
        textAlign: 'left',
        boxSizing: 'border-box',
      }}
    >
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        style={{ width: '24px', height: '24px', flexShrink: 0 }}
      />
      <span
        style={{
          flex: 1,
          fontSize: '15px',
          lineHeight: '22px',
          color: '#1f1f1f',
          fontWeight: 500,
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '999px',
          border: `2px solid ${agreed ? '#111' : '#c9c9c9'}`,
          background: agreed ? '#111' : 'transparent',
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      />
    </button>
  );
}

export default TermItem;
