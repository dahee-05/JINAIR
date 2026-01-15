import React from 'react';
import { FaEarthAmericas } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Header() {
    return ( 
        <>
            <div className='header'>
                <div className='header_top'>
                    <div className='header_top_menu'>
                        <button><span> 로그인·회원가입</span></button>
                        <button><span>고객센터</span></button>
                        <button><span><FaEarthAmericas />한국(한국어)/KRW</span></button>
                    </div>
                    <div className='header_bottom_menu'>
                    <div>
                        <img src="https://images.jinair.com/newHom/images/web/common/logo.svg" alt="jinair-logo" />
                    </div>
                        <div className='menu_list'>
                            <ul>
                                <li>예약</li>
                                <li>프로모션/제휴</li>
                                <li>부가서비스</li>
                                <li>운항정보</li>
                                <li><HiOutlineBars3 /> 전체메뉴</li>
                            </ul>
                        </div>
                        <div><CiUser /></div>
                        <div><CiUser /></div>
                        <div><CiUser /></div>

                    </div> 
                </div>
            </div> 
            <div className='header_bottom'>

            </div>
            </>
    );
}

