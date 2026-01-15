import { useNavigate } from 'react-router-dom';
import { RiHomeLine } from "react-icons/ri";

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className='signup-content'>
      <div className='signup-header'>
        <div>
          <span className='signup-success'>회원가입 완료</span>
        </div>
         <RiHomeLine className='header-icon2' onClick={()=>navigate('/')}/>
      </div> 
      <div className='areement'>
        <p>반가워요!</p>
        <p>회원가입이 완료되었어요.</p>
      </div> 
      <button type='button' className='agree-btn signup-success-btn' onClick={()=>navigate('/login')}>로그인 페이지로 이동</button>
    </div>
  );
};
  


