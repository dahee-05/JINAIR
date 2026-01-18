import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../scss/haon.scss";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export default function AdminQna() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]); //db 에서 가져온 qna 리스트들

  useEffect(() => {
    axios
      .post("http://localhost:9000/chatbot/getQnaAll")
      .then((res) => {
        console.log(res.data.result);
        setFormData(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  /* 페이지네이션 */
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  // 페이지네이션 관련 로직
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = formData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(formData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % formData.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="admin-airlist-content">
      <div className="admin-airlist-top">
        <div className="admin-airlist-title">1:1 문의</div>
      </div>
      <table className="admin-airlist">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>
              <input type="checkbox" />
            </th>
            <th style={{ width: "50px" }}>No</th>
            <th style={{ width: "130px" }}>문의유형</th>
            <th style={{ width: "300px" }}>제목</th>
            <th style={{ width: "130px" }}>회원아이디</th>
            <th style={{ width: "130px" }}>등록일</th>
            <th style={{ width: "130px" }}>답변여부</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data) => (
            <tr
              onClick={() => navigate(`/admin/qnaComment/${data.no}`)}
              style={{ cursor: "pointer" }}
              className={
                data.comment === "답변완료"
                  ? "admin-qna-comment-active"
                  : "admin-qna-comment-none"
              }
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{data.no}</td>
              <td>{data.category}</td>
              <td>{data.title}</td>
              <td>{data.id}</td>
              <td>{data.reg_date}</td>
              <td>{data.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="admin-qna-pagenation">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<MdNavigateNext />}
          previousLabel={<MdNavigateBefore />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="prev"
          nextClassName="next"
          disabledClassName="disabled"
        />
      </div>
    </div>
  );
}
