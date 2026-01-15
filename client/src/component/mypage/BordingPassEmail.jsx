import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function BoardingPassEmail({ segment, onSent }) {
  useEffect(() => {
    if (!segment) return;

    emailjs.send(
      '2eo2yeo',
      'template_2hhqkwv',
      {
        user_id: segment.id,
        user_name: segment.passenger_name[0],
        user_email: '2eo2yeo@gmail.com',
        flight_number: segment.fnum,
        departure: segment.departure_location,
        arrival: segment.arrive_location,
        departure_date: segment.departure_date,
        res_num: segment.res_num,
      },
      'NAaZnpFCmR60Kynli'
    ).then(
      () => {
        alert('탑승권 이메일 전송 완료');
        if (onSent) onSent(); // 전송 후 부모에게 알림
      },
      (error) => {
        console.error('이메일 전송 실패', error);
        alert('이메일 전송 중 오류 발생');
        if (onSent) onSent(); // 실패해도 닫기
      }
    );
  }, [segment]);

  return null; // UI는 없음
}
