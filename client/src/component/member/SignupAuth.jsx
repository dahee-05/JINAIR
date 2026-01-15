import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import AuthUser from '../member/AuthUser.jsx';

export default function SignupAuth({onNext}) {
   const navigate = useNavigate();
   
  //  const handleNext = () =>{
  //   onNext(); //modalOpen 넣기
  // };

  return (
    <div className='signup-content'>
      <div className='signup-header'>
        <div>
          <IoArrowBackSharp className='header-icon' onClick={()=>navigate('/join/terms')}/> 
          <span>본인인증</span>
        </div>
         <RiHomeLine className='header-icon2' onClick={()=>navigate('/')}/>
      </div> 
      <div className='areement'>
        <p>회원가입을 위해</p>
        <p>본인인증이 필요해요.</p>
      </div> 
      <p className='find-basic-info-title'>이메일로 찾기</p>
      <ul className='user-info'>
        <AuthUser item={'signup-auth'} onNext={onNext} />  
      </ul>
    </div>
  );
}



