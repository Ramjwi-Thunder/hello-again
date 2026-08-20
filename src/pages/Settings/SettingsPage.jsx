import React from 'react';
import './Settings.css';

function SettingsPage({ onEditingChange }) {
  const [view, setView] = React.useState('main');

  // -----------------------------
  // 내 정보
  // -----------------------------

  const [userInfo, setUserInfo] = React.useState({
    name: '홍길동',
    birth: '1997.02.01.',
    gender: '남',
    relation: '자녀',
    phone: '010-1234-1234',
    email: 'abc1234@gmail.com',
  });

  const [editInfo, setEditInfo] = React.useState({
    name: '홍길동',
    birth: '1997.02.01.',
    gender: '남',
    relation: '자녀',
    phone: '010-1234-1234',
    email: 'abc1234@gmail.com',
  });

  const [isEditingInfo, setIsEditingInfo] =
    React.useState(false);

    React.useEffect(() => {
        if (onEditingChange) {
            onEditingChange(isEditingInfo);
        }
    }, [isEditingInfo, onEditingChange]);


  // -----------------------------
  // 메뉴 클릭
  // -----------------------------

  const handleMenuClick = (menu) => {
    setView(menu);
  };


  // -----------------------------
  // 내 정보 수정 시작
  // -----------------------------

  const handleEditInfo = () => {
    setEditInfo({ ...userInfo });
    setIsEditingInfo(true);
  };


  // -----------------------------
  // 내 정보 수정
  // -----------------------------

  const handleEditChange = (key, value) => {
    setEditInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  // -----------------------------
  // 내 정보 수정 완료
  // -----------------------------

  const handleSaveInfo = () => {
    if (!editInfo.name.trim()) {
      alert('성명을 입력해주세요.');
      return;
    }

    if (!editInfo.phone.trim()) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }

    if (!editInfo.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    setUserInfo({ ...editInfo });
    setIsEditingInfo(false);

    alert('내 정보가 수정되었습니다.');
  };


  // -----------------------------
  // 내 정보 수정 취소
  // -----------------------------

  const handleCancelEditInfo = () => {
    setEditInfo({ ...userInfo });
    setIsEditingInfo(false);
  };


  // =========================================================
  // 설정 메인
  // =========================================================

  if (view === 'main') {
    return (
      <main className="settings-page">

        {/* 로그인 / 회원정보 */}
        <section className="settings-section">

          <h2>로그인/회원정보</h2>

          <button
            className="settings-menu"
            onClick={() =>
              handleMenuClick('my-info')
            }
          >
            <span>내 정보</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '로그인 정보 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>로그인 정보</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

        </section>


        {/* 여정 관리 */}
        <section className="settings-section">

          <h2>여정 관리</h2>

          <button
            className="settings-menu"
            onClick={() =>
              handleMenuClick('journey')
            }
          >
            <span>현재 여정</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

          <button
            className="settings-menu"
            onClick={() =>
              handleMenuClick('journey-end')
            }
          >
            <span>여정 종료</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

        </section>


        {/* 기억 및 데이터 관리 */}
        <section className="settings-section">

          <h2>기억 및 데이터 관리</h2>

          <button
            className="settings-menu"
            onClick={() =>
              handleMenuClick('deceased-info')
            }
          >
            <span>고인 정보</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

          <button
            className="settings-menu"
            onClick={() =>
              handleMenuClick('download')
            }
          >
            <span>데이터 다운로드</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

        </section>


        {/* 알림 */}
        <section className="settings-section">

          <h2>알림</h2>

          <div className="settings-menu">

            <span>전체 알림</span>

            <button
              type="button"
              className="settings-toggle active"
              aria-label="전체 알림"
            >
              <span />
            </button>

          </div>


          <div className="settings-menu">

            <span>여정 알림</span>

            <button
              type="button"
              className="settings-toggle active"
              aria-label="여정 알림"
            >
              <span />
            </button>

          </div>


          <div className="settings-menu">

            <span>특별한 날 알림</span>

            <button
              type="button"
              className="settings-toggle active"
              aria-label="특별한 날 알림"
            >
              <span />
            </button>

          </div>

        </section>


        {/* 개인정보 및 보안 */}
        <section className="settings-section">

          <h2>개인정보 및 보안</h2>

          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '개인정보 처리방침 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>개인정보 처리방침</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>


          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '서비스 및 AI 이용 안내 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>서비스 및 AI 이용 안내</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>


          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '데이터 이용 동의 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>데이터 이용 동의</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>


          <button
            className="settings-menu danger"
            onClick={() =>
              alert(
                '계정 및 데이터 삭제 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>계정 및 데이터 삭제</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

        </section>


        {/* 도움말 및 고객지원 */}
        <section className="settings-section">

          <h2>도움말 및 고객지원</h2>

          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '다시, 안녕 이용 방법 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>다시, 안녕 이용 방법</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>


          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '자주 묻는 질문 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>자주 묻는 질문</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>


          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '문의하기 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>문의하기</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>


          <button
            className="settings-menu"
            onClick={() =>
              alert(
                '서비스 신고 / 오류 제보 화면은 다음 단계에서 연결할게요.'
              )
            }
          >
            <span>서비스 신고 / 오류 제보</span>
            <span className="settings-arrow">
              ›
            </span>
          </button>

        </section>

      </main>
    );
  }


  // =========================================================
  // 내 정보
  // =========================================================

  if (view === 'my-info') {

    // -----------------------------
    // 내 정보 수정 화면
    // -----------------------------

    if (isEditingInfo) {

      return (
        <div className="settings-subpage">

          <header className="settings-sub-header">

            <button
              type="button"
              className="settings-back"
              onClick={
                handleCancelEditInfo
              }
            >
              ‹
            </button>

            <h1>내정보</h1>

            <div className="settings-header-action-placeholder" />

          </header>


          <div className="settings-edit-form">

            {/* 성명 */}
            <label>

              성명

              <input
                type="text"
                value={editInfo.name}
                onChange={(e) =>
                  handleEditChange(
                    'name',
                    e.target.value
                  )
                }
              />

            </label>


            {/* 생년월일 */}
            <label>

              생년월일

              <input
                type="text"
                value={editInfo.birth}
                onChange={(e) =>
                  handleEditChange(
                    'birth',
                    e.target.value
                  )
                }
              />

            </label>


            {/* 성별 */}
            <div className="settings-edit-field">

              <span>성별</span>

              <div className="settings-gender-buttons">

                <button
                  type="button"
                  className={
                    editInfo.gender === '남'
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    handleEditChange(
                      'gender',
                      '남'
                    )
                  }
                >
                  남성
                </button>


                <button
                  type="button"
                  className={
                    editInfo.gender === '여'
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    handleEditChange(
                      'gender',
                      '여'
                    )
                  }
                >
                  여성
                </button>

              </div>

            </div>


            {/* 관계 */}
            <label>

              관계

              <select
                value={editInfo.relation}
                onChange={(e) =>
                  handleEditChange(
                    'relation',
                    e.target.value
                  )
                }
              >
                <option value="자녀">
                  자녀
                </option>

                <option value="배우자">
                  배우자
                </option>

                <option value="부모">
                  부모
                </option>

                <option value="형제자매">
                  형제자매
                </option>

                <option value="친구">
                  친구
                </option>

                <option value="기타">
                  기타
                </option>

              </select>

            </label>


            {/* 휴대폰 */}
            <div className="settings-edit-field">

              <span>휴대폰 번호</span>

              <div className="settings-phone-row">

                <input
                  type="text"
                  value={editInfo.phone}
                  onChange={(e) =>
                    handleEditChange(
                      'phone',
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      '인증번호가 전송되었습니다.'
                    )
                  }
                >
                  인증
                </button>

              </div>

            </div>


            {/* 이메일 */}
            <label>

              이메일

              <input
                type="email"
                value={editInfo.email}
                onChange={(e) =>
                  handleEditChange(
                    'email',
                    e.target.value
                  )
                }
              />

            </label>

          </div>


          {/* 하단 버튼 */}
          <div className="settings-edit-buttons">

            <button
              type="button"
              className="cancel"
              onClick={
                handleCancelEditInfo
              }
            >
              취소
            </button>


            <button
              type="button"
              className="save"
              onClick={
                handleSaveInfo
              }
            >
              수정완료
            </button>

          </div>

        </div>
      );
    }


    // -----------------------------
    // 내 정보 조회 화면
    // -----------------------------

    return (
      <div className="settings-subpage">

        <header className="settings-sub-header">

          <button
            type="button"
            className="settings-back"
            onClick={() =>
              setView('main')
            }
          >
            ‹
          </button>

          <h1>내정보</h1>

          <button
            type="button"
            className="settings-header-action"
            onClick={handleEditInfo}
          >
            수정
          </button>

        </header>


        <div className="settings-detail">

          <h2>기본 정보</h2>

          <DetailRow
            label="성명"
            value={userInfo.name}
          />

          <DetailRow
            label="생년월일"
            value={userInfo.birth}
          />

          <DetailRow
            label="성별"
            value={userInfo.gender}
          />

          <DetailRow
            label="관계"
            value={userInfo.relation}
          />

          <DetailRow
            label="휴대폰 번호"
            value={userInfo.phone}
          />

          <DetailRow
            label="이메일"
            value={userInfo.email}
          />

        </div>

      </div>
    );
  }


  // =========================================================
  // 현재 여정
  // =========================================================

  if (view === 'journey') {

    return (
      <div className="settings-subpage">

        <SubHeader
          title="현재 여정"
          onBack={() =>
            setView('main')
          }
        />

        <div className="settings-detail">

          <DetailRow
            label="상태"
            value="진행중"
          />

          <DetailRow
            label="함께하는 분"
            value="아무개"
          />

          <DetailRow
            label="시작일"
            value="2026.08.07."
          />

          <DetailRow
            label="종료일"
            value="2026.09.06."
          />

          <div className="settings-progress-row">

            <span>진행률</span>

            <strong>27%</strong>

          </div>

        </div>

      </div>
    );
  }


  // =========================================================
  // 고인 정보
  // =========================================================

  if (view === 'deceased-info') {

    return (
      <div className="settings-subpage">

        <SubHeader
          title="고인 정보"
          onBack={() =>
            setView('main')
          }
        />

        <div className="settings-detail">

          <h2>기본 정보</h2>

          <DetailRow
            label="성명"
            value="아무개"
          />

          <DetailRow
            label="성별"
            value="남"
          />

          <DetailRow
            label="생년월일"
            value="1968.09.13"
          />

          <DetailRow
            label="별세일"
            value="2025.12.23."
          />


          <h2 className="settings-detail-heading">
            기타 정보
          </h2>


          <DetailRow
            label="성격과 특징"
            value="다정하시고 자상한 분이셨다. 가정적이셨고 별거 아닌 일에도 늘 칭찬을 아끼지 않으셨다."
          />


          <DetailRow
            label="취미"
            value="주말마다 골프 치러 다니시는 걸 낙으로 삼으셨다."
          />

        </div>

      </div>
    );
  }


  // =========================================================
  // 데이터 다운로드
  // =========================================================

  if (view === 'download') {

    return (
      <div className="settings-subpage">

        <SubHeader
          title="데이터 다운로드"
          onBack={() =>
            setView('main')
          }
        />

        <div className="settings-download">

          <p className="settings-download-title">
            다운로드할 항목을 선택해주세요
          </p>


          <div className="settings-download-grid">

            {[
              ['사진', '1,800개'],
              ['영상', '82개'],
              ['음성', '16개'],
              ['텍스트', '120개'],
              [
                '대화 기록',
                '아직 시간이 필요하다면',
              ],
            ].map(([name, count]) => (

              <button
                key={name}
                type="button"
                className={`settings-download-card ${
                  name === '영상'
                    ? 'selected'
                    : ''
                }`}
              >

                <strong>
                  {name}
                </strong>

                <span>
                  {count}
                </span>

                <span className="settings-check">
                  ✓
                </span>

              </button>

            ))}

          </div>


          <button
            type="button"
            className="settings-primary-button"
            onClick={() =>
              alert(
                '데이터 다운로드 기능은 Supabase 연결 후 구현할게요.'
              )
            }
          >
            다운로드
          </button>

        </div>

      </div>
    );
  }


  // =========================================================
  // 여정 종료
  // =========================================================

  if (view === 'journey-end') {

    return (
      <div className="settings-subpage">

        <SubHeader
          title="여정 종료"
          onBack={() =>
            setView('main')
          }
        />


        <div className="settings-confirm">

          <h2>
            여정을 종료하시겠습니까?
          </h2>

          <p>
            종료하면 대화가 중단되며,
            특별한 날 편지는 계속 받을 수 있어요.
          </p>


          <div className="settings-confirm-buttons">

            <button
              type="button"
              onClick={() =>
                setView('main')
              }
            >
              취소
            </button>


            <button
              type="button"
              className="primary"
              onClick={() => {
                alert(
                  '여정이 종료되었습니다.'
                );

                setView('main');
              }}
            >
              종료
            </button>

          </div>

        </div>

      </div>
    );
  }


  return null;
}


// =========================================================
// 공통 헤더
// =========================================================

function SubHeader({
  title,
  onBack,
}) {

  return (
    <header className="settings-sub-header">

      <button
        type="button"
        className="settings-back"
        onClick={onBack}
      >
        ‹
      </button>


      <h1>{title}</h1>


      <div className="settings-header-action-placeholder" />

    </header>
  );
}


// =========================================================
// 상세 정보 한 줄
// =========================================================

function DetailRow({
  label,
  value,
}) {

  return (
    <div className="settings-detail-row">

      <span className="settings-detail-label">
        {label}
      </span>

      <span className="settings-detail-value">
        {value}
      </span>

    </div>
  );
}


export default SettingsPage;