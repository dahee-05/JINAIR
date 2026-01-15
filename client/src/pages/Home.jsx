import React, { useState, useEffect } from 'react';
import MainSearch from '../component/main/search/MainSearch.jsx';
import MainBoon from '../component/main/MainBoon.jsx';
import MainPromotions from '../component/main/MainPromotions.jsx';
import MainLowest from '../component/main/MainLowest.jsx';
import '../scss/hsh.scss'
import MainNotic from '../component/main/MainNotic.jsx';
import '../scss/haon.scss';
import Chatbots from '../component/main/chatbot/Chatbots.jsx';
import { BsRobot } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa";
import { resetSearch } from '../features/search/searchSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { getChatbotModalOpen } from '../service/searchApi.js';
import ExchangeRate from '../component/main/ExchangeRate.jsx';
import { BsCurrencyExchange } from "react-icons/bs";

export default function Home() {
    const dispatch = useDispatch();
    const chatbotModalOpen = useSelector(state => state.search.chatbotModalOpen);
    const [isHover, setIsHover] = useState(true);
    const handleEnter = () => { setIsHover(false) }
    const handleLeave = () => { setIsHover(true) }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    useEffect(() => {
        dispatch(resetSearch());
    }, []);
    return (
        <>
            <div className='content'>
                <div>
                    <MainSearch />
                </div>
                <div className='chatbot'>
                    <button onClick={() => { dispatch(getChatbotModalOpen(true)) }}>
                        <BsRobot className='chatbot-icon' />
                        <span>JAID</span>
                    </button>
                </div>
               {isHover && <div className='exchange' onMouseEnter={handleEnter}>
                    <button>
                        <BsCurrencyExchange className='exchange-icon' />
                        <span>환율</span>
                    </button>
                </div>}
                {!isHover && <div className='exchange-box' onMouseLeave={handleLeave}>
                   <ExchangeRate />
                </div>}
                {chatbotModalOpen && <Chatbots />}
                <div className='totop'>
                    <button onClick={() => { scrollToTop() }}>
                        <FaArrowUp className='totop-icon' size={20} />
                    </button>
                </div>
                <div className='main_home'>
                    <div className='main_home_content'>
                        <div className='main_home_content_top'>
                            <MainBoon />
                            <MainPromotions />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "var(--color-242)", height: "25px" }}></div>
            <div className='content'>
                <MainLowest />
            </div>
            <div style={{ backgroundColor: "var(--color-242)", height: "25px" }}></div>
            <div className='content'>
                <MainNotic />
            </div>
        </>
    );
}

