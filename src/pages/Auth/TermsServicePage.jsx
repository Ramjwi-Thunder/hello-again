import React from 'react';
import TermsDetailPage from './TermsDetailPage';

const body = `서비스 이용약관

제1조 목적
이 약관은 서비스 이용과 관련하여 필요한 기본적인 사항을 정합니다.

제2조 약관의 효력 및 변경
회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.

제3조 서비스의 제공
회사는 안정적인 서비스 제공을 위해 노력합니다.

제4조 이용자의 의무
이용자는 관계 법령, 약관, 공지사항을 준수해야 합니다.`;

const TermsServicePage = ({ onAcceptTerms, onBackClick }) => {
  return <TermsDetailPage title="서비스 이용약관 동의" body={body} onAcceptTerms={onAcceptTerms} onBackClick={onBackClick} />;
};

export default TermsServicePage;
