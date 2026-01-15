import '../../scss/ryeong.scss';
import '../../scss/dahee.scss';
import React, { useEffect, useState } from 'react';
import MypageNavigation from '../mypage/MypageNavigation.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { formatDate } from 'date-fns';

export default function Notice() {
    const navigate = useNavigate();
    const [ noticeData, setNoticeData] = useState([]);
    const [isOpen, setIsOpen] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ block, setBlock ] = useState(0);
    const itemsPerPage = 5; // 페이지당 개수
    const pageBlockSize = 10;
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentList = noticeData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(noticeData.length / itemsPerPage);
    // qna 테이블 불러오기
    useEffect(() => {
        axios.post('http://localhost:9000admin/noticeList')
            .then((res) => {
                setNoticeData(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    // 나의 문의 내용 확인 토글
    const toggleContent = (index) => {
        setIsOpen(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    /* 페이지네이션 - 번호 */
    const getPageNumbers = () => {
        const start = block * pageBlockSize + 1;
        const end = Math.min(start + pageBlockSize - 1, totalPages);
        const pages = [];
        for (let i = start; i <= end; i++) {
        pages.push(i);
        }
        return pages;
    };

    /* 페이지네이션 - 이전 버튼 */
    const goToPrevBlock = () => {
        if (block > 0) {
          const newBlock = block - 1;
          setBlock(newBlock);
          setPage(newBlock * pageBlockSize + 1); 
        }
      };
      

    /* 페이지네이션 - 다음 버튼 */
    const goToNextBlock = () =>{
        if ((block + 1) * pageBlockSize < totalPages) {
        const newBlock = block + 1;
        setBlock(newBlock);
        setPage(newBlock * pageBlockSize + 1);
        }
    };

    return (
        <div className='r-common mp-container'>
            <div className='mp-content'>
                <MypageNavigation />
                <span className='notice-title'>공지사항</span>
            </div>
            <div className='notice-table'>
                <table className='notice-table'>
                    <thead>
                        <tr>
                            <th style={{width:'100px'}}>번호</th>
                            <th style={{width:'700px'}}>제목</th>
                            <th style={{width:'200px'}}>등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentList && currentList.map((item, i) =>( 
                    <tr key={i}>
                        <td>[ 공지 ]</td>
                        <td className='notice-title2' onClick={()=>navigate(`/user/noticeInfo/:${item.num}`)}>{item.title}</td>
                        <td>{item.reg_date.split(' ')[0]}</td>
                    </tr>
                    ))
                        }
                    </tbody>
                </table>
            </div> {/* 해당 컴포넌트 가운데 정렬*/}
            <div className='custom-pagination'>
                <button onClick={goToPrevBlock} disabled={block ===0}>
                    <FiChevronLeft />
                </button>
                {getPageNumbers().map((num) => (
                    <button key={num}
                            onClick={() => setPage(num)}
                            className={page === num ? 'active' : ''}>{num}</button>
                ))}
                <button onClick={goToNextBlock} disabled={(block + 1) * pageBlockSize >= totalPages}><FiChevronRight /></button>
            </div>
        </div> /* 백그라운드 컬러 설정 */
        
    );
}

