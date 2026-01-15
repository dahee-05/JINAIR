import React from 'react';
import { useSelector } from "react-redux";
import { IoIosAirplane } from 'react-icons/io';

export default function BookingTicketList({type, seatSelect, setSeatSelect, setFlightNum, setSeatPrice}) {
    const ticketList = useSelector(state => state.booking.ticketList); // 예약 가능 항공권 리스트

    /* 좌석 선택(일반석/프리미엄석) 클릭 이벤트 */
    /* 일단 좌석타입, 비행편 번호, 가격 저장 */
    const clickSelectSeat = (fnum, seatType, price) => {
        seatSelect === seatType ? setSeatSelect('') : setSeatSelect(seatType);
        setFlightNum(fnum);
        setSeatPrice(price);
    }

    return (
        <div className='booking-select-flight-list'>
            { ticketList && ticketList.length > 0
                ? (
                    ticketList.map((list) =>
                        <div className='booking-select-flight-section'
                            style={{ backgroundColor: seatSelect !== '' ? "rgb(211, 233, 46)" : "rgb(242, 242, 242)" }}
                        >
                            <div className='booking-select-info'>
                                <div className='booking-select-flight-info'>
                                    <p>{list.fNUM}</p>
                                    <p className='thin'>{list.pnum}</p>
                                </div>
                                <div className='booking-select-time-info'>
                                    <div className='booking-select-time-block'>
                                        <p>{list.Arrive_time.substring(0, 5)}</p>
                                        <p>{list.A_acode}</p>
                                    </div>
                                    <div>
                                        <p>01h 15m</p>
                                        <p><IoIosAirplane /></p>
                                        <div></div>
                                    </div>
                                    <div className='booking-select-time-block'>
                                        <p>{list.Departure_time.substring(0, 5)}</p>
                                        <p>{list.D_acode}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='booking-flight-buttons'>
                                <button onClick={() => clickSelectSeat(list.fNUM, 'basic',  list.basic_price)}
                                    className={seatSelect === 'basic' ? 'booking-flight-selected-seat' : "booking-flight-seat"}>
                                    <p>일반석</p>
                                    <span>KRW <b>{list.basic_price.toLocaleString()}</b></span>
                                </button>
                                <button onClick={() => clickSelectSeat(list.fNUM, 'premium', list.premium_price)}
                                    className={seatSelect === 'premium' ? 'booking-flight-selected-seat' : "booking-flight-seat"}>
                                    <p>프리미엄석</p>
                                    <span>KRW <b>{list.premium_price.toLocaleString()}</b></span>
                                </button>
                            </div>
                        </div>
                    )
                )
                : <div>항공권이 존재하지 않습니다.</div> }
        </div>
    );
}