import React from 'react';
import { useState } from 'react';
import { BsQuestionCircleFill } from "react-icons/bs";
import MainSearchCountryModal from './MainSearchCountryModal.jsx';
import MainSearchPeopleModal from './MainSearchPeopleModal.jsx';
import MainSearchCalendar from './MainSearchCalendar.jsx';
import MultiSearchCalendar from './MultiSearchCalendar.jsx';
import OnewaySearchCalendar from './OnewaySearchCalendar.jsx';
import RoundTrip from './RoundTrip.jsx';
import OneWay from './OneWay.jsx';
import MultiCity from './MultiCity.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getAdultNum,getPediatricNum,getBabyNum,getDeparture,getArrive,getType,
    getStartDate,getEndDate,getSearchTab
 } from '../../../service/searchApi.js';


export default function MainSearchReservation() {
    const dispatch = useDispatch();
    const modalOpen = useSelector(state => state.search.modalOpen);
    const peopleModal = useSelector(state => state.search.peopleModal);
    const calendar = useSelector(state => state.search.calendar);
    const calendar2 = useSelector(state => state.search.calendar2);   // 다구간
    const calendar3 = useSelector(state => state.search.calendar3);  // 편도
    const departure = useSelector(state => state.search.departure);
    const arrive = useSelector(state => state.search.arrive);
    const type = useSelector(state => state.search.type);
    const searchTab = useSelector(state => state.search.searchTab);
    const [multiDepart, setMultiDepart] = useState('');
    const [multiArr, setMultiArr] = useState('');
    const [startDate2, setStartDate2] = useState('');  

    const mom = (item) => {  
        type === 'y' && dispatch(getDeparture(item));
        type === 'n' && dispatch(getArrive(item));
    }
    const mom2 = (item) => {
        type === 'o' && setMultiDepart(item);
        type === 'x' && setMultiArr(item);
    }
    const exchangeCountry = () => {
        dispatch(getDeparture(arrive));
        dispatch(getArrive(departure));
    }
    const startCalendar2 = (data) => {
        setStartDate2(data);
    }
    const startCalendar = (data) => {
        dispatch(getStartDate(data));
    }
    const endCalendar = (data) => {
        dispatch(getEndDate(data));
    } 


    const list = [
        { 'tabNm': 'roundTrip', 'Nm': '왕복' },
        { 'tabNm': 'oneWay', 'Nm': '편도' },
        { 'tabNm': 'multiCity', 'Nm': '다구간' }
    ];
    return (
        <div className='main-top-search-bottom1'>
            {modalOpen && <MainSearchCountryModal mom2={mom2} mom={mom}
                departure={departure} />}
            {peopleModal && <MainSearchPeopleModal />}
            {calendar && <MainSearchCalendar startCalendar={startCalendar}
                endCalendar={endCalendar} />}
            {calendar2 && <MultiSearchCalendar startCalendar2={startCalendar2} />}
            {calendar3 && <OnewaySearchCalendar startCalendar={startCalendar} />}
            <div className='main-top-search-bottom-main-top'>
                <ul>
                    {
                        list && list.map((item) => (
                            <li onClick={() => {
                                dispatch(getSearchTab(item.tabNm)); dispatch(getDeparture('')); dispatch(getArrive('')); setMultiDepart(''); setMultiArr('');
                                dispatch(getAdultNum(1)); dispatch(getPediatricNum(0)); dispatch(getBabyNum(0));
                                dispatch(getStartDate('')); dispatch(getEndDate(''));
                            }}
                                className={searchTab === item.tabNm ? 'main-top-search-bottom-tab-active' : 'main-top-search-bottom-tab-none'} >
                                {item.Nm}
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <input type="text" placeholder='프로모션 코드를 입력해주세요.' />
                    <BsQuestionCircleFill />
                </div>
            </div>
            {searchTab === 'roundTrip' &&
                <RoundTrip exchangeCountry={exchangeCountry}  />                                                           
            }
            {searchTab === 'oneWay' &&
                <OneWay exchangeCountry={exchangeCountry}/>                                   
            }
            {searchTab === 'multiCity' &&
                <MultiCity 
                    exchangeCountry={exchangeCountry}
                    multiDepart={multiDepart} multiArr={multiArr}
                    startDate2={startDate2} />
            }
        </div>
    );
}

