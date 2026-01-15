import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MypageNavigation() {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <section className='mypage-subtitle'>
                <p className='f32'>마이페이지</p>
                <div className='menu-btn-wrap'>
                    <button className='menu-btn w300'
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}>메뉴 바로가기</button>

                    {
                        menuOpen && (
                    <ul className='mp-menu-drop-down'>
                        <li onClick={()=>{navigate('../mypage/index')}} >마이페이지 홈</li>
                        <li onClick={()=>{navigate('../mypage/getReservation')}}>나의 예약</li>
                        <li onClick={()=>{navigate('../mypage/checkIn')}}>체크인 / 탑승권</li>
                        {/* <li onClick={()=>{navigate('../mypage/index')}}>나비포인트</li> */}
                        <li onClick={()=>{navigate('../mypage/index')}}>할인쿠폰</li>
                        <li onClick={()=>{navigate('../mypage/myInterest')}}>관심 지역/테마</li>
                        <li onClick={()=>{navigate('../mypage/myQna')}}>고객문의</li>
                        <li onClick={()=>{navigate('../mypage/modifyInfo')}}>회원정보 수정</li>
                    </ul>

                        )
                    }
                </div>
            </section>
        </div>
    );
}

