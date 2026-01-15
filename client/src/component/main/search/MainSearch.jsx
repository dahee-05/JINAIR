import React, { useState } from 'react';
import { FaGift } from "react-icons/fa6";
import { GiCarSeat } from "react-icons/gi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { BsFillSuitcase2Fill } from "react-icons/bs";
import { BiSolidRightArrow } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { ImAirplane } from "react-icons/im";
import { IoTicketSharp } from "react-icons/io5";
import '../../../scss/haon.scss';
import MainSearchReservation from './MainSearchReservation.jsx';
import MainSearchCheckIn from './MainSearchCheckIn.jsx';
import MainSearchReservationCheck from './MainSearchReservationCheck.jsx';
import SendEmail from '../../order/SendEmail.jsx';
import { getTab, getCheckinDate ,getCheckinFirstNm,getCheckinResnum,getCheckinLastNm } from '../../../service/searchApi.js';
import { useDispatch, useSelector } from 'react-redux';
import config from "../chatbot/config.js";

export default function MainSearch() {
    const dispatch = useDispatch();
    const tab = useSelector(state => state.search.tab);

    const tabList = [
        {
            tabNm: 'main',
            title: '예약',
            icon: <ImAirplane className='main-top-search-icons1' />
        },
        {
            tabNm: 'checkIn',
            title: '체크인',
            icon: <IoTicketSharp className='main-top-search-icons2' />
        },
        {
            tabNm: 'reservationCheck',
            title: '예약조회',
            icon: <IoSearchOutline className='main-top-search-icons3' />
        }
    ];
    const bottomList = [
        {
            icon1: <FaGift />,
            icon2: <BiSolidRightArrow />,
            title: '묶음할인'
        },
        {
            icon1: <GiCarSeat />,
            icon2: <BiSolidRightArrow />,
            title: '사전좌석'
        },
        {
            icon1: <GiForkKnifeSpoon />,
            icon2: <BiSolidRightArrow />,
            title: '기내식'
        },
        {
            icon1: <BsFillSuitcase2Fill />,
            icon2: <BiSolidRightArrow />,
            title: '수하물'
        }
    ];

    return (
        <div style={{ width: "1500px" }}>
            <div className='main-top-box'>
                <div className={tab === 'main' ? 'main-top-img' : 'main-top-img2'}>
                    <img src="/images/main.jpg" alt="벚꽃이미지" />
                </div>
                {/* <SendEmail /> */}
                <div className='main-top-search-all'>
                    <div className='main-top-search-btns'>
                        {
                            tabList && tabList.map((item) =>
                                <button onClick={() => { dispatch(getTab(item.tabNm));
                                    dispatch(getCheckinDate('')) ;dispatch(getCheckinFirstNm(''));
                                    dispatch(getCheckinResnum(''));dispatch(getCheckinLastNm(''))
                                 }}
                                    className={tab === item.tabNm ? 'main-top-search-btns-active' : 'main-top-search-btns-none'}>
                                    {item.icon}<span>{item.title}</span>
                                </button>
                            )
                        }
                    </div>
                    {tab === 'main' && <MainSearchReservation />}
                    {tab === 'checkIn' && <MainSearchCheckIn />}
                    {tab === 'reservationCheck' && <MainSearchReservationCheck />}
                    <div className='main-bottom-depart-check-middle'>
                        <div>
                            <h4>출발 전 체크!</h4>
                            <h5>여행 가기 전 확인 필수</h5>
                        </div>
                        <ul>
                            {
                                bottomList && bottomList.map((item) =>
                                    <li>
                                        <span>
                                            {item.icon1}
                                            <span>{item.title}</span>
                                        </span>
                                        {item.icon2}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className='main-bottom-depart-check'>
                </div>
            </div>
        </div>
    );
}



