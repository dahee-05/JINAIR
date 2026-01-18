import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCheckinDate,
  getCheckinFirstNm,
  getCheckinResnum,
  getCheckinLastNm,
} from "../../../service/searchApi.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainSearchCheckIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState({});
  const [form, setForm] = useState({});
  const handleData = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  dispatch(getCheckinDate(form.rnum));
  dispatch(getCheckinFirstNm(form.firstNm));
  dispatch(getCheckinLastNm(form.lastNm));
  dispatch(getCheckinResnum(form.departDay));
  // console.log(form.rnum);

  const refs = {
    rnumRef: useRef(null),
    lastNmRef: useRef(null),
    firstNmRef: useRef(null),
    departDayRef: useRef(null),
  };
  const rnumErr = useRef(null);
  const lastErr = useRef(null);
  const firstErr = useRef(null);
  const departErr = useRef(null);

  const validate = () => {
    if (refs.rnumRef.current.value === "") {
      setErr({ ...err, rnum: "예약번호를 입력해주세요." });
      refs.rnumRef.current.focus();
      return false;
    } else if (refs.lastNmRef.current.value === "") {
      setErr({ ...err, lastNm: "예약 시 입력한 승객명을 입력해주세요." });
      refs.lastNmRef.current.focus();
      return false;
    } else if (refs.firstNmRef.current.value === "") {
      setErr({ ...err, firstNm: "예약 시 입력한 승객명을 입력해주세요." });
      refs.firstNmRef.current.focus();
      return false;
    } else if (refs.departDayRef.current.value === "default") {
      setErr({ ...err, departDay: "출발일을 선택해주세요." });
      refs.departDayRef.current.focus();
      return false;
    }
    return true;
  };

  const handleCheckIn = (e) => {
    e.preventDefault();
    if (validate()) {
      setErr("");
      const id = localStorage.getItem("user_id");
      axios
        .post("http://localhost:9000/chatbot/checkCheckIn", {
          id: id,
          rnum: form.rnum,
        })
        .then((res) => {
          if (res.data.result === 1) {
            navigate("/mypage/checkIn");
          } else {
            alert(
              "예약번호로 일치하는 예약이 없습니다. 확인 후 다시 시도해주세요.",
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const TodayFull = year + "." + month + "." + day;

  const tomorrowDate = new Date();
  tomorrowDate.setDate(today.getDate() + 1);
  const tomorrow = `${tomorrowDate.getFullYear()}.${("0" + (tomorrowDate.getMonth() + 1)).slice(-2)}.${("0" + tomorrowDate.getDate()).slice(-2)}`;

  const dayAfterDate = new Date();
  dayAfterDate.setDate(today.getDate() + 2);
  const dayAfter = `${dayAfterDate.getFullYear()}.${("0" + (dayAfterDate.getMonth() + 1)).slice(-2)}.${("0" + dayAfterDate.getDate()).slice(-2)}`;

  return (
    <form onSubmit={handleCheckIn}>
      <div className="main-top-search-bottom2">
        <ul>
          <li>
            <label htmlFor="">진에어 예약번호</label>
            <input
              type="text"
              name="rnum"
              onChange={handleData}
              ref={refs.rnumRef}
              placeholder="숫자와 영문으로 조합된 6자리"
            />
            {err.rnum ? (
              <p style={{ color: "red" }} ref={rnumErr}>
                {err.rnum}
              </p>
            ) : (
              <p>흠</p>
            )}
          </li>
          <li>
            <label htmlFor="">성(LAST NAME)</label>
            <input
              type="text"
              name="lastNm"
              ref={refs.lastNmRef}
              onChange={handleData}
            />
            {err.lastNm ? (
              <p style={{ color: "red" }} ref={lastErr}>
                {err.lastNm}
              </p>
            ) : (
              <p>흠</p>
            )}
          </li>
          <li>
            <label htmlFor="">이름(FIRST NAME)</label>
            <input
              type="text"
              name="firstNm"
              ref={refs.firstNmRef}
              onChange={handleData}
            />
            {err.firstNm ? (
              <p style={{ color: "red" }} ref={firstErr}>
                {err.firstNm}
              </p>
            ) : (
              <p>흠</p>
            )}
          </li>
          <li>
            <label htmlFor="">출발일</label>
            <select
              name="departDay"
              ref={refs.departDayRef}
              onChange={handleData}
            >
              <option value="default">선택</option>
              <option value={TodayFull}>{TodayFull}</option>
              <option value={tomorrow}>{tomorrow}</option>
              <option value={dayAfter}>{dayAfter}</option>
            </select>
            {err.departDay ? (
              <p style={{ color: "red" }} ref={departErr}>
                {err.departDay}
              </p>
            ) : (
              <p>흠</p>
            )}
          </li>
        </ul>
        <div>
          <ul>
            <li>
              * 예약 시 입력한 승객명을 입력해주세요. (국내선 국문 예약은 국문
              성/이름, 국제선은 영문 성/이름)
            </li>
            <li>* 공동운항 승객께서는 여기를 클릭하여 주세요.</li>
          </ul>
          <button type="submit">조회</button>
        </div>
      </div>
    </form>
  );
}
