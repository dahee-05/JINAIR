import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { validateLogin } from '../../utils/authValidate.js';
import { getAdminLogin, getLoginResest } from '../../service/authApi.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useState({'id':'', 'password':''});
  const [ msgResult, setMsgResult ] = useState(''); 

  const adminIsLoggedIn = useSelector(state => state.login.adminIsLoggedIn);
  const adminIsError = useSelector(state => state.login.adminIsError);

  useEffect(()=>{
    if(adminIsError){
      alert('로그인 실패, 다시 로그인 해주세요.');
      navigate('');
      refs.idRef.current.value='';
      refs.pwdRef.current.value='';
      dispatch(getLoginResest());
    }
  },[adminIsError]);

  useEffect(()=>{
    if(adminIsLoggedIn){
      alert('로그인 성공');
      navigate('/admin/flight');
    }
  },[adminIsLoggedIn]);

  const refs = {
    'idRef' : useRef(null),
    'pwdRef' : useRef(null),
  };

  const msgRefs = { 'msgRef': useRef(null)};

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]:value});
    setMsgResult('');
  };

  const handleClick = () =>{
    alert('운영팀에 문의주세요.');
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const { result, msg } = validateLogin(refs, msgRefs.msgRef);
    
    if(result){
        dispatch(getAdminLogin(formData))
    }else{
      if(msg !== ''){
        setMsgResult(msg)
      }
    }
  };


  return (
    <div className='admin-login-content'>
      <div className='admin-login-top'>
       <img src="https://images.jinair.com/newHom/images/web/common/logo.svg" alt="jinair-logo" className='admin-logo' />
       <p>관리자 로그인</p>
      </div>
      <form onSubmit={handleSubmit} className='admin-login-bottom'>
        <div>
          <input type="text"
                 name = 'id'
                 ref={refs.idRef} 
                 onChange={handleChange}
                 placeholder='아이디를 입력해주세요' />
        </div>
        <div>
          <input type="password"
                 name ='password' 
                 ref={refs.pwdRef}
                 onChange={handleChange} 
                 placeholder='비밀번호를 입력해주세요' />
        </div>
        <div className='login-info-text'>
          <span style={{fontSize:'0.7em', color:'white'}} ref={msgRefs.msgRef}>{msgResult}</span>
        </div>
        <button type='submit' className='admin-login-btn'>로그인</button>
        <button type='button' className='admin-signup-btn' onClick={handleClick}>회원가입</button>
        <span className='admin-find-userinfo'>🍀아이디/ 비밀번호 찾기는 운영팀으로 문의해주세요. 🍀</span>
      </form>
    </div>
  );
}

