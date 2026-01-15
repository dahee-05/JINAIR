import React, { useRef, useEffect } from 'react';
import { TbArrowsExchange } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { FaCalendarCheck } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { getModalOpen, getPeopleModal, getCalendar3,getType } from '../../../service/searchApi.js';
import {useNavigate} from 'react-router-dom';

export default function OneWay({ exchangeCountry }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const adultNum = useSelector(state => state.search.adultNum);
    const pediatricNum = useSelector(state => state.search.pediatricNum);
    const babyNum = useSelector(state => state.search.babyNum);
    const departure = useSelector(state => state.search.departure);
    const arrive = useSelector(state => state.search.arrive);
    const startDate = useSelector(state => state.search.startDate);

    const depart = useRef(null);
    const arr = useRef(null);
    const date = useRef(null);

    useEffect(() => {
        departure !== '' && depart.current.style.setProperty('border', 'none');
        departure !== '' && depart.current.style.setProperty('border-bottom', '1px solid var(--color-153)');
        arrive !== '' && arr.current.style.setProperty('border', 'none');
        arrive !== '' && arr.current.style.setProperty('border-bottom', '1px solid var(--color-153)');
        startDate !== '' && date.current.style.setProperty('border', 'none');
        startDate !== '' && date.current.style.setProperty('border-bottom', '1px solid var(--color-153)');
    }, [departure, arrive, startDate])

    const validate = () => {
        let isValid = true;

        if (departure === '') {
            depart.current.style.setProperty('border', '2px solid red');
            isValid = false;
        }
        else if (arrive === '') {
            arr.current.style.setProperty('border', '2px solid red');
            isValid = false;
        }
        else if (startDate === '') {
            date.current.style.setProperty('border', '2px solid red');
            isValid = false;
        }
        return isValid;
    }
    const handleCheck = () => {
        if (validate()) {
            // alert('조회하기');
            navigate('/booking/availabilityList/oneWay');
        }
    }

    return (
        <>
            <div className='main-top-search-bottom-main-middle2'>
                <div onClick={() => { dispatch(getModalOpen(true)); dispatch(getType('y')) }} ref={depart}>
                    <h5>출발지 선택</h5>
                    <div>
                        {departure === '' ? <h3>출발</h3>
                            : <h3 className='active-departure-country'>{departure}</h3>}
                        <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
                    </div>
                </div>
                <TbArrowsExchange className='main-top-search-bottom-main-middle-icon2'
                    onClick={exchangeCountry} />
                <div onClick={() => { dispatch(getModalOpen(true)); dispatch(getType('n')) }} ref={arr}>
                    <h5>도착지 선택</h5>
                    <div>
                        {arrive === '' ? <h3>도착</h3>
                            : <h3 className='active-arrive-country'>{arrive}</h3>}
                        <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
                    </div>
                </div>
                <div ref={date}>
                    <h5>일정 선택</h5>
                    <div onClick={() => { dispatch(getCalendar3(true))}}>
                        <span>
                            <FaCalendarCheck />
                            {startDate !== '' ? <h3 className='active-calendar-date'>{startDate}</h3>
                                : <h3>가는날</h3>}
                        </span>
                        <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
                    </div>
                </div>
                <div onClick={() => { dispatch(getPeopleModal(true)) }}>
                    <h5>탑승 승객 인원</h5>
                    <div>
                        <span>
                            <IoPersonSharp />
                            {adultNum && pediatricNum !== 0 && babyNum !== 0 &&
                                <h3>성인{adultNum}, 소아{pediatricNum}, 유아{babyNum}</h3>}
                            {adultNum && pediatricNum !== 0 && babyNum === 0 &&
                                <h3>성인{adultNum}, 소아{pediatricNum}</h3>}
                            {adultNum && pediatricNum === 0 && babyNum === 0 &&
                                <h3>성인{adultNum}</h3>}
                        </span>
                        <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
                    </div>
                </div>
            </div>
            <div className='main-top-search-bottom-main-bottom2'>
                <button onClick={handleCheck}>항공권 조회</button>
            </div>
        </>
    );
}

