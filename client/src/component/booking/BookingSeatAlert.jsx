import React from 'react';

export default function BookingSeatAlert({setModalIsOpen}) {
    return (
        <div className='booking-seat-alert'>
            <p>선택할 수 없는 좌석입니다.</p>
            <button onClick={() => {setModalIsOpen(false)}}>확인</button>
        </div>
    );
}