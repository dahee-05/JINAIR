import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNoticeAdd() {
  const [inputData, setInputData] = useState({});
  const navigate = useNavigate();

  const refs = {
    titleRef: useRef(null),
    contentRef: useRef(null),
  };
  const handleForm = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData.title === "" || inputData.title === undefined) {
      alert("제목을 입력해주세요");
      return;
    } else if (inputData.content === "" || inputData.content === undefined) {
      alert("내용을 입력해주세요");
      return;
    } else {
      axios
        .post("http://localhost:9000/admin/noticeRegister", inputData)
        .then((res) => {
          if (res.data === 1) {
            alert("공지사항이 정상적으로 등록되었습니다.");
            navigate("/admin/notice");
          } else {
            alert("공지사항 등록에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("공지사항 등록중 에러가 발생했습니다.");
        });
    }
  };

  return (
    <div className="admin-notice-content">
      <form onSubmit={handleSubmit}>
        <div className="admin-notice-top">
          <div className="admin-notice-title">공지사항 등록</div>
        </div>
        <div className="admin-noticeUpload-all-box">
          <table>
            <tr>
              <td>
                제목<span style={{ color: "red" }}>*</span>
              </td>
              <td>
                <input
                  ref={refs.titleRef}
                  name="title"
                  type="text"
                  onChange={handleForm}
                />
              </td>
            </tr>
            <tr>
              <td>
                내용<span style={{ color: "red" }}>*</span>
              </td>
              <td>
                <textarea
                  ref={refs.contentRef}
                  name="content"
                  rows={10}
                  onChange={handleForm}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="admin-noticeUpload-btn">
          <button type="button" onClick={() => navigate("/admin/notice")}>
            목록
          </button>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}
