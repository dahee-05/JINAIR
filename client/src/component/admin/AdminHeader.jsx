import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminLogout } from '../../service/authApi.js';
import { useEffect } from 'react';
import { useState } from 'react';

export default function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const aid = localStorage.getItem('admin_id');
  const adminIsLoggedIn = useSelector(state => state.login.adminIsLoggedIn);
  const adminIsError = useSelector(state => state.login.adminIsError);

  useEffect(()=>{
    if(!adminIsLoggedIn){
      navigate('/admin/login');
    }
  },[adminIsLoggedIn, navigate]);

  const handleLogout = () =>{
    if(adminIsLoggedIn){
      const select = window.confirm('정말 로그아웃 하시겠습니까?');
      if(select){
        dispatch(getAdminLogout());
      }
    }else{
      navigate('/admin/flight');
    }
  };

  return (
    <header className="admin-header">
      <div>
        <div>
          <img src="https://images.jinair.com/newHom/images/web/common/logo.svg" alt="jinair-logo" className='admin-logo' />
          <p className="admin-title">진에어 Admin Page</p>
        </div>
        {adminIsLoggedIn && 
          <div className='admin-header-info'>
            <span>{aid}</span>
            <span>님  환영합니다.</span>
            <button className="admin-logout" onClick={handleLogout}>
              <MdOutlineLogout size="20" title="logout" />
            </button>
          </div>
        }
      </div>
    </header>
  );
}

