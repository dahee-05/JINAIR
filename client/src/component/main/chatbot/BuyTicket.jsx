import React, { useState, useRef, useEffect } from 'react';
import { IoAirplane } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import {
    getCountry, getChatbotModalOpen, getDeparture, getArrive, getStartDate, getTab, getSearchTab,
    getAdultNum, getPediatricNum, getBabyNum, getEndDate
} from '../../../service/searchApi.js';
import axios from 'axios';

export default function BuyTicket() {
    const dispatch = useDispatch();
    const [oneway, setOneway] = useState(false);
    const [roundtrip, setRoundtrip] = useState(false);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const dateRef = useRef(null);
    const endDateRef = useRef(null);
    const adultRef = useRef(null);
    const childRef = useRef(null);
    const babyRef = useRef(null);
    const [start, setStart] = useState(''); // 편도
    const [end, setEnd] = useState(''); // 편도
    const [date, setDate] = useState(''); // 편도
    const [endDate, setEndDate] = useState(''); // 왕복
    const [adult, setAdult] = useState(1); // 편도
    const [child, setChild] = useState(0); // 편도
    const [baby, setBaby] = useState(0); // 편도
    const [roundtripClick, setRoundtripClick] = useState(false);
    const [onewayClick, setOnewayClick] = useState(false);
    const [exist, setExist] = useState(false);
    const countryList = useSelector(state => state.search.countryList);
    const [getFlightList, setGetFlightList] = useState([]);

    useEffect(() => {
        dispatch(getCountry());
    }, []);
    const processedList = countryList.map(item => item.city.split(' (')[0]);

    const handleStart = () => {
        setStart(startRef.current.value);
    }
    const handleEnd = () => {
        setEnd(endRef.current.value);
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    }
    const validate = () => {
        if (start === '') {
            startRef.current.focus();
            return false;
        } else if (end === '') {
            endRef.current.focus();
            return false;
        } else if (date === '') {
            dateRef.current.focus();
            return false;
        }
        return true;
    }
    const handleAdult = () => {
        setAdult(adultRef.current.value);
    }
    const handleChild = () => {
        setChild(childRef.current.value);
    }
    const handleBaby = () => {
        setBaby(babyRef.current.value);
    }
    const ScheduleCheckOneway = () => { // 왕복
        if (validate()) {
            axios.post('http://localhost:9000chatbot/searchMonthCheap', { start, end, date })
                .then(res => {
                    if (res.data.result) {
                        setGetFlightList(res.data.result);
                        setOnewayClick(true);
                        setExist(false);
                    } else {
                        setExist(true);
                    }
                })
                .catch(err => console.log(err));
        }
    }
    const vali = () => {
        if (start === '') {
            startRef.current.focus();
            return false;
        } else if (end === '') {
            endRef.current.focus();
            return false;
        } else if (date === '') {
            dateRef.current.focus();
            return false;
        } else if (endDate === '') {
            endDateRef.current.focus();
            return false;
        }
        return true;
    }
    const ScheduleCheckRound = () => { // 왕복
        if (vali()) {
            axios.post('http://localhost:9000chatbot/searchSchedule', { start, end, date, endDate })
                .then(res => {
                    if (res.data.result === 1) {
                        setRoundtripClick(true);
                    }
                })
                .catch(err => console.log(err));
            axios.post('http://localhost:9000chatbot/searchMonthCheap', { start, end, date })
                .then(res => {
                    // if (res.data.result === 1) {
                    setGetFlightList(res.data.result);
                }
                )
                .catch(error => console.log(error));
        }
    }
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const onewayReservation = () => {
        dispatch(getChatbotModalOpen(false));
        dispatch(getDeparture(start));
        dispatch(getArrive(end));
        dispatch(getStartDate(date));
        dispatch(getTab('main'));
        dispatch(getSearchTab('oneWay'));
        dispatch(getAdultNum(adult));
        dispatch(getPediatricNum(child));
        dispatch(getBabyNum(baby));
    }
    const RoundReservation = () => {
        dispatch(getChatbotModalOpen(false));
        dispatch(getDeparture(start));
        dispatch(getArrive(end));
        dispatch(getStartDate(date));
        dispatch(getEndDate(endDate));
        dispatch(getTab('main'));
        dispatch(getSearchTab('roundTrip'));
        dispatch(getAdultNum(adult));
        dispatch(getPediatricNum(child));
        dispatch(getBabyNum(baby));
    }
    return (
        <div className='chatbot-buyticket-all-box'>
            <div className='schedule-all-box'>
                <p>항공권 구매를 선택하셨습니다!<br />아래에서 ‘편도’, '왕복’중 여정을 선택해주세요 ^^</p>
                <div className='cheap-button-box'>
                    <button onClick={() => { setOneway(true);setRoundtrip(false) }}>편도</button>
                    <button onClick={() => { setRoundtrip(true);setOneway(false) }}>왕복</button>
                </div>
            </div>
            {oneway &&
                <div className='schedule-all-box'>
                    <p>츨/도착지와 날짜를 선택해주세요!</p>
                    <div className='schedule-country-check-box'>
                        <span>출발/도착</span>
                        <select ref={startRef} name="" id="" onChange={handleStart}>
                            <option value='default'>선택</option>
                            {processedList.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                        <select ref={endRef} name="" id="" onChange={handleEnd}>
                            <option value='default'>선택</option>
                            {processedList.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                    </div>
                    <div className='schedule-calendar-check-box'>
                        <span>가는날</span>
                        <input ref={dateRef} type="date" onChange={handleDate} />
                    </div>
                    <div className='buyticket-oneway-people-box'>
                        <li>
                            <label htmlFor="">성인</label>
                            <select onChange={handleAdult} ref={adultRef}>
                                <option value="1">1</option>
                                {list.map((num) => (
                                    <option value={num}>{num}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label htmlFor="">어린이</label>
                            <select onChange={handleChild} ref={childRef}>
                                <option value="">선택</option>
                                {list.map((num) => (
                                    <option value={num}>{num}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label htmlFor="">유아</label>
                            <select onChange={handleBaby} ref={babyRef}>
                                <option value="">선택</option>
                                {list.map((num) => (
                                    <option value={num}>{num}</option>
                                ))}
                            </select>
                        </li>
                    </div>
                    <div className='cheap-button-box'>
                        <button onClick={() => { ScheduleCheckOneway() }}>확인</button>
                    </div>
                </div>
            }
            {onewayClick &&
                <div className='schedule-all-box'>
                    <div>
                        <span>출발일 : <span>{date}</span></span>
                    </div>
                    <div>
                        <span>{start}</span>
                        <IoAirplane className='cheap-icon' />
                        <span>{end}</span>
                    </div>
                    <div>성인 {adult}명, 소아{child}명, 유아{baby}명</div>
                    <div className='cheap-reservation'>
                        <div>
                            <ul>
                                <li>
                                    <span>항공운임</span>
                                    <span>{(getFlightList.basic_price * adult + getFlightList.basic_price * child +
                                        getFlightList.basic_price * baby).toLocaleString()}원</span>
                                </li>
                                <li>
                                    <span>유류할증료 + 세금</span>
                                    <span>{(getFlightList.basic_price * 0.1).toLocaleString()}원</span>
                                </li>
                                <li>
                                    <span>총 금액</span>
                                    <span>{(getFlightList.basic_price * adult + getFlightList.basic_price * child +
                                        getFlightList.basic_price * baby + getFlightList.basic_price * 0.1).toLocaleString()}원</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button onClick={() => { onewayReservation(); scrollToTop() }}>예약하기</button>
                        </div>
                    </div>
                    <p>*상기 운임은 참고사항으로, 공항 사정이나 일정에 따라 수시로 변동 될 수 있습니다.</p>
                    <div className='cheap-cheap-month'>
                        <h5>4월 최저가</h5>
                        <div className='cheap-cheap-month-middle'>
                            <div>
                                <ul>
                                    <li>{getFlightList.date}</li>
                                    <li>성인 1명 기준</li>
                                    <li>{getFlightList.basic_price.toLocaleString()}원</li>
                                    <li>(항공운임, 유류할증료, 세금 포함 금액)</li>
                                </ul>
                            </div>
                            <div><button>예약하기</button></div>
                        </div>
                    </div>
                    <div>
                        <p>월별 최저가 운임은 성인 1인 기준으로, 여러 좌석 예매를 진행 하실 경우
                            <br /> 남은 좌석에 따라 운임이 변동 될 수 있습니다. 또한 동일한 운임이 있을 경우
                            <br /> 가장 가까운 날짜를 알려드립니다.</p>
                    </div>
                </div>
            }
            {exist &&
                <div className='schedule-all-box buyticket-none'>
                    <p>조회하신 날짜는 현재 예약이 마감되었거나,<br /> 운항편이 존재하지 않습니다.
                        <br /> 다른 날짜로 일정을 조회해 주세요.</p>
                </div>
            }
            {roundtrip &&
                <div className='schedule-all-box'>
                    <p>츨/도착지와 날짜를 선택해주세요!</p>
                    <div className='schedule-country-check-box'>
                        <span>출발/도착</span>
                        <select ref={startRef} name="" id="" onChange={handleStart}>
                            <option value='default'>선택</option>
                            {processedList.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                        <select ref={endRef} name="" id="" onChange={handleEnd}>
                            <option value='default'>선택</option>
                            {processedList.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                    </div>
                    <div className='schedule-calendar-check-box'>
                        <span>가는날</span>
                        <input ref={dateRef} type="date" onChange={handleDate} />
                    </div>
                    <div className='schedule-calendar-check-box'>
                        <span>오는날</span>
                        <input ref={endDateRef} type="date" onChange={handleEndDate} />
                    </div>
                    <div className='buyticket-oneway-people-box'>
                        <li>
                            <label htmlFor="">성인</label>
                            <select onChange={handleAdult} ref={adultRef}>
                                <option value="1">1</option>
                                {list.map((num) => (
                                    <option value={num}>{num}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label htmlFor="">어린이</label>
                            <select onChange={handleChild} ref={childRef}>
                                <option value="">선택</option>
                                {list.map((num) => (
                                    <option value={num}>{num}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label htmlFor="">유아</label>
                            <select onChange={handleBaby} ref={babyRef}>
                                <option value="">선택</option>
                                {list.map((num) => (
                                    <option value={num}>{num}</option>
                                ))}
                            </select>
                        </li>
                    </div>
                    <div className='cheap-button-box'>
                        <button onClick={() => { ScheduleCheckRound() }}>확인</button>
                    </div>
                </div>
            }
            {roundtripClick &&
                <div className='schedule-all-box'>
                    <div className='cheap-round-before-select'>
                        <span>가는날 : <span>{date}</span></span>
                        <span>오는날 : <span>{endDate}</span></span>
                    </div>
                    <div>
                        <span>{start}</span>
                        <IoAirplane className='cheap-icon' />
                        <span>{end}</span>
                    </div>
                    <div>{adult}명, 소아{child}명, 유아{baby}명</div>
                    <div className='cheap-reservation'>
                        <div >
                            <ul>
                                <li>
                                    <span>항공운임</span>
                                    <span>{(getFlightList.basic_price * adult + getFlightList.basic_price * child +
                                        getFlightList.basic_price * baby).toLocaleString()}원</span>
                                </li>
                                <li>
                                    <span>유류할증료 + 세금</span>
                                    <span>{(getFlightList.basic_price * 0.1).toLocaleString()}원</span>
                                </li>
                                <li>
                                    <span>총 금액</span>
                                    <span>{(getFlightList.basic_price * adult + getFlightList.basic_price * child +
                                        getFlightList.basic_price * baby + getFlightList.basic_price * 0.1).toLocaleString()}원</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button onClick={() => { RoundReservation(); scrollToTop() }}>예약하기</button>
                        </div>
                    </div>
                    <p>*상기 운임은 참고사항으로, 공항 사정이나 일정에 따라 수시로 변동 될 수 있습니다.</p>
                    <div className='cheap-cheap-month'>
                        <h5>4월 최저가</h5>
                        <div className='cheap-cheap-month-middle'>
                            <div>
                                <ul>
                                    <li>{getFlightList.date} ~ {getFlightList.endDate}</li>
                                    <li>성인 1명 기준</li>
                                    <li>{getFlightList.basic_price.toLocaleString()}원</li>
                                    <li>(항공운임, 유류할증료, 세금 포함 금액)</li>
                                </ul>
                            </div>
                            <div >
                                <button onClick={() => { RoundReservation(); scrollToTop() }}>예약하기</button>
                            </div>
                        </div>
                        <div className='cheap-round-desc'>
                            <p>월별 최저가 운임은 성인 1인 기준으로, 여러 좌석 예매를 진행 하실 경우 남은 좌석에 따라 운임이 변동 될 수 있습니다. 또한 동일한 운임이 있을 경우 가장 가까운 날짜를 알려드립니다.</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

