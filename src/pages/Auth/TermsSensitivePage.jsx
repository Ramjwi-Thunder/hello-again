import React from 'react';
import TermsDetailPage from './TermsDetailPage';

const body = `민감정보 처리 동의

제1조 민감정보의 처리
민감정보는 법령이 허용하는 범위에서만 처리합니다.

제2조 처리 목적
동의 범위 내에서만 서비스를 제공하고 운영합니다.

제3조 안전성 확보
민감정보는 암호화 및 접근 통제 등 적절한 보호조치를 적용합니다.

제4조 동의 철회
이용자는 언제든지 민감정보 처리 동의를 철회할 수 있습니다.`;

const TermsSensitivePage = ({ onAcceptTerms, onBackClick }) => {
  return <TermsDetailPage title="민감정보 처리 동의" body={body} onAcceptTerms={onAcceptTerms} onBackClick={onBackClick} />;
};

export default TermsSensitivePage;
