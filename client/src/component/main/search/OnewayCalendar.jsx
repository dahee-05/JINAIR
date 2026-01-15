import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';

export default function OnewayCalendar({ mom }) {
    const [selectedDate, setSelectedDate] = useState(null);
    useEffect(() => {
        if (selectedDate) handleStartDate(selectedDate);
    }, [selectedDate]);

    const handleStartDate = (selectedDate) => {
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 두 자리
            const day = String(date.getDate()).padStart(2, '0'); // 일 두 자리
            const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' }); // 요일 (금)
            return `${year}.${month}.${day}(${weekday})`;
        };
        const testDate = new Date(selectedDate);
        const filterStart = formatDate(testDate);
        mom(filterStart);
    }

    return (
        <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            monthsShown={2}
            dateFormatCalendar="yyyy년 MM월"
            inline
            locale={ko}
        />
    );
}
