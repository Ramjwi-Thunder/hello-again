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


  const [showCustomDurationInput, setShowCustomDurationInput] = React.useState(false);
  const [customDuration, setCustomDuration] = React.useState('');

  const [isEditingInfo, setIsEditingInfo] =
    React.useState(false);

  // -----------------------------
  // 현재 여정 수정
  // -----------------------------

  const [isEditingJourney, setIsEditingJourney] =
    React.useState(false);

  const [journeySettings, setJourneySettings] =
    React.useState({
      duration: 45,
      paused: false,
      ended: false,
    });

  const [editJourneySettings, setEditJourneySettings] =
    React.useState({
      duration: 45,
      paused: false,
    });

  React.useEffect(() => {
    if (onEditingChange) {
      onEditingChange(isEditingInfo || isEditingJourney);
    }
  }, [isEditingInfo, isEditingJourney, onEditingChange]);


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

  // -----------------------------
  // 현재 여정 수정 시작
  // -----------------------------

  const handleEditJourney = () => {
    setEditJourneySettings({ ...journeySettings });
    setIsEditingJourney(true);
  };

  const handleJourneyDurationChange = (duration) => {
    setEditJourneySettings((prev) => ({
      ...prev,
      duration,
      paused: false,
    }));
  };

  const handleJourneyPauseChange = () => {
    setEditJourneySettings((prev) => ({
      ...prev,
      paused: !prev.paused,
    }));
  };

  const handleSaveJourney = () => {
    setJourneySettings({
      ...editJourneySettings,
      ended: journeySettings.ended,
    });
    setIsEditingJourney(false);
    setShowCustomDurationInput(false);
    setCustomDuration('');
  };

  const handleCancelJourneyEdit = () => {
    setEditJourneySettings({ ...journeySettings });
    setIsEditingJourney(false);
    setShowCustomDurationInput(false);
    setCustomDuration('');
  };

  const getJourneyEndDate = (duration) => {
    const startDate = new Date(2026, 7, 7);
    startDate.setDate(startDate.getDate() + Number(duration));

    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}.`;
  };

  const getJourneyProgress = (duration) => {
    const startDate = new Date(2026, 7, 7);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const elapsedDays = Math.floor(
      (today - startDate) / (1000 * 60 * 60 * 24)
    );

    const progress = Math.round(
      (elapsedDays / Number(duration)) * 100
    );

    return Math.min(100, Math.max(0, progress));
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

    // -----------------------------
    // 현재 여정 수정 화면
    // -----------------------------

    if (isEditingJourney) {
      return (
        <div
          className="settings-subpage"
          style={{
            position: 'relative',
            minHeight: '100%',
            boxSizing: 'border-box',
          }}
        >
          <header className="settings-sub-header">
            <button
              type="button"
              className="settings-back"
              onClick={handleCancelJourneyEdit}
              aria-label="뒤로가기"
            >
              ‹
            </button>

            <h1 aria-hidden="true"></h1>

            <div className="settings-header-action-placeholder" />
          </header>

          <div
            style={{
              padding: '24px 24px 110px',
              boxSizing: 'border-box',
            }}
          >
            <section>
              <h2
                style={{
                  margin: '0 0 6px',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                애도 기간을 설정해주세요.
              </h2>

              <p
                style={{
                  margin: '0 0 18px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: '#999',
                }}
              >
                선택한 기간에 맞춰 홈 화면의 기억의 여정 진행률이
                조정돼요.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                }}
              >
                {[
                  ['30', 30, '마음이 조금 정리됐다면'],
                  ['45', 45, '추천'],
                  ['60', 60, '아직 시간이 필요하다면'],
                ].map(([label, duration, description]) => (
                  <button
                    key={duration}
                    type="button"
                    onClick={() =>
                      handleJourneyDurationChange(duration)
                    }
                    style={{
                      position: 'relative',
                      height: '94px',
                      padding: '16px',
                      textAlign: 'left',
                      borderRadius: '12px',
                      border:
                        editJourneySettings.duration === duration
                          ? '2px solid #8888ff'
                          : '1px solid #eee',
                      background:
                        editJourneySettings.duration === duration
                          ? '#fff'
                          : '#f7f7f7',
                      color: '#666',
                    }}
                  >
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        marginBottom: '10px',
                      }}
                    >
                      {label}일
                    </strong>

                    <span
                      style={{
                        fontSize: '12px',
                        color: '#a5afc0',
                      }}
                    >
                      {description}
                    </span>

                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background:
                          editJourneySettings.duration === duration
                            ? '#8888ff'
                            : '#e5e5e5',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                      }}
                    >
                      ✓
                    </span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const isCustom =
                      ![30, 45, 60].includes(editJourneySettings.duration);

                    setCustomDuration(
                      isCustom
                        ? String(editJourneySettings.duration)
                        : ''
                    );
                    setShowCustomDurationInput(true);
                  }}

                  style={{
                    position: 'relative',
                    height: '94px',
                    padding: '16px',
                    textAlign: 'left',
                    borderRadius: '12px',
                    border:
                      ![30, 45, 60].includes(editJourneySettings.duration)
                        ? '2px solid #8888ff'
                        : '1px solid #eee',
                    background:
                      ![30, 45, 60].includes(editJourneySettings.duration)
                        ? '#fff'
                        : '#f7f7f7',
                    color: '#666',
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      marginBottom: '10px',
                    }}
                  >
                    {[30, 45, 60].includes(editJourneySettings.duration)
                      ? '직접 설정'
                      : `${editJourneySettings.duration}일`}
                  </strong>

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#a5afc0',
                    }}
                  >
                    {[30, 45, 60].includes(editJourneySettings.duration)
                      ? '일수 입력'
                      : '직접 설정됨'}
                  </span>

                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background:
                        ![30, 45, 60].includes(editJourneySettings.duration)
                          ? '#8888ff'
                          : '#e5e5e5',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}
                  >
                    ✓
                  </span>
                </button>
              </div>
            </section>

            <section style={{ marginTop: '36px' }}>
              <h2
                style={{
                  margin: '0 0 6px',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                혹시 잠시 쉬어가고 싶으신가요?
              </h2>

              <p
                style={{
                  margin: '0 0 18px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: '#999',
                }}
              >
                일시 중지하면 대화는 잠시 멈추지만 남은 기간은 그대로
                보관돼요. 준비되면 언제든 다시 시작할 수 있어요.
              </p>

              <button
                type="button"
                onClick={handleJourneyPauseChange}
                style={{
                  position: 'relative',
                  width: 'calc(50% - 5px)',
                  height: '94px',
                  padding: '16px',
                  textAlign: 'left',
                  borderRadius: '12px',
                  border: editJourneySettings.paused
                    ? '2px solid #8888ff'
                    : '1px solid #eee',
                  background: editJourneySettings.paused
                    ? '#fff'
                    : '#f7f7f7',
                  color: '#666',
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    fontSize: '16px',
                    marginBottom: '10px',
                  }}
                >
                  일시 중지
                </strong>

                <span
                  style={{
                    fontSize: '12px',
                    color: '#a5afc0',
                  }}
                >
                  잠시 쉬어가도 괜찮아요
                </span>

                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: editJourneySettings.paused
                      ? '#8888ff'
                      : '#e5e5e5',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}
                >
                  ✓
                </span>
              </button>
            </section>
          </div>

          <div
            style={{
              position: 'absolute',
              left: '16px',
              right: '16px',
              bottom: '16px',
              display: 'flex',
              gap: '14px',
              zIndex: 20,
            }}
          >
            <button
              type="button"
              onClick={handleCancelJourneyEdit}
              style={{
                flex: 1,
                height: '52px',
                border: 'none',
                borderRadius: '12px',
                background: '#f5f5f5',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleSaveJourney}
              style={{
                flex: 1,
                height: '52px',
                border: 'none',
                borderRadius: '12px',
                background: '#8888ff',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              수정완료
            </button>
          </div>

          {showCustomDurationInput && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                boxSizing: 'border-box',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: 'inherit',
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  padding: '22px 20px 18px',
                  boxSizing: 'border-box',
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: '16px',
                    fontWeight: 700,
                  }}
                >
                  애도 기간을 설정해주세요.
                </h3>

                <p
                  style={{
                    margin: '0 0 14px',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: '#999',
                  }}
                >
                  원하는 기간을 일수로 입력해주세요.
                </p>

                <input
                  type="number"
                  min="1"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="예: 90"
                  autoFocus
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 14px',
                    boxSizing: 'border-box',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '14px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomDurationInput(false);
                      setCustomDuration('');
                    }}
                    style={{
                      flex: 1,
                      height: '46px',
                      border: 'none',
                      borderRadius: '10px',
                      background: '#f5f5f5',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    취소
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const days = Number(customDuration);

                      if (!Number.isInteger(days) || days <= 0) {
                        return;
                      }

                      handleJourneyDurationChange(days);
                      setShowCustomDurationInput(false);
                      setCustomDuration('');
                    }}
                    style={{
                      flex: 1,
                      height: '46px',
                      border: 'none',
                      borderRadius: '10px',
                      background: '#8888ff',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // -----------------------------
    // 현재 여정 조회 화면
    // -----------------------------

    return (
      <div className="settings-subpage">
        <header className="settings-sub-header">
          <button
            type="button"
            className="settings-back"
            onClick={() => setView('main')}
            aria-label="뒤로가기"
          >
            ‹
          </button>

          <h1>현재 여정</h1>

          <button
            type="button"
            className="settings-header-action"
            onClick={handleEditJourney}
            disabled={journeySettings.ended}
            style={{
              opacity: journeySettings.ended ? 0.4 : 1,
              cursor: journeySettings.ended ? 'default' : 'pointer',
            }}
          >
            수정
          </button>
        </header>

        <div className="settings-detail">
          <DetailRow
            label="상태"
            value={
              journeySettings.ended
                ? '종료됨'
                : journeySettings.paused
                ? '일시 중지'
                : '진행중'
            }
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
            value={getJourneyEndDate(journeySettings.duration)}
          />

          <div className="settings-progress-row">
            <span>진행률</span>
            <strong>
              {journeySettings.ended
                ? '종료됨'
                : journeySettings.paused
                ? '일시 중지'
                : `${getJourneyProgress(journeySettings.duration)}%`}
            </strong>
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

    if (journeySettings.ended) {
      return (
        <div className="settings-subpage">
          <SubHeader
            title="여정 종료"
            onBack={() => setView('main')}
          />

          <div className="settings-confirm">
            <h2>이미 종료된 여정이에요.</h2>

            <p>
              종료된 여정은 다시 진행할 수 없어요.
              <br />
              기록과 기억은 그대로 보관돼요.
            </p>

            <div className="settings-confirm-buttons">
              <button
                type="button"
                className="primary"
                onClick={() => setView('main')}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="settings-subpage">
        <SubHeader
          title="여정 종료"
          onBack={() => setView('main')}
        />

        <div className="settings-confirm">

          <h2>
            여정을 종료하시겠습니까?
          </h2>

          <p>
            종료하면 대화가 중단되며,
            <br />
            특별한 날 편지는 계속 받을 수 있어요.
            <br />
            <br />
            종료 후에는 여정을 다시 진행할 수 없어요.
          </p>

          <div className="settings-confirm-buttons">

            <button
              type="button"
              onClick={() => setView('main')}
            >
              취소
            </button>

            <button
              type="button"
              className="primary"
              onClick={() => {
                setJourneySettings((prev) => ({
                  ...prev,
                  ended: true,
                  paused: false,
                }));

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