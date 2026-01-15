import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getOnewayList } from '../../service/bookingApi.js';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Modal from 'react-modal';
import BookingReserveAlert from './BookingReserveAlert.jsx';

export default function BookingDates() {
    const dispatch = useDispatch();
    const startDate = useSelector(state => state.search.startDate); // 출발일
    const departure = useSelector(state => state.search.departure); // 출발지
    const arrive = useSelector(state => state.search.arrive); // 도착지
    const formatStartDate = startDate.replace(/\(.*\)/g, '').trim().replace(/\./g, '-');
    const [selectedDate, setSelectedDate] = useState(formatStartDate);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        dispatch(getOnewayList(departure, arrive, selectedDate));
    }, [selectedDate]);
    
    /* 현재 선택 날짜 기준으로 날짜 목록 생성 함수 */
    const getDateRange = (date) => {
        const selectedDate = new Date(date);
        const dateList = [];
        
        for (let i = -3; i < 4; i++) {
            const date = new Date(selectedDate);
            date.setDate(date.getDate() + i);
            
            const formatDate = date.toISOString().split('T')[0];
            dateList.push(formatDate);
        }
        
        return dateList;
    }

    /* selectedDate가 바뀔 때마다 dateList를 업데이트 */
    const [dateList, setDateList] = useState(getDateRange(selectedDate));

    /* 화살표 이전(<) 버튼 클릭 이벤트 - 클릭 시 선택 날짜 기준으로 일주일 전으로 이동 */
    const clickPrev = () => {
        const minDate = new Date('2025-04-08');
        const newDate = new Date(selectedDate);
        
        if (newDate < minDate) {
            setModalIsOpen(true);
        } else {
            newDate.setDate(newDate.getDate() - 7);
            const formateDate = newDate.toISOString().split('T')[0];
            setSelectedDate(formateDate);
            setDateList(getDateRange(formateDate));
        }
    }
    
    /* 화살표 다음(>) 버튼 클릭 이벤트 - 클릭 시 선택 날짜 기준으로 일주일 후로 이동 */
    const clickNext = () => {
        console.log("다음");
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 7);
        const formateDate = newDate.toISOString().split('T')[0];
        setSelectedDate(formateDate);
        setDateList(getDateRange(formateDate));
    }

    /* 날짜 목록 클릭 이벤트 :: 현재 편도 기준으로 작업중 */
    const handleDate = (list) => {
        if (list.substring(5, 7) === '03') {
            setModalIsOpen(true);
            setSelectedDate(formatStartDate);
        } else {
            setSelectedDate(list);
            dispatch(getOnewayList(departure, arrive, list));
        }
    }

    /* 알림 모달창 스타일 */
    const customAlertStyles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "350px",
            height: "80px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            justifyContent: "center",
            overflow: "auto",
            padding: "30px"
        }
    };

    return (
        <div className='booking-list-container'>
            <button className='booking-list-prev'
                onClick={clickPrev}
            >
                <IoIosArrowBack />
            </button>
            <ul className='booking-list'>
                { dateList && dateList.map((list) => 
                    <li className={selectedDate === list && 'selected-booking-date'}
                        onClick={() => {
                            handleDate(list);
                        }}
                    >
                        <p>{list}</p>
                        <p>{list.substring(5, 7) === '03' && '운항 없음'}</p>
                    </li>
                ) }
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customAlertStyles}
                ariaHideApp={false}
                contentLabel="Booking Seat Deac Modal"
                >
                <BookingReserveAlert
                    text='운항 정보가 없습니다.'
                    setModalIsOpen={setModalIsOpen}
                />
            </Modal>
            <button className='booking-list-next'
                onClick={clickNext}
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
}