import React, { useState } from 'react';

import AppShell from './components/common/AppShell';

import RegistrationMain from './pages/Auth/RegistrationMain';
import ArchivePage from './pages/Archive/ArchivePage';
import DiaryPage from './pages/Diary/DiaryPage';
import DiaryWritePage from './pages/Diary/DiaryWritePage';
import DiaryDetailPage from './pages/Diary/DiaryDetailPage';
import ChatPage from './pages/Chat/ChatPage';

import SplashPage from './pages/Onboarding/Splash';
import OnboardingPage from './pages/Onboarding/Onboarding_1';

import AuthPage from './pages/Auth/AuthPage';
import SignUpPage from './pages/Auth/SignUpPage';

import TermsServicePage from './pages/Auth/TermsServicePage';
import TermsPrivacyPage from './pages/Auth/TermsPrivacyPage';
import TermsSensitivePage from './pages/Auth/TermsSensitivePage';

import PreLegacy1 from './pages/Auth/PreLegacy/PreLegacy1';
import PreLegacy2 from './pages/Auth/PreLegacy/PreLegacy2';
import PreLegacy3 from './pages/Auth/PreLegacy/PreLegacy3';

import PostLegacy1 from './pages/Auth/PostLegacy/PostLegacy1';
import PostLegacy2 from './pages/Auth/PostLegacy/PostLegacy2';
import PostLegacy3 from './pages/Auth/PostLegacy/PostLegacy3';

import HomePage from './pages/Home/HomePage';
import MourningPeriodPage from './pages/Auth/MourningPeriod/PeriodPage';

// ⭐ 설정 페이지
import SettingsPage from './pages/Settings/SettingsPage';

import ArchiveUpload from './pages/Archive/ArchiveUpload';


// -----------------------------
// 임시 페이지
// -----------------------------

const PlaceholderPage = ({ title }) => (
  <div
    style={{
      padding: '24px 20px',
      textAlign: 'left',
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: '24px',
      }}
    >
      {title} 페이지
    </h2>
  </div>
);

const ChatPage = () => (
  <PlaceholderPage title="대화 페이지" />
);


// -----------------------------
// 페이지 목록
// -----------------------------

const pages = [
  {
    key: 'home',
    component: HomePage,
    title: '홈',
    showTopBar: false,
  },

  {
    key: 'registration-main',
    component: RegistrationMain,
    title: '등록 메인',
    showTopBar: false,
  },

  {
    key: 'history',
    component: DiaryPage,
    title: '나의 애도 기록',
    showTopBar: false,
  },

  {
    key: 'diary-write',
    component: DiaryWritePage,
    title: '',
    showTopBar: false,
  },

  {
    key: 'diary-detail',
    component: DiaryDetailPage,
    title: '',
    showTopBar: false,
  },

  {
    key: 'chat',
    component: ChatPage,
    title: '대화',
    showTopBar: true,
  },

  {
    key: 'archive',
    component: ArchivePage,
    title: '기억 보관함',
    showTopBar: true,
  },

  {
    key: 'settings',
    component: SettingsPage,
    title: '설정',
    showTopBar: false,
  },

  {
    key: 'signup',
    component: SignUpPage,
    title: '',
    showTopBar: true,
  },

  {
    key: 'pre-1',
    component: PreLegacy1,
    title: '생전 등록',
    showTopBar: false,
  },

  {
    key: 'pre-2',
    component: PreLegacy2,
    title: '생전 등록',
    showTopBar: false,
  },

  {
    key: 'pre-3',
    component: PreLegacy3,
    title: '생전 등록',
    showTopBar: false,
  },

  {
    key: 'post-1',
    component: PostLegacy1,
    title: '사후 등록',
    showTopBar: false,
  },

  {
    key: 'post-2',
    component: PostLegacy2,
    title: '사후 등록',
    showTopBar: false,
  },

  {
    key: 'post-3',
    component: PostLegacy3,
    title: '사후 등록',
    showTopBar: false,
  },

  {
    key: 'mourning-period',
    component: MourningPeriodPage,
    title: '애도 기간',
    showTopBar: false,
  },

  {
    key: 'terms-service',
    component: TermsServicePage,
    title: '서비스 이용약관 동의',
    showTopBar: false,
  },

  {
    key: 'terms-privacy',
    component: TermsPrivacyPage,
    title: '개인정보 수집 및 이용 안내',
    showTopBar: false,
  },

  {
    key: 'terms-sensitive',
    component: TermsSensitivePage,
    title: '민감정보 처리 동의',
    showTopBar: false,
  },
];


const SHOW_SPLASH = true;


// -----------------------------
// App
// -----------------------------

