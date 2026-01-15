import React from 'react';
import { IoIosClose } from "react-icons/io";

export default function BookingSeatDesc({setModalIsOpen}) {
    const list = [
        {
            color: "#dc383b",
            title: "비상구열",
            desc: "비상구에 위치하여 일반석 보다 넓은 좌석"
        },
        {
            color: "#7e0049",
            title: "지니스트레치",
            desc: "첫번째 열에 위치하여 일반석 보다 넓은 좌석"
        },
        {
            color: "#dfa93e",
            title: "비상구열 (등받이 고정)",
            desc: "비상구에 위치하여 일반석보다 넓은 좌석",
            desc2: "비상상황 발생 시 통로 확보를 위해 등받이가 고정된 좌석"
        },
        {
            color: "#077fac",
            title: "지니프론트",
            desc: "항공기 앞 쪽에 위치한 좌석"
        },
        {
            color: "#c2d832",
            title: "지니스탠다드 A",
            desc: "일반 좌석 중 앞쪽에 위치한 좌석"
        },
        {
            color: "#6d7348",
            title: "지니스탠다드 B",
            desc: "일반 좌석 중 뒤쪽에 위치한 좌석"
        }
    ];

    return (
        <div className='booking-seat-modal-wrap'>
            <div className='booking-seat-modal-top'>
                <span>좌석안내</span>
                <span onClick={() => setModalIsOpen(false)}><IoIosClose /></span>
            </div>
            <ul className='booking-seat-modal-contents'>
                { list.map((item) => 
                    <li>
                        <span style={{color: item.color}}>{item.title}</span>
                        <span>
                            <span className='thin'>{item.desc}</span>
                            { item.desc2 && <span className='thin'>{item.desc2}</span> }
                        </span>
                    </li>
                ) }
            </ul>
            <div className='booking-seat-modal-bottom'>
                <p className='thin'>* 항공기 기종에 따라 좌석 종류가 상이할 수 있습니다.</p>
                <button onClick={() => setModalIsOpen(false)}>확인</button>
            </div>
        </div>
    );
}