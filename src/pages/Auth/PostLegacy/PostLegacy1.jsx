import React, { useState } from "react";
import TopBar from "../../../components/common/TopBar";
import SignupStartButton from "../../../components/common/Button/SignupStartButton";
import { supabase } from "../../../lib/supabase";
import "./PostLegacy1.css";

const PostLegacy1 = ({ onRegistrationNext, onRegistrationBack }) => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [relationship, setRelationship] = useState("");
  const [deathDate, setDeathDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    // 필수값 확인
    if (!name || !birthDate || !gender || !relationship || !deathDate) {
      alert("필수 정보를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);

      // 현재 로그인한 사용자 가져오기
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }

      // memorials 테이블에 저장
      const { data, error } = await supabase
        .from("memorials")
        .insert([
          {
            user_id: user.id,
            name: name,
            nickname: nickname || null,
            birth_date: birthDate,
            death_date: deathDate,
            gender: gender,
            relationship: relationship,
            status: "active",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("고인 정보 저장 실패:", error);
        alert("정보 저장에 실패했습니다.");
        return;
      }

      console.log("고인 정보 저장 성공:", data);

      // 다음 페이지로 이동
      onRegistrationNext(data);
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ver">
      {/* 상단바 */}
      <TopBar
        title="사후 등록"
        onBackClick={onRegistrationBack}
      />

      {/* 기본 정보 */}
      <div className="legacy-info">
        <h2 className="legacy-info__title">기본 정보</h2>

        <p className="legacy-info__subtitle">
          기억하고 싶은 분을 입력해주세요.
        </p>
      </div>

      {/* 이름 */}
      <div className="legacy-field legacy-field--name">
        <label className="legacy-field__label">이름</label>

        <input
          className="legacy-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 별명 */}
      <div className="legacy-field legacy-field--nickname">
        <label className="legacy-field__label">
          별명 (선택사항)
        </label>

        <input
          className="legacy-input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      {/* 생년월일 */}
      <div className="legacy-field legacy-field--birth">
        <label className="legacy-field__label">생년월일</label>

        <div className="legacy-date-wrapper">
          <input
            className={`legacy-input legacy-date-input ${
              birthDate ? "has-value" : ""
            }`}
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          {!birthDate && (
            <span className="legacy-date-placeholder">
              선택
            </span>
          )}
        </div>
      </div>

      {/* 성별 */}
      <div className="legacy-field legacy-field--gender">
        <label className="legacy-field__label">성별</label>

        <div className="gender-buttons">
          <button
            type="button"
            className={`gender-button ${
              gender === "male" ? "selected" : ""
            }`}
            onClick={() => setGender("male")}
          >
            남성
          </button>

          <button
            type="button"
            className={`gender-button ${
              gender === "female" ? "selected" : ""
            }`}
            onClick={() => setGender("female")}
          >
            여성
          </button>
        </div>
      </div>

      {/* 관계 */}
      <div className="legacy-field legacy-field--relationship">
        <label className="legacy-field__label">관계</label>

        <div className="legacy-select-wrapper">
          <select
            className={`legacy-select ${
              relationship ? "has-value" : ""
            }`}
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="" disabled>
              선택
            </option>

            <option value="parent">부모</option>
            <option value="child">자녀</option>
            <option value="spouse">배우자</option>
            <option value="sibling">형제·자매</option>
            <option value="friend">친구</option>
            <option value="other">기타</option>
          </select>

          <span className="select-arrow" />
        </div>
      </div>

      {/* 별세일 */}
      <div className="legacy-field legacy-field--death">
        <label className="legacy-field__label">별세일</label>

        <div className="legacy-date-wrapper">
          <input
            className={`legacy-input legacy-date-input ${
              deathDate ? "has-value" : ""
            }`}
            type="date"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
          />

          {!deathDate && (
            <span className="legacy-date-placeholder">
              선택
            </span>
          )}
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="legacy-screen__footer">
        <SignupStartButton
          text={isLoading ? "저장 중..." : "다음"}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default PostLegacy1;