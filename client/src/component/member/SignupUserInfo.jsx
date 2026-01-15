import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import AuthUser from '../member/AuthUser.jsx';

export default function SignupUserInfo({onNext}) {
  const navigate = useNavigate();

  const handleNext = (data) =>{
    onNext(data);
  };

return (
  <div className='signup-content'>
    <div className='signup-header'>
      <div>
        <IoArrowBackSharp className='header-icon' onClick={()=>navigate('/join/auth')}/> 
        <span>정보입력</span>
      </div>
       <RiHomeLine className='header-icon2' onClick={()=>navigate('/')}/>
    </div> 
    <div className='areement'>
      <p>거의 다 왔어요!</p>
      <p>고객님의 정보를 입력해주세요.</p>
    </div> 
    <p className='user-info-text'>진에어는 고객님의 정보를 안전하게 관리합니다.</p>
    <ul className='user-info'>
      <AuthUser item={'userInfo'} onNext={handleNext}/>        
    </ul>
  </div>
);
}


