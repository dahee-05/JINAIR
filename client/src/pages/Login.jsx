import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLogin, getLoginResest } from "../service/authApi.js";
import { validateLogin } from "../utils/authValidate.js";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [msgResult, setMsgResult] = useState("");
  const [active, setActive] = useState(false);
  const [userId, setUserId] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]); // Cookies 이름
  const [isRemember, setIsRemember] = useState(false); // #아이디 저장 체크박스 체크 유무
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isError = useSelector((state) => state.login.isError);
  const refs = { idRef: useRef(null), pwdRef: useRef(null) };
  const msgRefs = { msgRef: useRef(null) };

  useEffect(() => {
    if (isError) {
      alert("로그인 실패, 다시 로그인 해주세요.");
      navigate("/login");
      refs.idRef.current.value = "";
      refs.pwdRef.current.value = "";
      dispatch(getLoginResest());
    }
  }, [isError]);

  useEffect(() => {
    if (isLoggedIn) {
      alert("로그인 성공");
      navigate("/");
      if (isRemember) {
        setCookie("rememberUserId", formData.id, { maxAge: 2000 });
      } else {
        removeCookie("rememberUserId");
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (cookies.rememberUserId !== undefined) {
      const rememberedId = cookies.rememberUserId;
      setUserId(rememberedId);
      setIsRemember(true);
      setFormData((prev) => ({ ...prev, id: rememberedId }));
    }
  }, []);

  const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMsgResult("");
    if (refs.idRef.current.value !== "" && refs.pwdRef.current.value !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { result, msg } = validateLogin(refs, msgRefs.msgRef);
    if (result) {
      dispatch(getLogin(formData));
    } else {
      if (msg !== "") {
        setMsgResult(msg);
      }
    }
  };

  useEffect(() => {
    const handleMessage = async (event) => {
      const { type, user } = event.data;

      if (!type || !user) return;

      const handleSocialLogin = async (provider) => {
        try {
          const result = await axios.post(
            "http://localhost:9000/member/social-login",
            {
              email: user.kakao_account?.email || user.email,
              name: user.properties?.nickname || user.name,
            },
          );

          console.log(`[${provider}] 로그인 결과:`, result.data);

          if (result.data.cnt === 1) {
            alert(`${provider} 계정으로 로그인되었습니다!`);

            const loginData = {
              id: result.data.id,
              password: result.data.password,
            };

            dispatch(getLogin(loginData));
            navigate("/");
          } else {
            alert("가입된 계정이 없습니다. 회원가입 페이지로 이동합니다!");
            navigate("/join/terms", {
              state:
                provider === "네이버"
                  ? { naverUser: user }
                  : { kakaoUser: user },
            });
          }
        } catch (err) {
          console.error(`${provider} 로그인 에러`, err);
          alert(`${provider} 로그인 실패. 다시 시도해주세요.`);
        }
      };

      if (type === "NAVER_LOGIN") {
        await handleSocialLogin("네이버");
      } else if (type === "KAKAO_LOGIN") {
        await handleSocialLogin("카카오");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const openNaverPopup = () => {
    const state = Math.random().toString(36).substring(2, 15);
    const naver_client_id = process.env.GMAIL_USER;
    const callbackUrl = "http://localhost:3000/naver-redirect";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_id}&redirect_uri=${encodeURIComponent(callbackUrl)}&state=${state}`;

    window.open(NAVER_AUTH_URL, "naverLogin", "width=500,height=600");
  };
  const openKakaoPopup = () => {
    const REST_API_KEY = process.env.KEY;
    const REDIRECT_URI = "http://localhost:3000/kakao-redirect";

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

    window.open(kakaoAuthUrl, "kakaoLogin", "width=500,height=600");
  };

  return (
    <div className="login-content">
      <div className="login-header">
        <IoArrowBackSharp
          className="header-icon"
          onClick={() => navigate("/")}
        />
        <span>로그인</span>
      </div>
      <div className="login-logo">
        <img
          src="https://images.jinair.com/newHom/images/web/common/logo.svg"
          alt="jinair-logo"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-info">
          <span>
            <input
              type="text"
              name="id"
              ref={refs.idRef}
              value={formData.id}
              placeholder="아이디를 입력해주세요"
              onChange={handleChange}
            />
          </span>
          <span>
            <input
              type="password"
              name="password"
              ref={refs.pwdRef}
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
          </span>
        </div>
        <div className="login-info-text">
          <span
            style={{ fontSize: "0.7em", color: "white" }}
            ref={msgRefs.msgRef}
          >
            {msgResult}
          </span>
        </div>
        <div>
          <button
            type="submit"
            className={`login-btn ${active ? "login-btn-active" : ""}`}
          >
            {" "}
            로그인
          </button>
        </div>
      </form>
      <div className="id_save">
        <div>
          <input
            type="checkbox"
            id="save-id"
            checked={isRemember}
            onChange={handleOnChange}
          />
          <label htmlFor="save-id">
            <span>아이디저장</span>
          </label>
        </div>
        <div>
          <span className="find-id" onClick={() => navigate("/find/id")}>
            아이디 찾기
          </span>
          <span></span>
          <span className="find-pwd" onClick={() => navigate("/find/pwd")}>
            비밀번호 찾기
          </span>
        </div>
      </div>
      <div className="sns-login">
        <div>
          <span>간편 로그인</span>
        </div>
        <div className="sns--login-btn">
          <button type="button" onClick={openNaverPopup}></button>
          <button type="button" onClick={openKakaoPopup}></button>
        </div>
      </div>
      <div className="signup-text">
        <span>
          회원가입하고 <strong>🎉 회원 전용 혜택</strong>을 받아보세요!
        </span>
      </div>
      <div>
        <button
          type="button"
          className="signup-btn"
          onClick={() => navigate("/join/terms")}
        >
          회원 가입하기
        </button>
      </div>
    </div>
  );
}
