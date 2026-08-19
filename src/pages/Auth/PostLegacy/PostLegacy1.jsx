import React, { useState } from "react";
import TopBar from "../../../components/common/TopBar";
import { Input as TextInput } from "../../../components/common/InputBox/InputBox_text";
import { Input as SelectInput } from "../../../components/common/Select";
import SignupStartButton from "../../../components/common/Button/SignupStartButton";
import { supabase } from "../../../lib/supabase";
import "./PostLegacy1.css";

const PostLegacy1 = ({ onRegistrationNext, onRegistrationBack }) => {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    // 필수값 확인
    if (!name || !relationship || !birthDate || !deathDate) {
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
            birth_date: birthDate,
            death_date: deathDate,
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
      <TopBar
        title="사후 등록"
        onBackClick={onRegistrationBack}
      />

      <main className="legacy-screen">
        <h2 className="legacy-screen__title">
          기본 정보
        </h2>

        <p className="legacy-screen__subtitle">
          기억하고 싶은 분을 입력해주세요.
        </p>

        <section className="legacy-screen__fields">
          {/* 이름 */}
          <TextInput
            inputPlaceholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* 관계 */}
          <SelectInput
            inputPlaceholder="관계"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            options={[
              { value: "parent", label: "부모" },
              { value: "child", label: "자녀" },
              { value: "spouse", label: "배우자" },
              { value: "sibling", label: "형제·자매" },
              { value: "friend", label: "친구" },
              { value: "other", label: "기타" },
            ]}
          />

          {/* 별명 */}
          <TextInput
            inputPlaceholder="별명 (선택사항)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          {/* 성별 */}
          <SelectInput
            inputPlaceholder="성별"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={[
              { value: "male", label: "남성" },
              { value: "female", label: "여성" },
            ]}
          />

          {/* 생년월일 */}
          <TextInput
            inputPlaceholder="생년월일"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          {/* 별세일 */}
          <TextInput
            inputPlaceholder="별세일"
            type="date"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
          />
        </section>
      </main>

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