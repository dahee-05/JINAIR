import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { Tooltip } from 'react-tooltip';
import BookingStep from '../../component/booking/BookingStep.jsx';
import BookingSeatDesc from '../../component/booking/BookingSeatDesc.jsx';
import BookingSelectPremiumSeat from '../../component/booking/BookingSelectPremiumSeat.jsx';
import BookingSelectBasicSeat from '../../component/booking/BookingSelectBasicSeat.jsx';
import BookingReserveAlert from '../../component/booking/BookingReserveAlert.jsx';
import { setGoSeatList, getSeats } from '../../service/bookingApi.js';
import { IoIosAirplane } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';

export default function BookingGoSelectSeat() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goFlightNum = useSelector(state => state.booking.goFlightNum);
    const ticketPrice = useSelector(state => state.booking.ticketPrice);
    const passengers = useSelector((state) => state.booking.passengers);
    const goSeatType = useSelector(state => state.booking.goSeatType); // 왕복 가는 편 좌석 타입
    const goTicketPrice = useSelector(state => state.booking.goTicketPrice);
    const backTicketPrice = useSelector(state => state.booking.backTicketPrice);
    const totalPrice = goTicketPrice + backTicketPrice;

    const departure = useSelector(state => state.search.departure); // 출발지
    const arrive = useSelector(state => state.search.arrive); // 도착지
    const startDate = useSelector(state => state.search.startDate); // 출발일
    const endDate = useSelector(state => state.search.endDate); // 도착일
    const ticketList = useSelector(state => state.booking.ticketList); // 예약 가능 항공권 리스트

    const [selectSeatNum, setSelectSeatNum] = useState(''); // 선택 좌석
    const [seatGrade, setSeatGrade] = useState([]);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        axios.get('/data/booking.json')
            .then((res) => setSeatGrade(res.data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        dispatch(getSeats(goFlightNum));
    }, []);

    /* 좌석 안내 모달창 스타일 */
    const customModalStyles = {
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
            width: "500px",
            height: "450px",
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
            padding: "0"
        }
    };

    /* 신청불가 알림 모달창 스타일 */
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

    /* 신청하기 버튼 클릭 이벤트 */
    const clickNext = (type) => {
        if (type === 'later') {
            navigate('/booking/beforePayment');
        } else {
            if (selectSeatNum.length === 0) {
                setAlertOpen(true);
            } else {
                dispatch(setGoSeatList(selectSeatNum));
                navigate('/booking/selectBackSeat');
            }
        }
    }

    return (
        <div className='booking-selectSeat-wrap'>
            <BookingStep text={'selectSeat'} seatPrice={totalPrice} /> {/* 항공권 예약 ~ 결제 페이지 상단탭 */}

            <div className='booking-selectSeat-contents'>
                <p className='booking-page-title'>3. 좌석 선택</p>
                <div className='booking-selectSeat-section'>
                    <span>구간1</span>
                    <div>
                        <span>{departure} <span className='thin'>{ticketList.length > 0 && ticketList[0].A_acode}</span></span>
                        <span><IoIosAirplane /></span>
                        <span>{arrive} <span className='thin'>{ticketList.length > 0 && ticketList[0].D_acode}</span></span>
                    </div>
                    <div>|</div>
                    <div>
                        <span>{startDate} ~ {endDate}</span>
                    </div>
                </div>
                <div className='booking-selectSeat-detail'>
                    <div className='booking-selectSeat-detail-top'>
                        <div>
                            <span>탑승객</span>
                            <span className='thin'>
                                <span>*</span>
                                좌석 지정 시 유의사항
                                <span className='booking-selectSeat-alert'
                                    data-tooltip-id='my-tooltip'
                                    data-tooltip-content='* 동물 알레르기 및 민감 승객께서는 공항 수속 직원에게 문의하여 주시기 바랍니다. 단, 상황에 따라 좌석 조정이 어려울 수 있습니다.'
                                >
                                    !
                                </span>
                                <Tooltip 
                                    id='my-tooltip' 
                                    place='top'
                                    className='thin'
                                    style={{backgroundColor: "#192547"}}
                                />
                            </span>
                        </div>
                        <span className='thin'>(통화 : KRW)</span>
                    </div>
                    <div className='booking-selectSeat-detail-bottom'>
                        <div>
                            { passengers.map((item, i) => (
                                <div className='selectSeat-detail-bottom-left'>
                                    <div className='selectSeat-detail-passenger-info'>
                                        <div className='selectSeat-passenger-info-num'>{i + 1}</div>
                                        <div className='selectSeat-passenger-info-icon'><IoPerson /></div>
                                        <div className='selectSeat-passenger-info-name'>
                                            <span>{item.kname_first}</span>
                                            <span>{item.kname_last}</span>
                                        </div>
                                    </div>
                                    <div className='selectSeat-select-info'>
                                        <div>
                                            <span>{selectSeatNum.length > i ? selectSeatNum[i] : ''}</span>
                                            <span>{selectSeatNum.length > i ? `KRW ${ticketPrice.toLocaleString()}` : ''}</span>
                                        </div>
                                        <div><IoIosClose /></div>
                                    </div>
                                </div>
                            )) }
                        </div>
                        <div className='selectSeat-detail-bottom-right'>
                            <ul className='selectSeact-seat-info'>
                                { seatGrade.map((item) => 
                                    <li>
                                        <div style={{border: `2px solid ${item.color}`, borderRadius: "2px", width: "12px", height: "12px"}}></div>
                                        <span style={{color: item.color}}>{item.name}</span>
                                    </li>
                                ) }
                            </ul>
                            <div onClick={() => setModalIsOpen(true)}>
                                <span><MdArrowOutward /></span>
                                <span>좌석안내</span>
                            </div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                style={customModalStyles}
                                ariaHideApp={false}
                                contentLabel="Booking Seat Deac Modal"
                            >
                                <BookingSeatDesc setModalIsOpen={setModalIsOpen} />
                            </Modal>
                        </div>
                    </div>
                    <div className='selectSeat-select-seat'>
                        { goSeatType === 'basic'
                            ? <BookingSelectBasicSeat
                                selectSeatNum={selectSeatNum}
                                setSelectSeatNum={setSelectSeatNum}
                            />
                            : <BookingSelectPremiumSeat
                                selectSeatNum={selectSeatNum}
                                setSelectSeatNum={setSelectSeatNum}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className='booking-selectSeat-buttons'>
                <button onClick={() => clickNext('later')}>나중에 선택</button>
                <button onClick={() => clickNext('reserve')}>신청하기</button>
            </div>
            <Modal
                isOpen={alertOpen}
                onRequestClose={() => setAlertOpen(false)}
                style={customAlertStyles}
                ariaHideApp={false}
                contentLabel="Booking Seat Deac Modal"
                >
                <BookingReserveAlert
                    text='좌석을 선택해주세요.'
                    setAlertOpen={setAlertOpen}
                />
            </Modal>
        </div>
    );
}