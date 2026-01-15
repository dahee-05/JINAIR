import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IoIosAirplane } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import '../../scss/yuna.scss';

export default function BookingStep({ text, type, seatPrice }) {
    const navigate = useNavigate();

    const totalPaymentPrice = useSelector((state) => state.payment.total_payment_price); //예상 가격

    const departure = useSelector(state => state.search.departure); // 출발지
    const arrive = useSelector(state => state.search.arrive); // 도착지
    const startDate = useSelector(state => state.search.startDate); // 출발일
    const endDate = useSelector(state => state.search.endDate); // 도착일

    const adultNum = useSelector(state => state.search.adultNum); // 성인 수
    const pediatricNum = useSelector(state => state.search.pediatricNum); // 소아 수
    const babyNum = useSelector(state => state.search.babyNum); // 유아 수
    const ticketList = useSelector(state => state.booking.ticketList); // 예약 가능 항공권 리스트
    const resevationType = useSelector(state => state.booking.resevationType);
    const ticketPrice = useSelector(state => state.booking.ticketPrice);
    const goTicketPrice = useSelector(state => state.booking.goTicketPrice);
    const backTicketPrice = useSelector(state => state.booking.backTicketPrice);

    // 항공권 선택 페이지 전용
    const total = adultNum + pediatricNum + babyNum;
    const totalPrice = seatPrice * total;


    /* 이전단계 클릭 이벤트 */
    const clickBackBtn = () => {
        if (text === 'selectSeat') {
            navigate('/booking/passenger');
        }
    }

    return (
        <div className='booking-step-wrap'>
            <div>
                <div className='booking-step-top'>
                    <div>
                        <span>{type === 'oneWay' ? '편도' : '왕복'}</span>
                        <div>
                            <span>{departure} <span className='thin'>{ticketList.length > 0 && ticketList[0].A_acode}</span></span>
                            <span><IoIosAirplane /></span>
                            <span>{arrive} <span className='thin'>{ticketList.length > 0 && ticketList[0].D_acode}</span></span>
                        </div>
                        <span>{startDate} ~ {endDate}</span>
                    </div>
                    <div>
                        <span>{adultNum >= 1 && `성인 ${adultNum}`} {pediatricNum >= 1 && `소아 ${pediatricNum}`} {babyNum >= 1 && `유아 ${babyNum}`}</span>
                        {/* { text === "avaliability" && <button>수정하기</button> } */}
                    </div>
                </div>
                <div className={`booking-step-${text}-bottom`}>
                    {
                        text === 'selectSeat' &&
                        <div className='booking-step-back-btn'
                            onClick={clickBackBtn}
                        >
                            <span><IoIosArrowBack /></span>
                            <span>이전단계</span>
                        </div>
                    }
                    <ul className='booking-step-menu'>
                        <li>1. 항공편 선택</li>
                        <li>2. 탑승객 정보</li>
                        <li>3. 좌석 선택</li>
                        <li>4. 결제</li>
                    </ul>
                    <div className='booking-step-total'>
                        <div>
                            <p className='thin'>예상 결제 총액</p>
                            <span className='thin'>
                                KRW
                                <b>{text === 'avaliability' ? `${totalPrice.toLocaleString()}원` : text === 'avaliability' && '0원'}</b>
                                <b>{text === 'passenger' && resevationType === 'oneWay' ? `${ticketPrice.toLocaleString()}원` : text === 'passenger' && resevationType === 'oneWay' && '0원'}</b>
                                <b>{text === 'selectSeat' && resevationType === 'oneWay' ? `${ticketPrice.toLocaleString()}원` : text === 'selectSeat' && resevationType === 'oneWay' && '0원'}</b>
                                <b>{text === 'passenger' && resevationType !== 'oneWay' ? `${((goTicketPrice + backTicketPrice) * total).toLocaleString()}원` : text === 'passenger' && resevationType !== 'oneWay' && '0원'}</b>
                                <b>{text === 'selectSeat' && resevationType !== 'oneWay' ? `${((goTicketPrice + backTicketPrice) * total).toLocaleString()}원` : text === 'selectSeat' && resevationType !== 'oneWay' && '0원'}</b>
                                <b>{text === 'payment' ? `${totalPaymentPrice.toLocaleString()}원` : text === 'payment' && '0원'}</b>
                            </span>
                        </div>
                        <button><IoIosArrowBack /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}