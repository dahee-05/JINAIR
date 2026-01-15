import React, { useEffect, useState } from 'react';
import MypageNavigation from '../../component/mypage/MypageNavigation.jsx';
import '../../scss/ryeong.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useDispatch, useSelector } from "react-redux";

export default function MyQna() {
    dayjs.locale('ko');  // 날짜 포맷
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const [qnaData, setQnaData] = useState(null);
    const [isOpen, setIsOpen] = useState([]);

    // qna 테이블 불러오기
    useEffect(() => {

        if (isLoggedIn) {
            const id = localStorage.getItem('user_id');

            axios.post('http://localhost:9000mypage/getMyQna', { id })
                .then((res) => {
                    console.log('서버 응답 데이터:', res.data);
                    setQnaData(res.data);
                })
                .catch((err) => console.log(err))
        }
    }, [])


    // 나의 문의 내용 확인 토글
    const toggleContent = (index) => {
        setIsOpen(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    return (
        <div className='r-common mp-container'>
            <div className='mp-content'>
                <MypageNavigation />
                <section className='mp-common-content'>
                    <div className='mp-common-top'>
                        <span className='mp-common-title'>1:1문의</span>
                        <div className='flex gap5'>
                            <button className='g-btn' onClick={() => { navigate('../mypage/qnaUpload') }}>문의 등록(Q&A)</button>
                            <button className='g-btn' onClick={() => { alert('준비중입니다.') }}>자주묻는질문(FAQ)</button>
                        </div>
                    </div>
                    <div className='mp-table-wrap'>
                        <ul className='myRes-thead'>
                            <li style={{ flex: '2' }}>카테고리</li>
                            <li style={{ flex: '6' }}>제목</li>
                            <li style={{ flex: '1' }}>아이디</li>
                            <li style={{ flex: '2' }}>작성일</li>
                            <li style={{ flex: '1' }}>상태</li>
                        </ul>
                        {
                            qnaData && qnaData.length > 0 ? qnaData.map((item, i) =>
                            (

                                <section className='myQna-tbody' key={item.qid || i}>
                                    <div className='myQna-title-wrap cursor-pointer' onClick={() => toggleContent(i)}>
                                        <div>
                                            {item.category}
                                        </div>
                                        <div>
                                            {item.TITLE}
                                        </div>
                                        <div>
                                            {item.id}
                                        </div>
                                        <div>
                                            {dayjs(item.REG_DATE).format('YYYY.MM.DD HH:mm')}
                                        </div>
                                        <div>
                                            {item.comment || '확인중'}
                                        </div>
                                    </div>
                                    {isOpen.includes(i) && (
                                        <div className='myQna-content'>
                                            <div className='myQna-content-user'>
                                                <p><b>Q.</b>{item.TITLE}</p>
                                                <p>{item.CONTENT}</p>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className='myQna-content-admin'>
                                                <p><b>A.</b>{item.adminTitle}</p>
                                                <p>{item.adminContent}</p>
                                            </div>
                                        </div>
                                    )}


                                </section>

                            )) : (
                                <div className='res-list-none'>
                                    <span></span>
                                    <p>문의내역이 없습니다.</p>
                                </div>
                            )
                        }




                    </div>
                </section>
            </div> {/* 해당 컴포넌트 가운데 정렬*/}
        </div> /* 백그라운드 컬러 설정 */
    );
}

