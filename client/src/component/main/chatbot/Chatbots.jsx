import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import Schedule from './Schedule.jsx';
import Reservation from './Reservation.jsx';
import Airplane from './Airplane.jsx';
import Cheap from './Cheap.jsx';
import Question from './Question.jsx';
import BuyTicket from './BuyTicket.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    getChatbotModalOpen, getMessage, getReserMessage, getReserMessage1,
} from '../../../service/searchApi.js';
import 'react-chatbot-kit/build/main.css';

export default function Chatbots() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [chatTab, setChatTab] = useState('');
    const [msg1, setMsg1] = useState(true);
    const [msg2, setMsg2] = useState(false);
    const [msg3, setMsg3] = useState(false);
    const message = useSelector(state => state.search.message);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);


    const list = [
        { tab: 'schedule', img: "/images/chatbot/icon_01_de.png" },
        { tab: 'airplane', img: "/images/chatbot/icon_02_de.png" },
        { tab: 'reservation', img: "/images/chatbot/icon_03_de.png" },
        { tab: 'food', img: "/images/chatbot/icon_04_de.png" },
        { tab: 'cheap', img: "/images/chatbot/icon_05_de.png" },
        { tab: 'question', img: "/images/chatbot/icon_06_de.png" },
        { tab: 'ticket', img: "/images/chatbot/icon_07_de.jpg" },
        { tab: 'check', img: "/images/chatbot/icon_08_de.jpg" },
        { tab: 'notice', img: "/images/chatbot/icon_09_de.jpg" }
    ];
    const componentRef = useRef(null);
    const goFood = () => {
        window.location.href = 'https://www.jinair.com/addService/preordermeal/all';
    };
    const goNotice = () => {
        window.location.href = 'https://www.jinair.com/company/announce/announceList';
    };
    useEffect(() => {
        if (chatTab && componentRef.current) {
            componentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatTab]);
    const handleResetHome = () => {
        setChatTab('');
    }
    const handleQna = () => {
        if(isLoggedIn){
            navigate('/mypage/qnaUpload');
        }else{
            const select = window.confirm("로그인 서비스가 필요합니다. \n로그인 하시겠습니까?");
            select ? navigate('/login') : navigate('/');
        }        
    }
    const handleMessage = (e) => {
        dispatch(getMessage(e.target.value));
        dispatch(getReserMessage(e.target.value));
    }
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            handleMessage(e);
            dispatch(getMessage(''));
            setMsg1(false);
            setMsg2(true);
        }
    }
    const handleMessage2 = (e) => {
        dispatch(getMessage(e.target.value));
        dispatch(getReserMessage1(e.target.value));
    }
    const activeEnter2 = (e) => {
        if (e.key === "Enter") {
            handleMessage2(e);
            dispatch(getMessage(''));
            setMsg1(false);
            setMsg2(false);
        }
    }

    const closeAll = () => {
        dispatch(getChatbotModalOpen(false));
        dispatch(getMessage(''));
        dispatch(getReserMessage(''));
        dispatch(getReserMessage1(''));
        setMsg1(true);
        setMsg2(false);
        setMsg3(false);
    }

    return (
        <div className='chat-modal-content'>
            <div className='chat-country-all'>
                <div className='chatbot-top'>
                    <span>제이드(Jaid)</span>
                    <IoMdClose onClick={() => { closeAll() }} className='main-search-country-icon2' />
                </div>
                <div className='chatbot-main'>
                    <div className='chatbot-main-top-box'>
                        <div className='chatbot-main-top-box-icon'>
                            <img src="images/chatbot/jaid_icon.png" alt="" />
                        </div>
                        <h5>Fly, Better fly!</h5>
                        <h4>안녕하세요. 제이드(Jaid) 입니다!</h4>
                        <h4>무엇을 도와드릴까요?</h4>
                        <ul>
                            {
                                list.map((item) => (
                                    <li onClick={() => {
                                        setChatTab(item.tab);
                                        dispatch(getMessage(''));
                                        dispatch(getReserMessage(''));
                                        dispatch(getReserMessage1(''));
                                        setMsg1(true);
                                        setMsg2(false);
                                        setMsg3(false);
                                    }}>
                                        <img src={item.img} alt="챗봇아이콘" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div ref={componentRef}>
                        {chatTab === 'schedule' && <Schedule />}
                        {chatTab === 'airplane' && <Airplane />}
                        {chatTab === 'reservation' && <Reservation />}
                        {/* {chatTab === 'food' && goFood()} */}
                        {chatTab === 'food' && alert('준비중 입니다')}
                        {chatTab === 'cheap' && <Cheap />}
                        {chatTab === 'question' && <Question />}
                        {chatTab === 'ticket' && alert('준비중 입니다')}
                        {chatTab === 'check' && alert('준비중 입니다')}
                        {/* {chatTab === 'notice' && goNotice()} */}
                        {chatTab === 'notice' && navigate('/user/notice')}
                        {chatTab === 'buyTicket' && <BuyTicket />}
                    </div>
                </div>
                <div className='chatbot-main-bottom-box'>
                    <ul>
                        <li>
                            <img src="/images/chatbot/small_icon_01.png" alt="챗봇스몰아이콘" />
                            <span onClick={handleResetHome}>처음으로</span>
                        </li>
                        <li>
                            <img src="/images/chatbot/small_icon_02.png" alt="챗봇스몰아이콘" />
                            <span onClick={() => { setChatTab('buyTicket') }}>항공권구매</span>
                        </li>
                        <li>
                            <img src="/images/chatbot/small_icon_03.png" alt="챗봇스몰아이콘" />
                            <span onClick={handleQna}>고객의말씀(Q&A)</span>
                        </li>
                    </ul>
                </div>
                {chatTab === 'reservation' && msg1 &&
                    <div className='chatbot-bottom-box'>
                        <input name='myMessage' type="text" placeholder='궁금하신 사항을 입력해 주세요~'
                            value={message}
                            onKeyDown={activeEnter} onChange={handleMessage} />
                    </div>
                }
                {chatTab === 'reservation' && msg2 &&
                    <div className='chatbot-bottom-box'>
                        <input name='myMessage' type="text" placeholder='궁금하신 사항을 입력해 주세요~'
                            value={message}
                            onKeyDown={activeEnter2} onChange={handleMessage2} />
                    </div>
                }
            </div >
        </div>
    );
}

