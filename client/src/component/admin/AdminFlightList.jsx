import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../pages/Pagination1.jsx";
import { IoMdSearch } from "react-icons/io";

export default function AdminAirRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [searchType, setSearchType] = useState("default");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const limit = 10;
  const listPerPage = 10;
  const totalPages = totalCnt / listPerPage;

  useEffect(() => {
    fetchFlightList(page);
  }, [page]);

  /* 검색 이벤트 */
  const handleSearch = async () => {
    setPage(1);
    fetchFlightList(1);
  };

  const fetchFlightList = async (pageParam) => {
    try {
      const res = await axios.get("http://localhost:9000/admin/flight", {
        params: {
          type: searchType === "default" ? "" : searchType,
          keyword: searchKeyword.trim() || "",
          page: pageParam,
          limit,
        },
      });
      setFormData(res.data.result);
      setTotalCnt(res.data.cnt);
    } catch (error) {
      console.error(error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === formData.length) {
      setSelectedRows([]);
    } else {
      const deleteList = formData.map((item) => item.fnum);
      setSelectedRows(deleteList);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  /* 삭제 이벤트 */
  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:9000/admin/deleteFlightList",
        { fnums: selectedRows },
      );
      if (result.data !== 0) {
        alert("삭제가 완료되었습니다.");
        const res = await axios.post("http://localhost:9000/admin/flight");
        setFormData(res.data);
        setSelectedRows([]);
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="admin-airlist-content">
      <div className="admin-airlist-top">
        <div className="admin-airlist-title">항공권 관리</div>
        <div className="admin-airlist-controls">
          <select
            className="admin-select-option"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="default">선택</option>
            <option value="departure_location">출발지</option>
            <option value="arrive_location">도착지</option>
            <option value="fnum">비행번호</option>
          </select>
          <input
            type="text"
            className="admin-search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <IoMdSearch
            className="admin-search-icon"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <table className="admin-airlist">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>
              <input
                type="checkbox"
                checked={
                  formData.length > 0 && selectedRows.length === formData.length
                }
                onChange={handleSelectAll}
              />
            </th>
            <th style={{ width: "50px" }}>No</th>
            <th style={{ width: "200px" }}>출발지</th>
            <th style={{ width: "200px" }}>도착지</th>
            <th style={{ width: "230px" }}>비행번호</th>
            <th style={{ width: "200px" }}>출발날짜</th>
            <th style={{ width: "150px" }}>가격</th>
          </tr>
        </thead>
        <tbody>
          {formData &&
            formData.map((data, idx) => (
              <tr key={idx}>
                <td style={{ width: "20px" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(data.fnum)}
                    onChange={() => handleSelectRow(data.fnum)}
                  />
                </td>
                <td style={{ width: "50px" }}>{data.no}</td>
                <td style={{ width: "200px" }}>
                  {data.departure_location}({data.d_acode})
                </td>
                <td style={{ width: "200px" }}>
                  {data.arrive_location}({data.a_acode})
                </td>
                <td style={{ width: "230px" }}>{data.fnum}</td>
                <td style={{ width: "200px" }}>{data.departure_date}</td>
                <td style={{ width: "150px" }}>{data.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="admin-airlist-bottom">
        <div className="admin-delete-btn">
          <button type="button" onClick={handleDelete}>
            삭제
          </button>
        </div>
        <Pagination
          totalPages={totalPages}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <div className="admin-insert-btn">
          <button onClick={() => navigate("/admin/flight/add")}>등록</button>
        </div>
      </div>
    </div>
  );
}
