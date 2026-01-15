import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NaverRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (!code || !state) {
      alert('네이버 인증 코드가 없습니다.');
      window.close();
      return;
    }

    (async () => {
      try {
        const { data } = await axios.post('http://localhost:9000member/naver-token', { code, state });

        if (data && data.user && window.opener) {
          window.opener.postMessage({
            type: 'NAVER_LOGIN',
            user: data.user,
          }, '*');
        } else {
          alert('유저 정보를 받아오지 못했습니다.');
        }

        window.close();
      } catch (err) {
        console.error('네이버 로그인 에러:', err);
        alert('로그인 처리 중 오류가 발생했습니다.');
        window.close();
      }
    })();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>로그인 처리 중입니다...</h2>
    </div>
  );
}
