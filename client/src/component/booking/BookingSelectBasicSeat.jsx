import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { FaRegSquare } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa6";
import BookingSeatAlert from '../../component/booking/BookingSeatAlert.jsx';
import BookingSeatAlert2 from '../../component/booking/BookingSeatAlert2.jsx';
import Modal from 'react-modal';

export default function BookingSelectPremiumSeat({selectSeatNum, setSelectSeatNum}) {
    const adultNum = useSelector(state => state.search.adultNum);
    const pediatricNum = useSelector(state => state.search.pediatricNum);
    const babyNum = useSelector(state => state.search.babyNum);
    const oneWayBseats = useSelector(state => state.booking.oneWayBseats); // 편도 베이직석 리스트
    const oneWayPseats = useSelector(state => state.booking.oneWayPseats); // 편도 프리미엄석 리스트

    const total = adultNum + pediatricNum + babyNum;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    /* 좌석 선택 이벤트 */
    const setSeatNum = (seat) => {
        if (selectSeatNum.includes(seat)) {
            setSelectSeatNum(selectSeatNum.filter((item) => item !== seat));
        } else {
            if (selectSeatNum.length >= total) {
                setAlertOpen(true);
            } else {
                setSelectSeatNum([...selectSeatNum, seat]);
            }
        }
    }

    /* 알림 모달창 스타일 */
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

    const unAvailability = () => {
        setModalIsOpen(!modalIsOpen);
    }

    return (
        <div className='selectSeat-select-basic-container'>
            <div className='selectSeat-select-premium-seat'>
                {/* 프리미엄석 */}
                <ul className='select-premium-seat'>
                    {oneWayPseats.map((item) => (
                        <li id={item}
                            onClick={unAvailability}
                        >
                            <TbRectangleVerticalFilled />
                        </li>
                    ))}
                </ul>

                <ul className='select-basic-seat'>
                    {oneWayBseats.map((item, i) => (
                        i <= 5 &&
                        <li id={item}
                            onClick={() => setSeatNum(item)}
                            style={{ color: "#7e0049" }}
                        >
                            { selectSeatNum.includes(item)
                                ? <FaSquare />
                                : <FaRegSquare />
                            }
                        </li>
                    ))}
                    {oneWayBseats.map((item, i) => (
                        i > 5 && i <= 29 &&
                        <li id={item}
                            onClick={() => setSeatNum(item)}
                            style={{ color: "#077fac" }}
                        >
                            { selectSeatNum.includes(item)
                                ? <FaSquare />
                                : <FaRegSquare />
                            }
                        </li>
                    ))}
                    {oneWayBseats.map((item, i) => (
                        i > 29 && i <= 65 &&
                        <li id={item}
                            onClick={() => setSeatNum(item)}
                            style={{ color: "#c2d832" }}
                        >
                            { selectSeatNum.includes(item)
                                ? <FaSquare />
                                : <FaRegSquare />
                            }
                        </li>
                    ))}
                </ul>

                <ul className='select-basic-seat'>
                    {oneWayBseats.map((item, i) => (
                        i > 65 && i <= 71 &&
                        <li id={item}
                            onClick={() => setSeatNum(item)}
                            style={{ color: "#dfa93e" }}
                        >
                            { selectSeatNum.includes(item)
                                ? <FaSquare />
                                : <FaRegSquare />
                            }
                        </li>
                    ))}
                </ul>

                <ul className='select-basic-seat'>
                    {oneWayBseats.map((item, i) => (
                        i > 71 && i <= 77 &&
                        <li id={item}
                            onClick={() => setSeatNum(item)}
                            style={{ color: "#dc383b" }}
                        >
                            { selectSeatNum.includes(item)
                                ? <FaSquare />
                                : <FaRegSquare />
                            }
                        </li>
                    ))}
                    {oneWayBseats.map((item, i) => (
                        i > 77 &&
                        <li id={item}
                            onClick={() => setSeatNum(item)}
                            style={{ color: "#6d7348" }}
                        >
                            { selectSeatNum.includes(item)
                                ? <FaSquare />
                                : <FaRegSquare />
                            }
                        </li>
                    ))}
                </ul>
            </div>
            {/* 선택 불가 좌석 알림창 */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customModalStyles}
                ariaHideApp={false}
                contentLabel="Booking Seat Deac Modal"
                >
                <BookingSeatAlert setModalIsOpen={setModalIsOpen} />
            </Modal>
            {/* 예매 매수 초과 알림창 */}
            <Modal
                isOpen={alertOpen}
                onRequestClose={() => setAlertOpen(false)}
                style={customModalStyles}
                ariaHideApp={false}
                contentLabel="Booking Seat Deac Modal"
            >
                <BookingSeatAlert2 setAlertOpen={setAlertOpen} />
            </Modal>
        </div>
    );
}