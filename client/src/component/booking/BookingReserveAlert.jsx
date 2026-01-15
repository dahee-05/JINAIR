import React from 'react';

export default function BookingReserveAlert({ text, setModalIsOpen, setAlertOpen }) {
    return (
        <div className='booking-seat-alert'>
            <p>{text}</p>
            {setModalIsOpen
                ? <button onClick={() => { setModalIsOpen(false) }}>확인</button>
                : <button onClick={() => { setAlertOpen(false) }}>확인</button>
            }
        </div>
    );
}