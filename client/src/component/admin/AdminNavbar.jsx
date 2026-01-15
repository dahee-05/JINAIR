import React from 'react';
import NavbarItem from '../admin/NavbarItem.jsx';

export default function AdminNavbar() {
  return (
    <nav className="adminNavbar">
    <ul className='admin-menu'>
      <NavbarItem page={'/admin/flight'} title={'항공권 관리'} />
      <NavbarItem page={'/admin/notice'} title={'공지사항'} />
      <NavbarItem page={'/admin/qna'} title={'1 : 1 문의'} />
    </ul>
  </nav>
  );
}

