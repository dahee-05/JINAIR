import React from 'react';
import { Outlet } from 'react-router-dom';
import '../scss/dahee.scss';


export default function MobileLayout() {
  return (
    <div className='mobile-wrapper'>
      <div className='mobile-container'>
        <Outlet/>
      </div>
    </div>
  );
}

