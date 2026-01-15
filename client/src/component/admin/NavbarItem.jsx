import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSearchState } from '../../service/adminSearchApi.js';

export default function NavbarItem({ page, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = ()=>{
    dispatch(resetSearchState());
    navigate(page);
  };

  return (
    <li className={location.pathname.split('/')[2] === page.split('/')[2] ? 'style-active' : ''}>
        <span onClick={handleClick}>{title}</span>
        <MdOutlineArrowForwardIos size='12' color='#4583f5' />
    </li>
  );
}
