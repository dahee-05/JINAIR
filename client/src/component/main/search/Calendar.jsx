import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { ko } from 'date-fns/locale/ko';
import { useDispatch } from 'react-redux';


export default function Calendar({mom,endMom}) {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null); 
    const [endDate, setEndDate] = useState(null); 
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    
    const handleStartDate = (startDate) => {
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 두 자리
            const day = String(date.getDate()).padStart(2, '0'); // 일 두 자리
            const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' }); // 요일 (금)
            return `${year}.${month}.${day}(${weekday})`;
        };
        const testDate = new Date(startDate);
        const filterStart = formatDate(testDate);
        mom(filterStart);
    }
    const handleEndDate = (endDate) => {
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 두 자리
            const day = String(date.getDate()).padStart(2, '0'); // 일 두 자리
            const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' }); // 요일 (금)
            return `${year}.${month}.${day}(${weekday})`;
        };
        const testDate = new Date(endDate);
        const filterEnd = formatDate(testDate);
        endMom(filterEnd);
    }

    useEffect(() => {
        if (startDate) handleStartDate(startDate);
        if (endDate) handleEndDate(endDate); // ✅ null 체크!
      }, [startDate, endDate]);

    return (
        <DatePicker
            monthsShown={2}
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            locale={ko}
            inline
            dateFormatCalendar="yyyy년 MM월"
        />
    );
}