function App() {

  // -----------------------------
  // 상태
  // -----------------------------

  const [activeTab, setActiveTab] = useState(
    SHOW_SPLASH ? 'splash' : 'home'
  );

  const [isArchiveUploading, setIsArchiveUploading] =
    useState(false);

  // ⭐ 설정 - 내 정보 수정 화면 여부
  const [isSettingsEditing, setIsSettingsEditing] =
    useState(false);

  const [addedDiaryItems, setAddedDiaryItems] =
    useState([]);

  const [selectedDiaryItem, setSelectedDiaryItem] =
    useState(null);

  // 등록 방식
  const [registrationMode, setRegistrationMode] =
    useState('after');

  // 고인 ID
  const [memorialId, setMemorialId] =
    useState(null);

  // 약관 동의
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    sensitiveInfo: false,
  });


  // -----------------------------
  // 약관 동의 여부
  // -----------------------------

  const allAgreementsAccepted =
    Object.values(agreements).every(Boolean);


  // -----------------------------
  // 실제 보여줄 탭
  // -----------------------------

  const effectiveTab =
    activeTab === 'registration-main' &&
    !allAgreementsAccepted
      ? 'signup'
      : activeTab;


  // -----------------------------
  // 탭 변경
  // -----------------------------

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    setIsArchiveUploading(false);

    // 다른 페이지로 이동하면 설정 수정 상태도 초기화
    setIsSettingsEditing(false);
  };


  // -----------------------------
  // 홈에서 다른 페이지 이동
  // -----------------------------

  const handleNavigation = (targetView) => {
    if (
      activeTab === 'home' ||
      activeTab === 'registration-main'
    ) {
      handleTabChange(targetView);
    }
  };


  // -----------------------------
  // 약관 열기
  // -----------------------------

  const handleOpenTerms = (targetView) => {
    setActiveTab(targetView);
  };


  // -----------------------------
  // 약관 동의
  // -----------------------------

  const handleAcceptTerms = (termKey) => {
    setAgreements((prev) => ({
      ...prev,
      [termKey]: true,
    }));

    setActiveTab('signup');
  };


  // -----------------------------
  // 등록 메인 시작
  // -----------------------------

  const handleStartRegistrationMain = () => {
    if (allAgreementsAccepted) {
      setActiveTab('registration-main');
      return;
    }

    setActiveTab('signup');
  };


  // -----------------------------
  // 등록 플로우 시작
  // -----------------------------

  const handleStartRegistrationFlow = (mode) => {
    setRegistrationMode(mode);

    setActiveTab(
      mode === 'before'
        ? 'pre-1'
        : 'post-1'
    );
  };


  // -----------------------------
  // 등록 단계 이동
  // -----------------------------

  const handleRegistrationStep = (direction) => {

    const flow =
      registrationMode === 'before'
        ? ['pre-1', 'pre-2', 'pre-3']
        : ['post-1', 'post-2', 'post-3'];

    const currentIndex =
      flow.indexOf(activeTab);

    if (currentIndex === -1) {
      return;
    }

    const nextIndex =
      direction === 'next'
        ? currentIndex + 1
        : currentIndex - 1;


    if (
      nextIndex >= 0 &&
      nextIndex < flow.length
    ) {
      setActiveTab(flow[nextIndex]);
      return;
    }


    if (
      direction === 'next' &&
      currentIndex === flow.length - 1
    ) {
      setActiveTab('mourning-period');
      return;
    }


    if (
      direction === 'back' &&
      currentIndex === 0
    ) {
      setActiveTab('registration-main');
    }
  };


  // -----------------------------
  // 스플래시
  // -----------------------------

  if (activeTab === 'splash') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
        isSplash
      >
        <SplashPage
          onComplete={() =>
            setActiveTab('onboarding')
          }
        />
      </AppShell>
    );
  }


  // -----------------------------
  // 온보딩
  // -----------------------------

  if (activeTab === 'onboarding') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
        isOnboarding
      >
        <OnboardingPage
          onComplete={() =>
            setActiveTab('auth')
          }
        />
      </AppShell>
    );
  }


  // -----------------------------
  // 로그인
  // -----------------------------

  if (activeTab === 'auth') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
        isAuth
      >
        <AuthPage
          onSignUp={() =>
            setActiveTab('signup')
          }
        />
      </AppShell>
    );
  }


  // -----------------------------
  // 등록 메인
  // -----------------------------

  if (activeTab === 'registration-main') {
    return (
      <AppShell
        showTopBar={false}
        bottomNav={false}
      >
        <RegistrationMain
          onStartRegistration={
            handleStartRegistrationFlow
          }
        />
      </AppShell>
    );
  }


  // -----------------------------
  // 현재 페이지
  // -----------------------------

  const currentPage =
    pages.find(
      (page) => page.key === effectiveTab
    ) ?? pages[0];

  const PageComponent =
    currentPage.component;


  // -----------------------------
  // 보관함 업로드
  // -----------------------------

  const isUploading =
    effectiveTab === 'archive' &&
    isArchiveUploading;


  // -----------------------------
  // 상단 제목
  // -----------------------------

  const pageTitle = isUploading
    ? '업로드'
    : currentPage.title;


  // -----------------------------
  // 하단 네비게이션
  // -----------------------------

  // ⭐ 설정에서 '내 정보 수정' 화면이면 숨김
  const showBottomNav =
    !isUploading &&
    !isSettingsEditing &&
    effectiveTab !== 'registration-main' &&
    effectiveTab !== 'signup' &&
    !effectiveTab.startsWith('terms-') &&
    !effectiveTab.startsWith('pre-') &&
    !effectiveTab.startsWith('post-') &&
    effectiveTab !== 'mourning-period' &&
    effectiveTab !== 'diary-write' &&
    effectiveTab !== 'diary-detail';


  // -----------------------------
  // 뒤로가기
  // -----------------------------

  const handleBackClick =
    effectiveTab === 'signup'

      ? () =>
          setActiveTab('auth')

      : effectiveTab.startsWith('pre-') ||
        effectiveTab.startsWith('post-')

      ? () =>
          handleRegistrationStep('back')

      : effectiveTab.startsWith('terms-')

      ? () =>
          setActiveTab('signup')

      : isUploading

      ? () =>
          setIsArchiveUploading(false)

      : effectiveTab === 'diary-write' ||
        effectiveTab === 'diary-detail'

      ? () =>
          setActiveTab('history')

      : undefined;


  // -----------------------------
  // 화면
  // -----------------------------

  return (
    <AppShell
      title={pageTitle}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      showTopBar={currentPage.showTopBar}
      bottomNav={showBottomNav}
      onBackClick={handleBackClick}

      isAuth={
        effectiveTab === 'auth' ||
        effectiveTab === 'signup'
      }

      isTerms={
        effectiveTab.startsWith('terms-')
      }
    >

      <div className="page-scroll-area">

        {/* 보관함 업로드 */}
        {isUploading ? (

          <ArchiveUpload
            onCancel={() =>
              setIsArchiveUploading(false)
            }

            onSuccess={() =>
              setIsArchiveUploading(false)
            }
          />

        ) : (

          <PageComponent

            title={currentPage.title}

            isUploading={
              isArchiveUploading
            }

            setIsUploading={
              setIsArchiveUploading
            }

            memorialId={
              memorialId
            }

            onBackClick={
              handleBackClick
            }

            agreements={
              agreements
            }

            setAgreements={
              setAgreements
            }


            // ⭐ 설정 페이지
            // 내 정보 수정 여부를 App에 전달
            onEditingChange={
              effectiveTab === 'settings'
                ? setIsSettingsEditing
                : undefined
            }


            // 회원가입 → 등록 메인
            onStartRegistrationMain={
              effectiveTab === 'signup'
                ? handleStartRegistrationMain
                : undefined
            }


            // 약관 동의
            onAcceptTerms={

              effectiveTab ===
              'terms-service'

                ? () =>
                    handleAcceptTerms(
                      'termsOfService'
                    )

                : effectiveTab ===
                  'terms-privacy'

                ? () =>
                    handleAcceptTerms(
                      'privacyPolicy'
                    )

                : effectiveTab ===
                  'terms-sensitive'

                ? () =>
                    handleAcceptTerms(
                      'sensitiveInfo'
                    )

                : undefined
            }


            // 대화
            onStartChat={() =>
              handleNavigation('chat')
            }


            // 보관함
            onOpenArchive={() =>
              handleNavigation('archive')
            }


            // 설정
            onGoToSettings={() =>
              handleNavigation('settings')
            }


            // 기록
            onGoToHistory={() =>
              handleNavigation('history')
            }


            onOpenWrite={
              effectiveTab === 'history'
                ? () => setActiveTab('diary-write')
                : undefined
            }


            onOpenDetail={
              effectiveTab === 'history'
                ? (item) => {
                    setSelectedDiaryItem(item);
                    setActiveTab('diary-detail');
                  }
                : undefined
            }


            addedItems={
              effectiveTab === 'history'
                ? addedDiaryItems
                : undefined
            }


            item={
              effectiveTab === 'diary-detail'
                ? selectedDiaryItem
                : undefined
            }


            onSave={
              effectiveTab === 'diary-write'
                ? (item) => {
                    setAddedDiaryItems((previousItems) => [item, ...previousItems]);
                    setActiveTab('history');
                  }
                : undefined
            }


            // 약관
            onOpenTerms={
              handleOpenTerms
            }


            // 등록 페이지 다음
            onRegistrationNext={(data) => {

              if (data?.id) {
                setMemorialId(data.id);
              }

              handleRegistrationStep(
                'next'
              );
            }}


            // 등록 페이지 뒤로
            onRegistrationBack={() =>
              handleRegistrationStep(
                'back'
              )
            }


            // 등록 완료
            onRegistrationComplete={() =>
              setActiveTab('home')
            }


            // 애도 기간 완료
            onMourningPeriodNext={() =>
              setActiveTab('home')
            }

          />

        )}

      </div>

    </AppShell>
  );
}


export default App;
