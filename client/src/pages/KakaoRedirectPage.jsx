import { useEffect } from "react";
import axios from "axios";

export default function KakaoRedirectPage() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      alert("카카오 인증 코드가 없습니다.");
      window.close();
      return;
    }

    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:9000/member/kakao-token",
          { code },
        );

        if (data && data.user && window.opener) {
          const kakaoUser = data.user;

          const email = kakaoUser.kakao_account?.email;
          const nickname = kakaoUser.properties?.nickname;

          if (!email) {
            alert("이메일 제공에 동의하지 않았습니다. 이메일은 필수입니다.");
            window.close();
            return;
          }

          window.opener.postMessage(
            {
              type: "KAKAO_LOGIN",
              user: {
                email,
                name: nickname || "카카오사용자",
                raw: kakaoUser, // 원본도 넘겨두면 디버깅에 도움됨
              },
            },
            "*",
          );
        } else {
          alert("카카오 유저 정보를 받아오지 못했습니다.");
        }

        window.close();
      } catch (err) {
        console.error("카카오 로그인 에러:", err);
        alert("카카오 로그인 처리 중 오류가 발생했습니다.");
        window.close();
      }
    })();
  }, []);

  return (
    <h2 style={{ textAlign: "center", marginTop: 100 }}>
      카카오 로그인 처리 중...
    </h2>
  );
}
