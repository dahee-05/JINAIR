import React from 'react';
import { LuArrowUpRight } from "react-icons/lu";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    const handleClick = () =>{
        window.open('/admin/login', '_blank')
    };

    return (
        <div className='footer_outline'>
            <div className='footer'>
                <div className='footer_top'>
                    <div className='footer_left'>
                        <div className='footer_menu'>
                            <div>
                                <ul>
                                    <span>회사 안내</span>
                                    <li onClick={()=>navigate('/user/notice')} style={{cursor:'pointer'}}>공지사항</li>
                                    <li>기업개요</li>
                                    <li>ESG 경영</li>
                                    <li>소비자중심경영</li>
                                    <li>투자정보</li>
                                    <li>CI소개</li>
                                    <li>항공기 소개</li>
                                    <li>화물운송</li>
                                    <li>홍보센터</li>
                                    <li>채용정보</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <span>약관 및 안내</span>
                                    <li>개인정보 처리방침</li>
                                    <li>이용약관</li>
                                    <li>여객운송약관 및 기타 고지사항</li>
                                    <li>항공교통이용자 서비스 계획</li>
                                    <li>피해구제계획</li>
                                    <li>e-티켓 확인증 법적 고지문</li>
                                    <li>사이트맵</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>고객서비스</li>
                                    <li>자주 묻는 질문(FAQ)</li>
                                    <li>고객의 말씀(Q&A)</li>
                                    <li>기내 유실물 찾기</li>
                                    <li>서류양식함</li>
                                </ul>
                                <ul>
                                    <li>
                                        <div className='footer_menu_root'>
                                            <span> 대리점 사이트 바로가기<LuArrowUpRight /></span>
                                        </div>
                                        <div className='footer_menu_root'>
                                            <span>원격 지원 서비스<LuArrowUpRight /></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className='footer_right'>
                        <div className='footer_right_warp'>
                            <div className='footer_right_service'>
                                <span>
                                    고객서비스센터<FaPhone />
                                </span>
                                <span className='light'>
                                    1600-6200, 02-6099-1200
                                </span>
                            </div>
                                <div className='footer_right_time'>
                                    <span>업무시간</span>
                                    <span className='light'>오전 09:00 ~ 오후 18:00</span>
                                </div> 
                        </div>
                        <div className='footer_sns'>
                            <span>
                            SNS
                            </span>
                            <div className='footer_sns_icon'>
                                <div><FaInstagramSquare size={30}/></div>
                                <div><FaSquareFacebook size={30}/></div>
                                <div><FaSquareYoutube size={30}/></div>
                                
                            </div>
                        </div>

                    </div>
                </div>
                <div className='footer_bottom'>
                    <div className='footer_bottom_left'>
                        <div className='home_main_company'>
                            <img src="https://images.jinair.com/newHom/images/web/common/logo2.svg"
                                alt=""
                                className='home_main_logo' />
                            <span> <a href="#" onClick={handleClick}>(주)</a> </span>
                            <span>진에어</span>
                        </div>
                        <div>
                            <span>대표이사 박병률</span><span>사업자등록번호 121-81-89086</span>
                            <p>통신판매업 신고번호 : 제2008-서울 강서-0408</p>
                        </div>
                    </div>
                    <div className='footer_bottom_right'>
                        <div className='footer_bottom_partner'>
                            <div className='footer_bottom_partner_img'>
                                <img src="images/main_footer/Partner1.png" alt="" />
                                <img src="images/main_footer/Partner2.png" alt="" />
                                <img src="images/main_footer/Partner3.png" alt="" />

                            </div>
                            <span>Copyright © JIN AIR. All Rights Reserved. </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

