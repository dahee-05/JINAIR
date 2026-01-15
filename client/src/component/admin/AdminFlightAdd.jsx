import React, { useRef, useEffect } from 'react';
import { TbArrowsExchange } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { FaCalendarCheck } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { getModalOpen, getCalendar3, getCalendar4, getStartDate, getTimeModal, getEndDate, getType, getDeparture, getArrive, resetSearchState} from '../../service/adminSearchApi.js';
import { validateFlightAdd } from '../../utils/adminPostRegister.js';
import AdminSearchCountryModal from './AdminSearchCountryModal.jsx';
import AdminOnewaySearchCalendar from './AdminOnewaySearchCalendar.jsx';
import AdminTimePicker from './AdminTimePicker.jsx';
import {useNavigate} from 'react-router-dom';
import '../../scss/haon.scss';
import { useState } from 'react';
import axios from 'axios';

export default function AdminFlightAdd() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeType, setTimeType] = useState('start');
  const [ planeN , setPlaneN ] = useState('default');
  const [ fnum , setFnum ] = useState('default');
  const [ msgResult, setMsgResult] = useState('');
  // const [ msgCheck, setMsgCheck ] = useState('');
  const adModalOpen = useSelector(state => state.adSearch.adModalOpen);
  const adDeparture = useSelector(state => state.adSearch.adDeparture);
  const adArrive = useSelector(state => state.adSearch.adArrive);
  const adStartDate = useSelector(state => state.adSearch.adStartDate);
  const adEndDate = useSelector(state => state.adSearch.adEndDate);
  const adCalendar3 = useSelector(state => state.adSearch.adCalendar3);  
  const adCalendar4 = useSelector(state => state.adSearch.adCalendar4);  
  const adTimeModal = useSelector(state => state.adSearch.adTimeModal);  
  const adStartTime = useSelector(state => state.adSearch.adStartTime);  
  const adEndTime = useSelector(state => state.adSearch.adEndTime);  
  const adType = useSelector(state => state.adSearch.adType);
  const depart = useRef(null);
  const arr = useRef(null);
  const date = useRef(null);
  const initForm =  { Departure_location: '',
                      Arrive_location: '',
                      Departure_date: '',
                      Departure_time: '',
                      Arrive_date: '',
                      Arrive_time: '',
                      basic_price: '',
                      premium_price: '',
                      fnum:fnum}
  const [formData, setFormData] = useState(initForm);    

  useEffect(() => {
    dispatch(resetSearchState());
  }, []);

  useEffect(()=> {
    axios.post('http://localhost:9000admin/Fnum')
         .then((res)=>{
          setFnum(res.data)
          setFormData(prev =>({...prev, fnum:res.data}))
        })
         .catch((error)=>console.log(error))
   },[]);
   
  useEffect(() => {
    adDeparture !== '' && depart.current.style.setProperty('border', 'none');
    adDeparture !== '' && depart.current.style.setProperty('border-bottom', '1px solid var(--color-153)');
    adArrive !== '' && arr.current.style.setProperty('border', 'none');
    adArrive !== '' && arr.current.style.setProperty('border-bottom', '1px solid var(--color-153)');
    adStartDate !== '' && date.current.style.setProperty('border', 'none');
    adStartDate !== '' && date.current.style.setProperty('border-bottom', '1px solid var(--color-153)');
    adEndDate !== '' && date.current.style.setProperty('border', 'none');
    adEndDate !== '' && date.current.style.setProperty('border-bottom', '1px solid var(--color-153)');
  }, [adDeparture, adArrive, adStartDate, adEndDate])

  useEffect(() => {
    setFormData(prev => ({...prev, Departure_location: adDeparture,
                                   Arrive_location: adArrive,
                                   Departure_date: adStartDate,
                                   Departure_time: adStartTime,
                                   Arrive_date: adEndDate,
                                   Arrive_time: adEndTime
                        }));
    setMsgResult('');
  }, [adDeparture, adArrive, adStartDate, adStartTime, adEndDate, adEndTime]);

  const mom = (item) => {
    adType === 'y' && dispatch(getDeparture(item));
    adType === 'n' && dispatch(getArrive(item));
  };
  const exchangeCountry = () => {
      dispatch(getDeparture(adArrive));
      dispatch(getArrive(adDeparture));
  }
  const startCalendar = (data) => {
      dispatch(getStartDate(data));
  }
  const endCalendar = (data) => {
      dispatch(getEndDate(data));
  }
  const handleChange = (e) =>{
    const {name, value} = e.target;
    if(name === 'pnum'){setPlaneN(value)};

    setFormData({...formData, [name]:value});
    setMsgResult('');
  };
  
  /* 등록 버튼 클릭 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { result, msgResult } = validateFlightAdd(refs);
    if (result) {
      setMsgResult('');
      console.log('formData>>> ',formData);
      axios.post('http://localhost:9000admin/flightRegister', formData)
           .then((res)=>{
            console.log('gddgfdgd',res.data);
            
            if(res.data === 1){
              alert('항공권 등록이 완료되었습니다.');
              navigate('/admin/flight');
            }else{
              alert('항공권 등록에 실패했습니다. 다시 입력하세요.');
            }
          })
           .catch((error)=>{
            console.log(error)
            alert('항공권 등록에 실패했습니다. 다시 입력하세요.');
          })
    } else {
      setMsgResult(msgResult); 
    }
  };
  const handleBackBtn = () => {
    dispatch(resetSearchState());
    navigate('/admin/flight');
  };
  const refs = {
    'adDepartureRef':useRef(null),
    'adArriveRef':useRef(null),
    'adStartDateRef':useRef(null),
    'adStartTimeRef':useRef(null),
    'adEndDateRef':useRef(null),
    'adEndTimeRef':useRef(null),
    'fnumRef':useRef(null),
    'pnumRef':useRef(null),
    'basicPriceRef':useRef(null),
    'prePriceRef':useRef(null),
   };
  const msgRefs = {
    'adDepartureMsgRef':useRef(null),
    'adArriveMsgRef':useRef(null),
    'adStartDateMsgRef':useRef(null),
    'adStartTimeMsgRef':useRef(null),
    'adEndDateMsgRef':useRef(null),
    'adEndTimeMsgRef':useRef(null),
    'pnumMsgRef':useRef(null),
    'basicPriceMsgRef':useRef(null),
    'prePriceMsgRef':useRef(null),
   };


  return (
    <div className='admin-airlist-content'>
      <form onSubmit={handleSubmit}>
        <div className='admin-airlist-top'>
          <div className='admin-airlist-title'>
            항공권 등록
          </div>
        </div>
        <div className='admin-add-air'>
          {adModalOpen && (<AdminSearchCountryModal mom={mom} departure={adDeparture}/> )}
          {adCalendar3 && <AdminOnewaySearchCalendar type="start" startCalendar={startCalendar} />}
          {adCalendar4 && <AdminOnewaySearchCalendar type="end" endCalendar={endCalendar} />}
          {adTimeModal && <AdminTimePicker type={timeType}  />}

          {/* 출발지/도착지 선택 */}
          <div className='main-top-search-bottom-main-middle2 add-contry contry-check'>
            <div onClick={() => { dispatch(getModalOpen(true)); dispatch(getType('y')) }} ref={depart}>
              <h5>출발지 선택</h5>
              <div>
                <h3 className='active-arrive-country'>{adDeparture === '' ? '출발' : adDeparture}</h3>
                <input type="hidden" name="Departure_location" ref={refs.adDepartureRef} value={adDeparture} />
                <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
              </div>
            </div>
              <TbArrowsExchange className='main-top-search-bottom-main-middle-icon2'
                  onClick={exchangeCountry} />&nbsp;&nbsp;
            <div onClick={() => { dispatch(getModalOpen(true)); dispatch(getType('n')) }} ref={arr}>
                <h5>도착지 선택</h5>
                <div>
                  <h3 className='active-arrive-country'>{adArrive === '' ? '도착' : adArrive}</h3>
                  <input type="hidden" name="Arrive_location" ref={refs.adArriveRef} value={adArrive} />
                  <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
                </div>
            </div>
          </div>
          {(msgResult.adDeparture) ? (
            <div className='validate-text error'>{msgResult.adDeparture}</div>
          ) : ( (msgResult.adArrive) ? (
            <div className='validate-text error'>{msgResult.adArrive}</div>
          ): '')}


          {/* 출발/도착 일정 선택 */}
          <div className='main-top-search-bottom-main-middle2 add-contry check-time'>              
          <div ref={date}>
            <h5>출발 일정 선택</h5>
            <div onClick={() => { dispatch(getCalendar3(true)) }}>
              <span>
                <FaCalendarCheck />
                <h3 className='active-calendar-date'>
                  {adStartDate === '' ? '출발일자' : adStartDate}
                </h3>
                <input
                  type="hidden"
                  name="Departure_date"
                  ref={refs.adStartDateRef}
                  value={adStartDate}
                />
              </span>
              <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
            </div>
          </div>

          <div ref={date}>
            <h5>출발 시간 선택</h5>
            <div onClick={() => { setTimeType('start'); dispatch(getTimeModal(true)) }}>
              <span>
                <IoTimeSharp />
                <h3 className='active-calendar-date'>
                  {adStartTime === '' ? '출발시간' : adStartTime}
                </h3>
                <input
                  type="hidden"
                  name="Departure_time"
                  ref={refs.adStartTimeRef}
                  value={adStartTime}
                />
              </span>
              <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
            </div>  
          </div>  

          <div ref={date}>
            <h5>도착 일정 선택</h5>
            <div onClick={() => { dispatch(getCalendar4(true)) }}>
              <span>
                <FaCalendarCheck />
                <h3 className='active-calendar-date'>
                  {adEndDate === '' ? '도착일자' : adEndDate}
                </h3>
                <input
                  type="hidden"
                  name="Arrive_date"
                  ref={refs.adEndDateRef}
                  value={adEndDate}
                />
              </span>
              <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
            </div>
          </div>

          <div ref={date}>
            <h5>도착 시간 선택</h5>
            <div onClick={() => { setTimeType('end'); dispatch(getTimeModal(true)) }}>
              <span>
                <IoTimeSharp />
                <h3 className='active-calendar-date'>
                  {adEndTime === '' ? '도착시간' : adEndTime}
                </h3>
                <input
                  type="hidden"
                  name="Arrive_time"
                  ref={refs.adEndTimeRef}
                  value={adEndTime}
                />
              </span>
              <IoIosArrowDown className='main-top-search-bottom-main-middle-icon' />
            </div>
          </div>
        </div>
        {(msgResult.adStartDate)   ? (<div className="validate-text error validate-text">{msgResult.adStartDate}</div>) 
        : (msgResult.adStartTime)  ? (<div className="validate-text error">{msgResult.adStartTime}</div>)
        : (msgResult.adEndDate)    ? (<div className="validate-text error">{msgResult.adEndDate  }</div>)
        : (msgResult.adEndTime)    ? (<div className="validate-text error">{msgResult.adEndTime }</div>): ''}
      
          <div className='add-flight-info'>
            <div className='add-info'>
              <div className='add-input-wrapper'>
                <span className="prefix-label">비행 번호</span>
                <input type="text" className='add-fnum' readOnly  ref={refs.fnumRef}  value={fnum}/>
              </div>
              <div className='add-input-wrapper'>
                <span className="prefix-label" >비행기번호</span>
                <span className='admin-check' style={{ color: 'red' }}>*</span>
                <select name='pnum' className='add-fnum' onChange={handleChange} ref={refs.pnumRef}>
                  <option value="default" >선택</option>
                  <option value="B737-800">B737-800</option>
                  <option value="B737-900">B737-900</option>
                </select>
              </div>
            </div>
            {(msgResult.pnum) ? (<div className="validate-text error validate-text">{msgResult.pnum}</div>) 
             : <div className="validate-text"></div>}
            
            <div className='add-info1  admin-num-info-text'>
              <div className='add-input-wrapper'>
                <span className="prefix-label">토탈승객</span>
                <input type="text" 
                       className='add-fnum1' 
                       name='total_Passengers' 
                       readOnly  
                       value={planeN === 'default' ? '' : '188 좌석'}/>
              </div>
              <div className='add-input-wrapper'>
                <span className="prefix-label">Basic Seat</span>
                <input type="text" 
                       className='add-fnum1' 
                       name='basic_seat' 
                       readOnly 
                       value={planeN === 'default' ? '' :'180 좌석'}/>
              </div>
              <div className='add-input-wrapper'>
                <span className="prefix-label prem">Premium Seat</span>
                <input type="text" 
                       className='add-fnum1' 
                       name='premium_seat' 
                       readOnly 
                       value={planeN === 'default' ? '' :'8 좌석'}/>
              </div>
            </div>
          
            <div className='add-info2'>
              <div className='add-input-wrapper'>
                <span className="prefix-label">Basic Price</span>
                <span className='admin-check' style={{ color: 'red' }}>*</span>
                <input type="text" 
                       className='add-fnum' 
                       name='basic_price'  
                       ref={refs.basicPriceRef} 
                       value={formData.basic_price}
                       onChange={handleChange} 
                       placeholder='ex )_22000'/>
              </div>
              {(msgResult.basicPrice) ? (<div className="validate-text error">{msgResult.basicPrice}</div>)
               : <div className="validate-text"></div>}
              <div className='add-input-wrapper'>
                <span className="prefix-label prem">Premium Price</span>
                <span className='admin-check2' style={{ color: 'red' }}>*</span>
                <input type="text" 
                       name='premium_price'  
                       className='add-fnum'  
                       ref={refs.prePriceRef} 
                       value={formData.premium_price}
                       onChange={handleChange} 
                       placeholder='ex )__22000'/>
              </div>
              {(msgResult.prePrice) ? (<div className="validate-text error validate-text">{msgResult.prePrice}</div>)  
              : <div className="validate-text"></div>}
            </div>
          </div>  
        </div>  

        <div className='admin-air-addbtn'>
          <div className='admin-back-btn'>
            <button type='button' onClick={handleBackBtn}>목록</button>
          </div>
          <div className='admin-insert-btn'>
            <button type='submit'>등록</button>
          </div>
        </div>                
      </form>  
    </div>
  );
}

