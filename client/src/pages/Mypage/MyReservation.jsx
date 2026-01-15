import React, { useEffect, useState } from 'react';
import MypageNavigation from '../../component/mypage/MypageNavigation.jsx';
import '../../scss/ryeong.scss';
import axios from 'axios';
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko'); // dayjs 한글 설정

// ✅ 예약 상태 렌더링 함수
function getReservationStatus(departureDateRaw) {
  const departureDate = dayjs(departureDateRaw).add(9, 'hour').startOf('day'); // 출발일 (KST 보정)
  const today = dayjs().startOf('day'); // 오늘 00:00
  const dday = departureDate.diff(today, 'day');

  if (dday < 0) {
    return <div>탑승완료</div>;
  } else {
    return (
      <div>
        확약
        <p>(D-{dday})</p>
      </div>
    );
  }
}

export default function MyReservation() {
  const [filterBtn, setFilterBtn] = useState('예약내역');
  const [resData, setResData] = useState([]);
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const id = localStorage.getItem('user_id');
      axios.post('http://localhost:9000mypage/getMyRes', { id })
        .then((res) => {
          console.log('서버 응답 데이터:', res.data);
          setResData(res.data || []);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // 턉에 따라 데이터 필터링
  const filteredData = resData.filter(itemGroup => {
    const departureDate = dayjs(itemGroup[0].departure_date).add(9, 'hour').startOf('day');
    const today = dayjs().startOf('day');
    return filterBtn === '예약내역'
      ? departureDate.isSame(today) || departureDate.isAfter(today)
      : departureDate.isBefore(today);
  });

  return (
    <div className='r-common mp-container'>
      <div className='mp-content'>
        <MypageNavigation />
        <section className='mp-common-content'>
          <span className='mp-common-title w700'>나의 예약</span>

          {/* 필터 버튼 */}
          <div className='myRes-top'>
            <ul className='res-filter-btn'>
              <li>
                <button aria-selected={filterBtn === '예약내역'} onClick={() => setFilterBtn('예약내역')}>예약내역</button>
              </li>
              <li>
                <button aria-selected={filterBtn === '지난예약'} onClick={() => setFilterBtn('지난예약')}>지난예약</button>
              </li>
            </ul>
            <select className="sort">
              <option>출발일순</option>
              <option>예약일순</option>
            </select>
          </div>

          {/* 테이블 헤더 */}
          <div className='mp-table-wrap'>
            <ul className='myRes-thead'>
              <li style={{ flex: '2' }}>예약번호</li>
              <li style={{ flex: '7' }}>여정</li>
              <li style={{ flex: '2' }}>예약일</li>
              <li style={{ flex: '1' }}>구분</li>
              <li style={{ flex: '1' }}>탑승객수</li>
              <li style={{ flex: '2' }}>예약상태</li>
            </ul>

            {/* 예약 리스트 출력 */}
            {
              filteredData.length > 0 ? filteredData.map((itemGroup, i) => (
                <section className='myRes-tbody' key={i}>
                  <div className='w300'>{itemGroup[0].res_num}</div>

                  <div className='itinerary'>
                    <ul>
                      {itemGroup.map((item, idx) => (
                        <li key={idx}>
                          <div className='empty'></div>
                          <div className='flight-segment'>
                            <b className='f12'>{`구간${idx + 1}`}</b>
                            <span className='w600'>{item.fnum}</span>
                          </div>
                          <div className='flight-segment-type'>
                            <span className='f20 w600'>
                              {item.arrive_location}
                              <label className='f14 w300'>{item.d_acode}</label>
                            </span>
                            <p className='f12 w300'>
                              {dayjs(item.departure_date).add(9, 'hour').format('YYYY.MM.DD (ddd) HH:mm')}
                            </p>
                          </div>
                          <span className='air-port-svg'></span>
                          <div className='flight-segment-type'>
                            <span className='f20 w600'>
                              {item.departure_location}
                              <label className='f14 w300'>{item.a_acode}</label>
                            </span>
                            <p className='f12 w300'>
                              {dayjs(item.arrive_date).add(9, 'hour').format('YYYY.MM.DD (ddd) HH:mm')}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>{dayjs(itemGroup[0].res_date).format('YYYY.MM.DD (ddd)')}</div>
                  <div>{itemGroup.length === 2 ? '왕복' : '편도'}</div>
                  <div>{itemGroup[0].passenger_name ? itemGroup[0].passenger_name.length : 0}명</div>
                  
                  {/* 예약상태 출력 */}
                  <div>{getReservationStatus(itemGroup[0].departure_date)}</div>
                </section>
              )) : (
                <div className='res-list-none'>
                  <span></span>
                  <p>예약된 내역이 없습니다.</p>
                </div>
              )
            }
          </div>
        </section>
      </div>
    </div>
  );
}
