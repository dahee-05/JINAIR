import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import AuthUser from './AuthUser.jsx';

export default function FingUserInfo() {
  const navigate = useNavigate();
  let params = useParams();
  const location = useLocation();
  const userId = location.state?.userId;
  const userPwd = location.state?.userPwd;

  return (
    <div className='find-content'>
      {(params.finfo === 'id' || params.finfo ==='pwd') ? (
        <>
          <div className='find-header'>
          <div>
            <IoArrowBackSharp className='header-icon' onClick={()=>navigate('/login')}/> 
            <span>{params.finfo === 'id' ? '아이디 찾기' : '비밀번호 찾기'}</span>
          </div>
          <RiHomeLine className='header-icon2' onClick={()=>navigate('/')}/>
        </div>  
        <ul className='find-title'>
          <li onClick={()=>navigate('/find/id')}>
            <span className={params.finfo ==='id'? 'find-info-active': ''}>아이디 찾기</span>
          </li>
          <li onClick={()=>navigate('/find/pwd')}>
            <span className={params.finfo ==='pwd'? 'find-info-active':''}>비밀번호 찾기</span>
          </li>
        </ul>
        <p className='find-basic-info-title'>이메일로 찾기</p>
        <ul className='user-info'>
          {params.finfo === 'pwd' ? (<AuthUser item={'pwd'}/>) 
            : (<AuthUser item={'id'}/>)
          }
        </ul>
      </>
    ) : (
      <>
        <div className='find-header'>
          <div>
            <IoArrowBackSharp className='header-icon' onClick={()=>navigate('/login')}/> 
            <span>
              {params.finfo === 'findUserId' ? '아이디 찾기 결과' : '비밀번호 찾기 결과'}
            </span>
          </div>
          <RiHomeLine className='header-icon2' onClick={()=>navigate('/')}/>
        </div> 
          { params.finfo === 'findUserId' ? ( 
            <>
             <div className='areement'>
              <p>회원님!</p>
              <p>아이디를 찾앗어요.</p>
            </div> 
            <p className='user-info-text'>회원님의 정보로 1개의 아이디를 찾았어요.</p>
            <div className='find-user-content'>
              <p>" {userId} "</p>
            </div>
            <button type='submit' className='find-user-btn find-user--btn-active' onClick={()=>navigate('/login')}> 로그인 페이지로 이동</button>
           </>
          ) :(
            <>
             <div className='areement'>
              <p>회원님!</p>
              <p>임시 비밀번호를 발급했어요.</p>
             </div>
             <p className='user-info-text'>임시 비밀번호로 로그인 후 비밀번호를 변경해주세요.</p>
             <div className='find-user-content'>
              <p>" {userPwd} "</p>
             </div>
             <button type='submit' className='find-user-btn find-user--btn-active' onClick={()=>navigate('/login')}> 로그인 페이지로 이동</button>
           </>
          )}
      </>  
    )}
    </div>
  );
}

