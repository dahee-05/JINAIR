import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaCircleCheck } from "react-icons/fa6";
import axios from 'axios';

export default function BookingPassengerForm({ type, num, index, onChange, refs, msgRefs }) {
    const userInfo = useSelector(state => state.booking.userInfo);
    const [countryList, setCountryList] = useState([]);
    const [gender, setGender] = useState('');

    useEffect(() => {
        axios.get('/data/countryInfo.json')
            .then((res) => setCountryList(res.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        userInfo && type === '성인' && index === 0
            ? (
                <div className='booking-user-form'>
                    <div className='booking-user-form-top'>
                        <span>{type} {index + 1}</span>
                    </div>
                    <div className='booking-user-info'>
                        <ul className='booking-user-info-left'>
                            <li>
                                <label>이름<span>*</span></label>
                                <div>
                                    <div>{userInfo.kname_first}</div>

                                    <div>{userInfo.kname_last}</div>
                                </div>
                            </li>
                            <li>
                                <label>생년월일<span>*</span></label>
                                <div>{userInfo.birth}</div>
                            </li>
                            <li>
                                <label>회원아이디</label>
                                <div>{userInfo.id}</div>
                            </li>
                        </ul>
                        <ul className='booking-user-info-right'>
                            <li>
                                <label>성별<span>*</span></label>
                                <div>
                                    <div>남자{userInfo.gender === 'M' && <span><FaCircleCheck /></span>}</div>
                                    <div>여자{userInfo.gender === 'F' && <span><FaCircleCheck /></span>}</div>
                                </div>
                            </li>
                            <li>
                                <label>국적<span>*</span></label>
                                <select name="country" id=""
                                    onChange={(e) => onChange(index, 'country', e.target.value)}
                                >
                                    { countryList && countryList.map((item) => (
                                        <option value={`${item.ko_name}(${item.en_name})`}>{item.ko_name}({item.en_name})</option>
                                    )) }
                                </select>
                            </li>
                            <li> {/* 삭제 고민해볼 것 */}
                                <label>추가할인</label>
                                <select name="discount" id="">
                                    <option value="default">선택</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            )
            : (
                <div className='booking-passenger-form'>
                    <div className='booking-passenger-form-top'>
                        <span>{type} {type === '성인' ? index + 1 : num + 1}</span>
                    </div>
                    <div className='booking-passenger-info'>
                        <ul className='booking-passenger-info-left'>
                            <li>
                                <label>이름<span>*</span></label>
                                <div>
                                    <input type="text"
                                        name='kname_first'
                                        placeholder='성'
                                        onChange={(e) => {
                                            onChange(index, 'kname_first', e.target.value);
                                            if (msgRefs.firstNameMsgRef.current && e.target.value !== '') {
                                                msgRefs.firstNameMsgRef.current.style.display = 'none';
                                            }
                                        }}
                                        ref={refs.firstNameRef}
                                    />
                                    <input type="text"
                                        name='kname_last'
                                        placeholder='이름'
                                        onChange={(e) => {
                                            onChange(index, 'kname_last', e.target.value);
                                            if (msgRefs.lastNameMsgRef.current && e.target.value !== '') {
                                                msgRefs.lastNameMsgRef.current.style.display = 'none';
                                            }
                                        }}
                                        ref={refs.lastNameRef}
                                    />

                                </div>
                                <div className='passengerForm-error-msg'>
                                    <span 
                                        ref={msgRefs.firstNameMsgRef} 
                                        style={{ display: 'none', color: 'red', fontSize: '12px' }}
                                    >
                                        성을 입력해주세요.
                                    </span>
                                    <span 
                                        ref={msgRefs.lastNameMsgRef}
                                        style={{ display: 'none', color: 'red', fontSize: '12px' }}
                                    >
                                        이름을 입력해주세요.
                                    </span>
                                </div>
                            </li>
                            <li>
                                <label>생년월일<span>*</span></label>
                                <input type="text"
                                    name='birth'
                                    defaultValue={index === 0 && type === '성인' ? userInfo.birth : ''}
                                    placeholder='YYYY.MM.DD (예, 2000.01.01)'
                                    onChange={(e) => {
                                        onChange(index, 'birth', e.target.value);
                                        if (msgRefs.birthMsgRef.current && e.target.value !== '') {
                                            msgRefs.birthMsgRef.current.style.display = 'none';
                                        }
                                    }}
                                    ref={refs.birthRef}
                                />
                                <span className='passengerForm-error-msg'
                                    ref={msgRefs.birthMsgRef}
                                    style={{ display: 'none', color: 'red', fontSize: '12px' }}
                                >
                                    생일을 입력해주세요.
                                </span>
                            </li>
                            <li>
                                <label>회원아이디</label>
                                <input
                                    type="text"
                                    defaultValue={index === 0 && type === '성인' ? userInfo.id : ''}
                                    onChange={(e) => onChange(index, 'id', e.target.value)}
                                />
                                <div>확인</div>
                            </li>
                        </ul>
                        <ul className='booking-passenger-info-right'>
                            <li>
                                <label>성별<span>*</span></label>
                                <div>
                                    <div className={gender === 'M' && 'selected-gender'}
                                        onClick={(e) => {
                                            setGender('M');
                                            onChange(index, 'gender', 'M');
                                            if (msgRefs.genderMsgRef?.current) {
                                                msgRefs.genderMsgRef.current.style.display = 'none';
                                            }
                                        }}
                                    >
                                        남자
                                        <span>{gender === 'M' && <FaCircleCheck />}</span>
                                    </div>
                                    <div className={gender === 'F' && 'selected-gender'}
                                        onClick={(e) => {
                                            setGender('F');
                                            onChange(index, 'gender', 'F');
                                            if (msgRefs.genderMsgRef?.current) {
                                                msgRefs.genderMsgRef.current.style.display = 'none';
                                            }
                                        }}
                                    >
                                        여자
                                        <span>{gender === 'F' && <FaCircleCheck />}</span>
                                    </div>
                                </div>
                                <span className='passengerForm-error-msg'
                                    ref={msgRefs.genderMsgRef}
                                    style={{ display: 'none', color: 'red', fontSize: '12px' }}
                                >
                                    성별을 선택해주세요.
                                </span>
                            </li>
                            <li>
                                <label>국적<span>*</span></label>
                                <select name="country" id=""
                                    onChange={(e) => onChange(index, 'country', e.target.value)}
                                >
                                    { countryList && countryList.map((item) => (
                                        <option value={`${item.ko_name}(${item.en_name})`}>{item.ko_name}({item.en_name})</option>
                                    )) }
                                </select>
                            </li>
                            <li> {/* 삭제 고민해볼 것 */}
                                <label>추가할인</label>
                                <select name="discount" id="">
                                    <option value="default">선택</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            )
    );
}