import React, { useState, useRef, useEffect } from 'react';
import BookingStep from '../../component/booking/BookingStep';
import { MdArrowOutward } from "react-icons/md";
import '../../scss/yuna.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BookingPassengerForm from '../../component/booking/BookingPassengerForm';
import { setPassengerInfo } from '../../service/bookingApi.js';
import { validate } from '../../utils/bookingValidate.js';
import axios from 'axios';

export default function BookingPassenger() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resevationType = useSelector(state => state.booking.resevationType); // 편도/왕복 중 선택 타입
    const adultNum = useSelector(state => state.search.adultNum); // 성인 수
    const pediatricNum = useSelector(state => state.search.pediatricNum); // 소아 수
    const babyNum = useSelector(state => state.search.babyNum); // 유아 수

    const total = adultNum + pediatricNum + babyNum;

    const userInfo = useSelector(state => state.booking.userInfo);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const hasCheckedLogin = useRef(false);

    const [countryList, setCountryList] = useState([]);
    const [passengers, setPassengers] = useState(() => {
        if (userInfo && total === 1) {
            return [
                {
                    kname_first: userInfo.kname_first,
                    kname_last: userInfo.kname_last,
                    birth: userInfo.birth,
                    id: userInfo.id,
                    gender: userInfo.gender,
                    country: "한국(REPUBLIC OF KOREA)"
                },
            ];
        } else if (userInfo && total > 1) {
            return Array.from({ length: total }, (_, i) => {
                if (i === 0) {
                    return {
                        kname_first: userInfo.kname_first,
                        kname_last: userInfo.kname_last,
                        birth: userInfo.birth,
                        id: userInfo.id,
                        gender: userInfo.gender,
                        country: "한국(REPUBLIC OF KOREA)"
                    };
                } else {
                    return {
                        kname_first: '',
                        kname_last: '',
                        birth: '',
                        id: '',
                        gender: '',
                        country: "한국(REPUBLIC OF KOREA)"
                    };
                }
            });
        } else {
            return [];
        }
    });

    useEffect(() => {
        if (hasCheckedLogin.current) return;
        hasCheckedLogin.current = true;

        if (!isLoggedIn) {
            const select = window.confirm("로그인 서비스가 필요합니다. \n로그인 하시겠습니까?");
            select ? navigate('/login') : navigate('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        axios.get('/data/countryInfo.json')
            .then((res) => setCountryList(res.data))
            .catch((error) => console.log(error));
    }, []);

    

    /* 탑승객 정보 입력 이벤트 */
    const handlePassengerChange = (index, field, value) => {
        setPassengers(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            return updated;
        });
    };

    /* 유효성 체크 */
    const actualInputFormCount = (adultNum > 0 ? adultNum - 1 : 0) + pediatricNum + babyNum;
    // 탑승객별 ref 목록 생성
    const refsList = useRef([]);
    const msgRefsList = useRef([]);

    if (refsList.current.length !== actualInputFormCount) {
        refsList.current = Array.from({ length: actualInputFormCount }, () => ({
            firstNameRef: React.createRef(),
            lastNameRef: React.createRef(),
            birthRef: React.createRef(),
            genderRef: React.createRef()
        }));
        
        msgRefsList.current = Array.from({ length: actualInputFormCount }, () => ({
            firstNameMsgRef: React.createRef(),
            lastNameMsgRef: React.createRef(),
            birthMsgRef: React.createRef(),
            genderMsgRef: React.createRef()
        }));
    }

    /* 버튼 클릭 이벤트 */
    const clickNextBtn = () => {
        if (validate(actualInputFormCount, refsList, msgRefsList, passengers)) {
            dispatch(setPassengerInfo(passengers));
            resevationType === 'oneWay' ? navigate('/booking/selectSeat') : navigate('/booking/selectGoSeat');
        }
    }

    let refIndex = 0; // input 필드가 있는 폼만 추적
    let formRenderIndex = 0; // ref index용(로그인 유저 제외한 탑승객 수만큼)

    return (
        <div className='booking-passenger-wrap'>
            <BookingStep text={'passenger'} /> {/* 항공권 예약 ~ 결제 페이지 상단탭 */}

            <div className='booking-passenger-contents'>
                <p className='booking-page-title'>2. 탑승객 정보</p>

                {/* 순회 - 인원수에 따라 */}
                {/* {adultNum > 0 &&
                    Array.from({ length: adultNum }).map((_, index) => (
                        <BookingPassengerForm
                            type={'성인'}
                            index={index}
                            click={clickNextBtn}
                            onChange={handlePassengerChange}
                            refs={refs.current[index]}
                            msgRefs={msgRefs.current[index]}
                        />
                    ))
                }
                {pediatricNum > 0 &&
                    Array.from({ length: pediatricNum }).map((_, index) => (
                        <BookingPassengerForm
                            type={'소아'}
                            index={index}
                            click={clickNextBtn}
                            onChange={handlePassengerChange}
                            refs={refs.current[index]}
                            msgRefs={msgRefs.current[index]}
                        />
                    ))
                }
                {babyNum > 0 &&
                    Array.from({ length: babyNum }).map((_, index) => (
                        <BookingPassengerForm
                            type={'유아'}
                            index={index}
                            click={clickNextBtn}
                            onChange={handlePassengerChange}
                            refs={refs.current[index]}
                            msgRefs={msgRefs.current[index]}
                        />
                    ))
                } */}

                {/* 성인 */}
                {Array.from({ length: adultNum }).map((_, i) => {
                    const isFirstAdult = i === 0;
                    const currentIndex = isFirstAdult ? 0 : formRenderIndex + 1;
                    const refProps = !isFirstAdult
                        ? {
                            refs: refsList.current[formRenderIndex],
                            msgRefs: msgRefsList.current[formRenderIndex],
                        }
                        : {};

                    if (!isFirstAdult) {
                        formRenderIndex++
                        refIndex++
                    };

                    return (
                        <BookingPassengerForm
                            type="성인"
                            index={currentIndex}
                            onChange={handlePassengerChange}
                            click={clickNextBtn}
                            {...refProps}
                        />
                    );
                })}

                {/* 소아 */}
                {Array.from({ length: pediatricNum }).map((_, i) => {
                    const currentIndex = formRenderIndex + 1; // 로그인 유저 이후 index
                    const refProps = {
                        refs: refsList.current[refIndex],
                        msgRefs: msgRefsList.current[refIndex],
                    };

                    formRenderIndex++;
                    refIndex++;

                    return (
                        <BookingPassengerForm
                            type="소아"
                            num={0}
                            index={currentIndex}
                            onChange={handlePassengerChange}
                            click={clickNextBtn}
                            {...refProps}
                        />
                    );
                })}

                {/* 유아 */}
                {Array.from({ length: babyNum }).map((_, i) => {
                    const currentIndex = formRenderIndex + 1;
                    const refProps = {
                        refs: refsList.current[refIndex],
                        msgRefs: msgRefsList.current[refIndex],
                    };

                    formRenderIndex++;
                    refIndex++;

                    return (
                        <BookingPassengerForm
                            type="유아"
                            num={0}
                            index={currentIndex}
                            onChange={handlePassengerChange}
                            click={clickNextBtn}
                            {...refProps}
                        />
                    );
                })}

                <div className='booking-passenger-info-desc'>
                    <div>
                        <p>&#60;탑승객 정보&#62;</p>
                        <ul>
                            <li>신분증 이름과 동일하게 입력해야 하며, 결제 후 이름 변경은 불가 합니다. 정보 오입력 시 탑승이 제한될 수 있습니다. 단, 동일 발음(동일인)에 한하여 철자 변경이 가능하나 수수료가 부과됩니다.</li>
                            <li>중간이름(Middle Name)이 있는 경우 띄어쓰기 없이 이름(First Name)+중간이름(Middle Name)을 입력하시기 바랍니다.</li>
                            <li>회원아이디를 인증하시면 탑승 완료 후 나비포인트가 자동 적립됩니다. (탑승 완료 후 익일)</li>
                        </ul>
                    </div>
                    <div>
                        <p>&#60;할인 및 증빙 정보&#62;</p>
                        <ul>
                            <li>유/소아 동반 고객 및 추가할인 대상은 탑승 수속 시에 해당 증빙 서류를 지참하시기 바랍니다.</li>
                            <li>중간이름(Middle Name)이 있는 경우 띄어쓰기 없이 이름(First Name)+중간이름(Middle Name)을 입력하시기 바랍니다.</li>
                            <li>회원아이디를 인증하시면 탑승 완료 후 나비포인트가 자동 적립됩니다. (탑승 완료 후 익일)</li>
                        </ul>
                        <button>할인조건 및 증빙서류<span><MdArrowOutward /></span></button>
                    </div>
                </div>
                <div className='booking-passenger-reservant'>
                    <p>예매자 정보</p>
                    <ul className='passenger-reservant-form'>
                        <li>
                            <label>이메일<span>*</span></label>
                            <input type="text" defaultValue={userInfo.email} />
                        </li>
                        <li>
                            <label>휴대전화번호<span>*</span></label>
                            <select name="country-num" id="">
                                { countryList && countryList.map((item) => (
                                    <option value={item.dial_code}>{item.ko_name} ({item.dial_code})</option>
                                )) }
                            </select>
                            <input type="text" defaultValue={userInfo.phone} />
                        </li>
                    </ul>
                    <ul className='passenger-reservant-desc'>
                        <li>국가번호 선택한 후 휴대 전화 번호 전체를 입력해 주세요. (예. 한국의 경우, 01012345678)</li>
                        <li>항공기 운항정보(스케줄 변경, 결항 등) 및 구매정보가 알림톡 또는 SMS 로 발송되며, 이메일로 e-티켓이 발송됩니다.</li>
                    </ul>
                </div>
            </div>
            <div className='booking-passenger-next-btn'>
                <button onClick={clickNextBtn}>다음 단계</button>
            </div>
        </div>
    );
}