import React, { useEffect, useState } from "react";
import MypageNavigation from "../mypage/MypageNavigation.jsx";
import "../../scss/dahee.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function NoticeInfo() {
  const navigate = useNavigate();
  const { num } = useParams();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:9000/admin/noticeInfo", { num: num })
      .then((res) => setFormData(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="r-common mp-container">
      <div className="mp-content">
        <MypageNavigation />
        <span className="notice-title">공지사항</span>
      </div>
      <div className="admin-noticeUpload-all-box notice-info-box">
        <table>
          <tbody>
            <tr>
              <td>
                제목<span style={{ color: "red" }}>*</span>
              </td>
              <td>
                <span className="notice-info-title" style={{ color: "black" }}>
                  {formData.title}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                내용<span style={{ color: "red" }}>*</span>
              </td>
              <td>
                <span
                  className="notice-info-content"
                  style={{ color: "black" }}
                >
                  {formData.content}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="admin-noticeUpload-btn">
        <button type="button" onClick={() => navigate("/user/notice")}>
          목록
        </button>
      </div>
    </div>
  );
}
