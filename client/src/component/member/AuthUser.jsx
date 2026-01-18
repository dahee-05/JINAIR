import React, { useEffect, useRef, useState } from "react";
import {
  validateUserSignup,
  validateFindUseInfo,
} from "../../utils/authValidate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthUser({ item, onNext }) {
  const getInitialState = (item) => {
    switch (item) {
      case "id":
      case "signup-auth":
        return { name: "", gender: "", birth: "", email: "", authCode: "" };
      case "pwd":
        return {
          id: "",
          name: "",
          gender: "",
          birth: "",
          email: "",
          authCode: "",
        };
      case "userInfo":
        return {
          id: "",
          name: "",
          kname_first: "",
          kname_last: "",
          ename_first: "",
          ename_last: "",
          gender: "",
          birth: "",
          phone: "",
          email: "",
          password: "",
          cpassword: "",
        };
      default:
        return {};
    }
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(getInitialState(item));
  const [msgResult, setMsgResult] = useState("");
  const [msgCheck, setMsgCheck] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [active, setActive] = useState(false);
  const [idCheckState, setIdCheckState] = useState(false);
  const [sendCodeActive, setSendCodeActive] = useState(false);
  const [codeActive, setCodeActive] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const phoneRegEX = /^010-?\d{4}-?\d{4}$/;
  const birthRegEX = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;

  const refs = {
    idRef: useRef(null),
    nameRef: useRef(null),
    genderMaleRef: useRef(null),
    genderFemaleRef: useRef(null),
    birthRef: useRef(null),
    emailRef: useRef(null),
    authCodeRef: useRef(null),
    phoneRef: useRef(null),
    pwdRef: useRef(null),
    cpwdRef: useRef(null),
    knameFirstRef: useRef(null),
    knameLastRef: useRef(null),
    enameFirtstRef: useRef(null),
    enameLastRef: useRef(null),
  };

  const msgRefs = {
    idMsgRef: useRef(null),
    nameMsgRef: useRef(null),
    genderMsgRef: useRef(null),
    birthMsgRef: useRef(null),
    emailMsgRef: useRef(null),
    authCodeMsgRef: useRef(null),
    phoneMsgRef: useRef(null),
    pwdMsgRef: useRef(null),
    cpwdMsgRef: useRef(null),
    knameFirstMsgRef: useRef(null),
    knameFLastMsgRef: useRef(null),
    enameFirstMsgRef: useRef(null),
    enameLastMsgRef: useRef(null),
  };

  useEffect(() => {
    setFormData(getInitialState(item));
    setSelectedGender(null);
    setMsgResult("");
    setMsgCheck("");
    setSendCodeActive(false);
    setActive(false);
  }, [item]);

  /* 성별 체크 함수 */
  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
    const value = gender === "male" ? "M" : "F";
    setFormData((prev) => ({ ...prev, ["gender"]: value }));
    if (msgCheck === "gender") {
      setMsgResult("");
      setMsgCheck("");
    }
  };

  /* input 입력값 변동 함수 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMsgResult("");

    if (name === "id") {
      setIdCheckState(false);
    }
    if (name === "email") {
      if (value && !emailRegEx.test(value)) {
        setMsgCheck("email");
        setMsgResult("이메일 형식이 올바르지 않습니다.");
      } else {
        setMsgCheck("");
        setMsgResult("");
      }
    }
    for (let data in formData) {
      if (formData[data] !== "") {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  };

  /* 인증번호 이메일 전송 함수 */
  const handleReqAuthCode = async () => {
    try {
      if (refs.emailRef.current.value !== "") {
        if (emailRegEx.test(refs.emailRef.current.value)) {
          const res = await axios.post(
            "http://localhost:9000/member/authcode",
            {
              name: refs.nameRef.current.value,
              email: refs.emailRef.current.value,
            },
          );
          if (res.data.success) {
            alert("인증번호가 발송되었습니다.");
            setSendCodeActive(true);
            setAuthCode(res.data.code);
          }
        } else {
          alert("이메일 형식에 맞춰서 입력해주세요");
          refs.emailRef.current.focus();
        }
      } else {
        alert("이메일을 입력해주세요");
        refs.emailRef.current.focus();
      }
    } catch (error) {
      console.log("메일 전송 실패", error);
      alert("메일전송에 실패했습니다.");
    }
  };

  /* 인증번호 확인 함수 */
  const handleConform = () => {
    if (authCode === refs.authCodeRef.current.value) {
      alert("인증되었습니다");
      setCodeActive(true);
      setMsgResult("");
    } else {
      alert("인증번호가 일치하지 않습니다.");
      setMsgResult("");
      refs.authCodeRef.current.focus();
    }
  };

  /* 아이디 중복확인 */
  const handleIdCheck = () => {
    if (refs.idRef.current.value !== "") {
      axios
        .post("http://localhost:9000/member/idcheck", { id: formData.id })
        .then((res) => {
          if (res.data[0].cnt) {
            alert("이미 사용중인 아이디입니다.");
            setIdCheckState(false);
            refs.idRef.current.value = "";
            refs.idRef.current.focus();
          } else {
            alert("사용가능한 아이디입니다.");
            setIdCheckState(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      alert("아이디를 입력해주세요.");
      refs.idRef.current.focus();
    }
  };

  /* submit 함수 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result, msg, key;

    if (formData.birth && !birthRegEX.test(formData.birth)) {
      setMsgCheck("birth");
      setMsgResult("생년월일 형식이 올바르지 않습니다.");
      refs.birthRef.current?.focus();
      return;
    }
    if (formData.email && !emailRegEx.test(formData.email)) {
      setMsgCheck("email");
      setMsgResult("이메일 형식이 올바르지 않습니다.");
      refs.emailRef.current?.focus();
      return;
    }
    if (formData.phone && !phoneRegEX.test(formData.phone)) {
      setMsgCheck("phone");
      setMsgResult("핸드폰 형식이 올바르지 않습니다.");
      refs.phoneRef.current?.focus();
      return;
    }

    if (item === "userInfo") {
      ({ result, msg, key } = validateUserSignup(
        refs,
        msgRefs,
        item,
        formData.gender,
        sendCodeActive,
        codeActive,
      ));
    } else {
      ({ result, msg, key } = validateFindUseInfo(
        refs,
        msgRefs,
        item,
        formData.gender,
        sendCodeActive,
        codeActive,
      ));
    }

    if (!result) {
      if (msg !== "") {
        setMsgResult(msg);
        setMsgCheck(key);
      }
      return;
    }

    try {
      if (item === "id") {
        const { data } = await axios.post(
          "http://localhost:9000/member/findId",
          formData,
        );
        if (data[0]?.cnt) {
          navigate("/find/findUserId", { state: { userId: data[0].id } });
        } else {
          alert("존재하지 않는 회원입니다.");
        }
        return;
      }

      if (item === "pwd") {
        const { data } = await axios.post(
          "http://localhost:9000/member/findPwd",
          formData,
        );

        if (data.success) {
          navigate("/find/findUserPwd", {
            state: { userPwd: data.data.password },
          });
        } else {
          alert("회원정보가 일치하지 않습니다. 다시 입력해주세요.");
        }
        return;
      }

      if (item === "signup-auth") {
        if (!codeActive) {
          alert("이메일 인증을 완료해주세요.");
          return;
        }
        onNext(true);
        return;
      }

      if (item === "userInfo") {
        if (idCheckState) {
          const { data } = await axios.post(
            "http://localhost:9000/member/signup",
            formData,
          );

          if (data) {
            onNext(true);
            return;
          }
          alert("회원가입에 실패하였습니다. 다시 진행해주세요.");
          return;
        } else {
          alert("아이디 중복확인을 진행해주세요.");
        }
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {(item === "pwd" || item === "userInfo") && (
        <>
          <li>
            <div className="auth-find-pwd user-id-check">
              <input
                type="text"
                className="id"
                name="id"
                value={formData.id}
                ref={refs.idRef}
                onChange={handleChange}
                placeholder="아이디"
              />
              {item === "userInfo" && (
                <button
                  type="button"
                  className="id-check-btn auth-btn"
                  onClick={handleIdCheck}
                >
                  중복확인
                </button>
              )}
            </div>
          </li>
          <div
            className={`validate-text ${msgCheck === "id" ? "error" : ""}`}
            ref={msgRefs.idMsgRef}
          >
            {msgCheck === "id" && msgResult}
          </div>
        </>
      )}
      {item === "userInfo" ? (
        <>
          <li>
            <div className="find-basic-info2">
              <div>
                <input
                  type="text"
                  name="kname_first"
                  className="kname_first"
                  value={formData.kname_first}
                  ref={refs.knameFirstRef}
                  onChange={handleChange}
                  placeholder="성(한글)"
                />
                <input
                  type="text"
                  name="kname_last"
                  className="kname_last"
                  value={formData.kname_last}
                  ref={refs.knameLastRef}
                  onChange={handleChange}
                  placeholder="이름(한글)"
                />
              </div>
              <div className="info-gender">
                <button
                  type="button"
                  ref={refs.genderMaleRef}
                  className={`gender ${selectedGender === "male" ? "info-gender-active" : ""}`}
                  onClick={() => handleGenderClick("male")}
                >
                  남
                </button>
                <button
                  type="button"
                  ref={refs.genderFemaleRef}
                  className={`gender ${selectedGender === "female" ? "info-gender-active" : ""}`}
                  onClick={() => handleGenderClick("female")}
                >
                  여
                </button>
              </div>
            </div>
            <div
              className={`validate-text ${msgCheck === "kname_first" || msgCheck === "kname_last" ? "error" : msgCheck === "gender" ? "error" : ""}`}
              ref={
                msgCheck === "kname_first"
                  ? msgRefs.knameFirstMsgRef
                  : msgCheck === "kname_last"
                    ? msgRefs.knameFLastMsgRef
                    : msgRefs.genderMsgRef
              }
            >
              {(msgCheck === "kname_first" ||
                msgCheck === "kname_last" ||
                msgCheck === "gender") &&
                msgResult}
            </div>
          </li>
          <li className="info-engname">
            <div className="find-basic-info2">
              <input
                type="text"
                name="ename_first"
                className="ename_first"
                value={formData.ename_first}
                ref={refs.enameFirtstRef}
                onChange={handleChange}
                placeholder="성(영문)"
              />
              <input
                type="text"
                name="ename_last"
                className="ename_last"
                value={formData.ename_last}
                ref={refs.enameLastRef}
                onChange={handleChange}
                placeholder="이름(영문)"
              />
            </div>
            <div
              className={`validate-text ${msgCheck === "ename_first" ? "error" : msgCheck === "ename_last" ? "error" : ""}`}
              ref={
                msgCheck === "ename_first"
                  ? msgRefs.enameFirstMsgRef
                  : msgRefs.enameLastMsgRef
              }
            >
              {(msgCheck === "ename_first" || msgCheck === "ename_last") &&
                msgResult}
            </div>
          </li>
          <li>
            <div className="auth-input">
              <input
                type="text"
                name="email"
                className="email"
                value={formData.email}
                ref={refs.emailRef}
                onChange={handleChange}
                placeholder="이메일 (example@domain.com)"
              />
            </div>
            <div
              className={`validate-text ${msgCheck === "email" ? "error" : msgCheck === "req-auth" ? "error" : ""}`}
              ref={msgRefs.emailMsgRef}
            >
              {(msgCheck === "email" || msgCheck === "req-auth") && msgResult}
            </div>
          </li>
        </>
      ) : (
        <li>
          <div className="find-basic-info">
            <div>
              <input
                type="text"
                name="name"
                className="name"
                value={formData.name}
                ref={refs.nameRef}
                onChange={handleChange}
                placeholder="이름"
              />
            </div>
            <div className="info-gender">
              <button
                type="button"
                ref={refs.genderMaleRef}
                className={`gender ${selectedGender === "male" ? "info-gender-active" : ""}`}
                onClick={() => handleGenderClick("male")}
              >
                남
              </button>
              <button
                type="button"
                ref={refs.genderFemaleRef}
                className={`gender ${selectedGender === "female" ? "info-gender-active" : ""}`}
                onClick={() => handleGenderClick("female")}
              >
                여
              </button>
            </div>
          </div>
          <div
            className={`validate-text ${msgCheck === "name" ? "error" : msgCheck === "gender" ? "error" : ""}`}
            ref={
              msgCheck === "name" ? msgRefs.nameMsgRef : msgRefs.genderMsgRef
            }
          >
            {(msgCheck === "name" || msgCheck === "gender") && msgResult}
          </div>
        </li>
      )}

      <li>
        <input
          type="text"
          name="birth"
          className="birth"
          value={formData.birth}
          ref={refs.birthRef}
          onChange={handleChange}
          placeholder="생년월일 (ex)_19901207"
        />
        <div
          className={`validate-text ${msgCheck === "birth" ? "error" : ""}`}
          ref={msgRefs.birthMsgRef}
        >
          {msgCheck === "birth" && msgResult}
        </div>
      </li>
      {item === "id" || item === "pwd" || item === "signup-auth" ? (
        <>
          <li>
            <div className="auth-input">
              <input
                type="text"
                name="email"
                className="email"
                value={formData.email}
                ref={refs.emailRef}
                onChange={handleChange}
                placeholder="이메일 (example@domain.com)"
              />
              <button
                type="button"
                className="auth-btn"
                onClick={handleReqAuthCode}
              >
                인증번호 요청
              </button>
            </div>
            <div
              className={`validate-text ${msgCheck === "email" ? "error" : msgCheck === "req-auth" ? "error" : ""}`}
              ref={msgRefs.emailMsgRef}
            >
              {(msgCheck === "email" || msgCheck === "req-auth") && msgResult}
            </div>
          </li>
          <li>
            <div className="auth-input auth_code">
              <input
                type="text"
                name="authCode"
                className="auth-code"
                value={formData.authCode}
                ref={refs.authCodeRef}
                onChange={handleChange}
                placeholder="인증번호"
                disabled={!sendCodeActive}
              />
              <button
                type="button"
                className={`auth-btn ${sendCodeActive ? "auth-btn-active" : ""}`}
                onClick={handleConform}
                disabled={!sendCodeActive}
              >
                인증하기
              </button>
            </div>
            <div
              className={`validate-text ${msgCheck === "auth-code" ? "error" : msgCheck === "auth-btn" ? "error" : ""}`}
              ref={msgRefs.authCodeMsgRef}
            >
              {(msgCheck === "auth-code" || msgCheck === "auth-btn") &&
                msgResult}
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <div>
              <input
                type="text"
                name="phone"
                className="phone"
                ref={refs.phoneRef}
                value={formData.phone}
                onChange={handleChange}
                placeholder="휴대폰번호 (ex)_01012341234"
              />
            </div>
            <div
              className={`validate-text ${msgCheck === "phone" ? "error" : ""}`}
              ref={msgRefs.phoneMsgRef}
            >
              {msgCheck === "phone" && msgResult}
            </div>
          </li>
          <li>
            <div>
              <input
                type="password"
                name="password"
                className="password"
                ref={refs.pwdRef}
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
              />
            </div>
            <div
              className={`validate-text ${msgCheck === "password" ? "error" : ""}`}
              ref={msgRefs.pwdMsgRef}
            >
              {msgCheck === "password" && msgResult}
            </div>
          </li>
          <li>
            <div>
              <input
                type="password"
                name="cpassword"
                className="cpassword"
                ref={refs.cpwdRef}
                value={formData.cpassword}
                onChange={handleChange}
                placeholder="비밀번호 확인"
              />
            </div>
            <div
              className={`validate-text ${msgCheck === "cpassword" ? "error" : ""}`}
              ref={msgRefs.cpwdMsgRef}
            >
              {msgCheck === "cpassword" && msgResult}
            </div>
          </li>
        </>
      )}
      {item === "id" || item === "pwd" ? (
        <button
          type="submit"
          className={`find-submit-btn  ${active ? "find-submit-active" : ""} `}
        >
          {item === "id" ? "아이디 찾기" : "비밀번호 찾기"}
        </button>
      ) : (
        <button
          type="submit"
          className={`find-submit-btn  ${active ? "find-submit-active" : ""} `}
        >
          다음
        </button>
      )}
    </form>
  );
}
