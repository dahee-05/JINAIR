import React, { useEffect, useState } from 'react';
import SignupTerms from '../component/member/SignupTerms.jsx';
import SignupAuth from '../component/member/SignupAuth.jsx';
import SignupUserInfo from '../component/member/SignupUserInfo.jsx';
import SignupSuccess from '../component/member/SignupSuccess.jsx';
import { useNavigate, useParams } from 'react-router-dom';

export default function SignupFunnel() {
  const params = useParams();
  const navigate = useNavigate();
  const [ stepHistory, setStepHistory ] = useState(['terms']);

  const step = params.part;

  /* 단계별 체크 */
  useEffect(()=>{
    const stepIdx = stepHistory.indexOf(step);
    if(stepIdx === -1){
      alert('비정상적인 접근입니다. 회원가입 약관동의 페이지로 이동합니다.');
      const lastStep = stepHistory[stepHistory.length -1 ];
      navigate(`/join/${lastStep}`);
    }
  },[step, stepHistory, navigate]);

  /* 회원정보 입력*/
  const handleTerms = (data) =>{
    if(data === true ) { 
      setStepHistory((prev) => [...prev,'auth']);
      navigate('/join/auth');
    }
  };
  /* 본인인증*/
  const handleSignAuth = (data) =>{
    if(data){
      setStepHistory((prev) => [...prev,'userInfo']);
      navigate('/join/userInfo');
    }
  };
  
  /* 회원정보 입력*/
  const handleUserInfo = (data)=>{
    if(data){
      setStepHistory((prev) => [...prev,'signupSuccess']);
      navigate('/join/signupSuccess');
    }
  };


  return (
    <div>
      {step === 'terms'    && <SignupTerms onNext={handleTerms}/>}
      {step === 'auth'     && <SignupAuth onNext={handleSignAuth} />}
      {step === 'userInfo' && <SignupUserInfo onNext={handleUserInfo}/>}
      {step === 'signupSuccess' && <SignupSuccess />}
    </div>
  );
}

