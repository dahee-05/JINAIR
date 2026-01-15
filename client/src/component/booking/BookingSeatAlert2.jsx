import React from 'react';

export default function BookingSeatAlert2({setAlertOpen}) {
    return (
        <div className='booking-seat-alert'>
            <p>예매 매수를 초과하였습니다.</p>
            <button onClick={() => {setAlertOpen(false)}}>확인</button>
        </div>
    );
}