import React from 'react';
import TermsDetailPage from './TermsDetailPage';

const body = `개인정보 수집 및 이용 안내

제1조 수집하는 개인정보 항목
서비스 제공을 위해 필요한 최소한의 정보만 수집합니다.

제2조 개인정보의 이용 목적
수집된 정보는 서비스 제공, 고객 지원, 안정성 개선을 위해 사용됩니다.

제3조 보유 및 이용 기간
법령이 정한 기간 또는 이용 목적 달성 시까지 보관합니다.

제4조 동의 거부 권리
이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다.`;

const TermsPrivacyPage = ({ onAcceptTerms, onBackClick }) => {
  return <TermsDetailPage title="개인정보 수집 및 이용 안내" body={body} onAcceptTerms={onAcceptTerms} onBackClick={onBackClick} />;
};

export default TermsPrivacyPage;
