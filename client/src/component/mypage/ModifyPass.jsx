import React, { useState } from "react";
import { axiosPost } from "../../service/api";

export default function ModifyPass({ userId, onConfirm }) {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdCheck, setNewPwdCheck] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // 기존 비밀번호 확인
    const result = await axiosPost({
      url: "http://localhost:9000/mypage/checkPwd",
      data: { id: userId, password: currentPwd },
    });

    if (!result?.match) {
      return setError("기존 비밀번호가 일치하지 않습니다.");
    }

    if (currentPwd === newPwd) {
      return setError("신규 비밀번호는 기존 비밀번호와 달라야 합니다.");
    }

    if (newPwd !== newPwdCheck) {
      return setError("신규 비밀번호가 일치하지 않습니다.");
    }

    onConfirm(newPwd); // ModifyInfo의 formData.password에 저장
  };

  return (
    <div className="r-common layer-contents">
      <div className="layer-header">
        <p className="layer-header-title">비밀번호 변경</p>
        <div className="border-line" />
      </div>
      <div className="layer-contents">
        {error && (
          <p className="error-msg" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div className="field-wrapper">
          <label>기존 비밀번호</label>
          <input
            type="password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label>신규 비밀번호</label>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
          />
        </div>
        <div className="field-wrapper">
          <label>신규 비밀번호 확인</label>
          <input
            type="password"
            value={newPwdCheck}
            onChange={(e) => setNewPwdCheck(e.target.value)}
          />
        </div>
        <div className="btn-group">
          <button className="gray-btn2" onClick={() => onConfirm(null)}>
            취소
          </button>
          <button className="gray-btn2" onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
