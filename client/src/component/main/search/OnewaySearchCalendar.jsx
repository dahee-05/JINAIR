import React ,{useState, useEffect}from 'react';
import { IoMdClose } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import OnewayCalendar from './OnewayCalendar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getCalendar3 } from '../../../service/searchApi.js';

export default function OnewaySearchCalendar({ startCalendar }) {
    const dispatch = useDispatch();
    const [localStart, setLocalStart] = useState('');

    const startMom = (data) => {
        startCalendar(data);
        setLocalStart(data);
    }
    useEffect(() => {
        if (localStart) {
            dispatch(getCalendar3(false));
        }
    }, [localStart]);

    return (
        <div className='main-search-modal-content'>
            <div className='main-search-calendar-all'>
                <div>
                    <div>
                        <span>일정 선택</span>
                        <IoMdClose onClick={() => { dispatch(getCalendar3(false)) }} />
                    </div>
                    <span><AiOutlineExclamationCircle className='main-search-calendar-icon' />
                        <span>유류할증료, 세금 포함한 편도 총액운임이며, 조회 시점에 따라 요금은 상이 할 수 있습니다.</span>
                    </span>
                </div>
                <div>
                    <OnewayCalendar mom={startMom}/>
                </div>
                <span>통화 :KRW</span>
            </div>
        </div>
    );
}

