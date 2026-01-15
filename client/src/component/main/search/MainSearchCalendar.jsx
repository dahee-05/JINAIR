import React ,{useState, useEffect}from 'react';
import { IoMdClose } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Calendar from './Calendar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getCalendar } from '../../../service/searchApi.js';

export default function MainSearchCalendar({ startCalendar, endCalendar }) {
    const dispatch = useDispatch();
    // ✅ 로컬 상태로 start/end 저장
    const [localStart, setLocalStart] = useState('');
    const [localEnd, setLocalEnd] = useState('');
    
    const startMom = (data) => {
        startCalendar(data);
        setLocalStart(data);
    }
    const endMom = (data) => {
        endCalendar(data);
        setLocalEnd(data);
    }
    // ✅ 둘 다 값이 들어오면 자동으로 달력 닫기
    useEffect(() => {
        if (localStart && localEnd) {
            dispatch(getCalendar(false));
        }
    }, [localStart, localEnd]);

    return (
        <div className='main-search-modal-content'>
            <div className='main-search-calendar-all'>
                <div>
                    <div>
                        <span>일정 선택</span>
                        <IoMdClose onClick={() => { dispatch(getCalendar(false)) }} />
                    </div>
                    <span><AiOutlineExclamationCircle className='main-search-calendar-icon' />
                        <span>유류할증료, 세금 포함한 편도 총액운임이며, 조회 시점에 따라 요금은 상이 할 수 있습니다.</span>
                    </span>
                </div>
                <div>
                    <Calendar mom={startMom} endMom={endMom} />
                </div>
                <span>통화 :KRW</span>
            </div>
        </div>
    );
}

