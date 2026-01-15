import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getOnewayList, setFlightInfo } from '../../service/bookingApi.js';
import BookingStep from '../../component/booking/BookingStep.jsx';
import BookingDates from '../../component/booking/BookingDates.jsx';
import BookingTicketList from '../../component/booking/BookingTicketList.jsx';
import BookingReserveAlert from '../../component/booking/BookingReserveAlert.jsx';
import Modal from 'react-modal';
import { IoIosAirplane } from 'react-icons/io';
import { RxDividerVertical } from "react-icons/rx";
import '../../scss/yuna.scss';

export default function BookingOneWay() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const departure = useSelector(state => state.search.departure); // 출발지
    const arrive = useSelector(state => state.search.arrive); // 도착지
    const startDate = useSelector(state => state.search.startDate); // 출발일
    const ticketList = useSelector(state => state.booking.ticketList); // 예약 가능 항공권 리스트

    const [sortSelect, setSortSelect] = useState('early');
    const [flightNum, setFlightNum] = useState(''); // 비행편
    const [seatSelect, setSeatSelect] = useState(''); // 좌석 타입
    const [seatPrice, setSeatPrice] = useState(0); // 선택 좌석 가격
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        dispatch(getOnewayList(departure, arrive, startDate));
    }, []);

    /* 탑승객 정보 입력 버튼 클릭 이벤트 */
    // 클릭시 필요 정보들 전역에 저장하기
    const clickNextBtn = () => {
        if (seatSelect !== '') {
            dispatch(setFlightInfo('oneWay', flightNum, seatSelect, seatPrice));
            navigate("/booking/passenger");
        } else {
            setAlertOpen(true);
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
        <div className='booking-avaliability-wrap'>
            <BookingStep text={'avaliability'}
                        type={'oneWay'}
                        seatPrice={seatPrice}
            /> {/* 항공권 예약 ~ 결제 페이지 상단탭 */}

            <div className='booking-avaliability-contents'>
                <p className='booking-page-title'>1. 항공편 선택</p>
                <div className='booking-date'>
                    <div className='booking-location'>
                        <span>구간 1</span>
                        <div>
                            <span>{departure} <span>{ticketList.length > 0 && ticketList[0].A_acode}</span></span>
                            <span><IoIosAirplane /></span>
                            <span>{arrive} <span>{ticketList.length > 0 && ticketList[0].D_acode}</span></span>
                        </div>
                    </div>
                    <BookingDates /> {/* 날짜 리스트 */}
                </div>

                <div className='booking-select-flight'>
                    <ul className='booking-select-flight-sort'>
                        <li onClick={() => setSortSelect('lowCharge')}
                            className={sortSelect === 'lowCharge' ? 'flight-selected-sort' : 'flight-sort'}
                        >
                            요금 낮은순
                        </li>
                        <li><RxDividerVertical /></li>
                        <li onClick={() => setSortSelect('early')}
                            className={sortSelect === 'early' ? 'flight-selected-sort' : 'flight-sort'}
                        >
                            출발 빠른순
                        </li>
                        <li><RxDividerVertical /></li>
                        <li>
                            <label>예약마감 제외</label>
                            <input type="checkbox" />
                        </li>
                    </ul>
                    
                    <BookingTicketList
                        type = {'oneWay'}
                        seatSelect = {seatSelect}
                        setSeatSelect = {setSeatSelect}
                        setFlightNum = {setFlightNum}
                        setSeatPrice = {setSeatPrice}
                    /> {/* 예약 가능 항공권 리스트 */}

                </div>
            </div>

            <div className='booking-avaliability-bottom'>
                <button style={{
                    backgroundColor: seatSelect !== '' ? "#192547" : "rgb(242, 242, 242)",
                    color: seatSelect !== '' && "#fff"
                }}
                    onClick={clickNextBtn}
                    className='booking-avaliability-bottom-button'
                >
                    탑승객 정보 입력
                </button>
            </div>
            <Modal
                isOpen={alertOpen}
                onRequestClose={() => setAlertOpen(false)}
                style={customAlertStyles}
                ariaHideApp={false}
                contentLabel="Booking Seat Deac Modal"
                >
                <BookingReserveAlert
                    text='항공편을 선택해주세요.'
                    setAlertOpen={setAlertOpen}
                />
            </Modal>
        </div>
    );
}