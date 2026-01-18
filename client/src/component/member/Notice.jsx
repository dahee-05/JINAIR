import "../../scss/ryeong.scss";
import "../../scss/dahee.scss";
import React, { useEffect, useState } from "react";
import MypageNavigation from "../mypage/MypageNavigation.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { formatDate } from "date-fns";
import Pagination from "../../pages/Pagination1.jsx";

export default function Notice() {
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isOpen, setIsOpen] = useState([]);
  const [page, setPage] = useState(1); // 시작 페이지
  const limit = 5;
  const listPerPage = 5; // 보여줄 페이지 개수 pageCount
  const totalPages = Math.ceil(totalCnt / listPerPage);

  useEffect(() => {
    axios
      .get("http://localhost:9000/admin/noticeList", {
        params: { page, limit },
      })
      .then((res) => {
        setNoticeData(res.data.result);
        setTotalCnt(res.data.cnt);
      })
      .catch((err) => console.log(err));
  }, [page]);

  // 나의 문의 내용 확인 토글
  const toggleContent = (index) => {
    setIsOpen((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="r-common mp-container">
      <div className="mp-content">
        <MypageNavigation />
        <span className="notice-title">공지사항</span>
      </div>
      <div className="notice-table">
        <table className="notice-table">
          <thead>
            <tr>
              <th style={{ width: "100px" }}>번호</th>
              <th style={{ width: "700px" }}>제목</th>
              <th style={{ width: "200px" }}>등록일</th>
            </tr>
          </thead>
          <tbody>
            {noticeData &&
              noticeData.map((item, i) => (
                <tr key={i}>
                  <td>{item.no}</td>
                  <td
                    className="notice-title2"
                    onClick={() => navigate(`/user/noticeInfo/:${item.num}`)}
                  >
                    {item.title}
                  </td>
                  <td>{item.reg_date.split(" ")[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>{" "}
      <Pagination
        totalPages={totalPages}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div> /* 백그라운드 컬러 설정 */
  );
}
