import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../scss/admin.scss'
import AdminHeader from '../component/admin/AdminHeader.jsx';
import AdminNavbar from '../component/admin/AdminNavbar.jsx';

export default function AdminLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  return (
    <div className='admin-wrapper'>
      <AdminHeader />
      <div className='admin-body'>
        {!isLoginPage &&<AdminNavbar />}
        <div className='admin-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

