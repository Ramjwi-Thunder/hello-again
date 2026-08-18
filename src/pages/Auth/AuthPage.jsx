import './AuthPage.css';

function AuthPage({ onSignUp }) {
  return (
    <div className="auth-screen">
      <div className="auth-content">
        <p className="auth-subtitle">
          그리운 사람의 말투로
          <br />
          다시 마음을 나누는 디지털 유산 서비스
        </p>

        <h1 className="auth-title">다시, 안녕</h1>

        <div className="auth-actions">
          <button
            type="button"
            className="auth-button auth-button--primary"
            onClick={onSignUp}
          >
            회원가입
          </button>

          <button type="button" className="auth-button auth-button--kakao">
            <span className="auth-icon auth-icon--kakao" aria-hidden="true" />
            카카오로 시작하기
          </button>

          <button type="button" className="auth-button auth-button--naver">
            <span className="auth-icon auth-icon--naver" aria-hidden="true" />
            네이버로 시작하기
          </button>

          <button type="button" className="auth-button auth-button--google">
            <span className="auth-icon auth-icon--google" aria-hidden="true" />
            구글로 시작하기
          </button>
        </div>

        <button type="button" className="auth-login-link">
          기존 계정으로 로그인
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
