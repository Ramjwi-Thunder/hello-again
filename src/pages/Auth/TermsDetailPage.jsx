import React from 'react';
import TopBar from '../../components/common/TopBar';
import './TermsDetailPage.css';

const TermsDetailPage = ({ title, body, onAcceptTerms, onBackClick }) => {
  return (
    <div className="terms-detail-page">
      <header className="terms-detail-page__header">
        <TopBar title={title} onBackClick={onBackClick} />
      </header>
      <main className="terms-detail-page__content">
        <section className="terms-detail-page__body-wrap">
          <p className="terms-detail-page__body">{body}</p>
        </section>
        <button type="button" className="terms-detail-page__agree-button" onClick={onAcceptTerms}>
          동의하기
        </button>
      </main>
    </div>
  );
};

export default TermsDetailPage;
