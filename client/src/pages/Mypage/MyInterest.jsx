import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MypageNavigation from '../../component/mypage/MypageNavigation.jsx';
import { useNavigate } from 'react-router-dom';
import '../../scss/ryeong.scss';
import { toggleInterestItem } from '../../features/myinfo/myinfoSlice.js';
import { updateInterest, getInterest } from '../../service/myinfoApi.js';



export default function MyInterest() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const selectedAreas = useSelector(state => state.myinfo?.myinterest ?? []); // 선택된 관심 지역 상태 저장 

    // customer테이블의 interest_area 가져오기
    useEffect(() => {
        if (!isLoggedIn) {
            const select = window.confirm("로그인 서비스가 필요합니다. \n로그인 하시겠습니까?");
            select ? navigate('/login') : navigate('/');
            return;
        }
        dispatch(getInterest());
    }, []);


    // 관심 지역 선택, 해제
    const handleTagClick = (value) => {
        dispatch(toggleInterestItem(value));
    };

    // 저장시 CUSTOMER테이블의 interest_area에 json 배열로 저장
    const handleSave = () => {
        dispatch(updateInterest(selectedAreas))
        alert('관심 지역에 저장 되었습니다.')
    };

    // 출력할 지역리스트
    const areaList = ["일본", "중국", "홍콩", "마카오", "대만", "베트남", "말레이시아", "필리핀","태국", "괌" ];


    return (
        <div className='r-common mp-container'>
            <div className='mp-content'>
                <MypageNavigation />
                <section className='mp-common-content'>
                    <div className='mp-common-top'>
                        <span className='mp-common-title w700'>관심지역/테마</span>
                    </div>
                    <p className='my-interest-desc'>관심지역/테마를 선택하고 내게 맞는 맞춤형 정보와 다양한 혜택을 누려보세요.</p>
                    <div className='go-to-fit-air-btn'>
                        <p>
                            관심지역을 선택 후 내게 맞는 맞춤항공권을 확인하세요.
                        </p>
                        <span onClick={() => { navigate('../customticket') }} >
                            맞춤항공권 바로가기
                        </span>
                    </div>
                    <div className='tag-select'>
                        <div className='tag-header'>
                            <div className='tag-header-left'>
                                <b className='mp-common-title'>#1</b>
                                <p className='f18 w600'>관심지역을 선택해주세요</p>
                            </div>
                            <div className='f13'>최대 3개까지 선택이 가능합니다.</div>
                        </div>
                        <ul className='interest-tag'>
                        {   // 지역리스트
                                areaList.map((area)=>(
                                    <li
                                    key={area}
                                    // db에서 관심지역 있으면 체크상태로 넘어옴
                                    className={selectedAreas.includes(area) ? 'active' : ''}
                                    onClick={() => handleTagClick(area)}
                                    
                                    >{area}</li>
                                ))
                            }
                        </ul>
                    </div> {/* end of tagselect */}
                    <div className='align-center mt-top40 '>
                        <button className='navy-btn' onClick={handleSave}>저장</button>

                    </div>
                </section>
            </div> {/* 해당 컴포넌트 가운데 정렬 끝*/}
        </div> /* 백그라운드 컬러 설정 끝 */
    );
}

