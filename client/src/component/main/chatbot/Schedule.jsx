import React, { useRef, useState, useEffect } from "react";
import { IoAirplane } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getCountry } from "../../../service/searchApi.js";
import axios from "axios";
import {
  getChatbotModalOpen,
  getDeparture,
  getArrive,
  getStartDate,
  getTab,
  getSearchTab,
} from "../../../service/searchApi.js";

export default function Schedule() {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [scheduleExist, setScheduleExist] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [getFlightList, setGetFlightList] = useState([]);
  const resultRef = useRef(null); // 👈 결과 영역 참조용
  const countryList = useSelector((state) => state.search.countryList);

  useEffect(() => {
    dispatch(getCountry());
  }, []);
  console.log(countryList);

  useEffect(() => {
    if (click && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [click]);

  const processedList = countryList.map((item) => item.city.split(" (")[0]);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const dateRef = useRef(null);

  const handleStart = () => {
    setStart(startRef.current.value);
  };
  const handleEnd = () => {
    setEnd(endRef.current.value);
  };

  const changeCountry = () => {
    setStart(end);
    setEnd(start);
    axios
      .post("http://localhost:9000/chatbot/searchSchedule", {
        start,
        end,
        date,
      })
      .then((res) => {
        if (res.data.result === 1) {
          setClick(true);
          axios
            .post("http://localhost:9000/chatbot/getSchedule", {
              start,
              end,
              date,
            })
            .then((res) => setGetFlightList(res.data.result))
            .catch((error) => console.log(error));
        } else {
          setClick(false);
          setScheduleExist(true);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const validate = () => {
    if (start === "") {
      startRef.current.focus();
      return false;
    } else if (end === "") {
      endRef.current.focus();
      return false;
    } else if (date === "") {
      dateRef.current.focus();
      return false;
    }
    return true;
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const reservation = () => {
    dispatch(getChatbotModalOpen(false));
    dispatch(getDeparture(start));
    dispatch(getArrive(end));
    dispatch(getStartDate(date));
    dispatch(getTab("main"));
    dispatch(getSearchTab("oneWay"));
  };

  const ScheduleCheck = () => {
    if (validate()) {
      // 스케쥴이 잇으면
      axios
        .post("http://localhost:9000/chatbot/searchSchedule", {
          start,
          end,
          date,
        })
        .then((res) => {
          if (res.data.result === 1) {
            setClick(true);
            axios
              .post("http://localhost:9000/chatbot/getSchedule", {
                start,
                end,
                date,
              })
              .then((res) => setGetFlightList(res.data.result))
              .catch((error) => console.log(error));
          } else {
            setClick(false);
            setScheduleExist(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="schedule-all-box" ref={resultRef}>
        <div className="schedule-top-box">
          <p>진에어 항공편의 스케줄 조회를 도와드릴게요~</p>
          <p>출발지, 도착지와 가는날을 선택해주세요!</p>
        </div>
        <div className="schedule-country-check-box">
          <span>출발/도착</span>
          <select ref={startRef} name="" id="" onChange={handleStart}>
            <option value="default">선택</option>
            {processedList.map((data) => (
              <option value={data}>{data}</option>
            ))}
          </select>
          <select ref={endRef} name="" id="" onChange={handleEnd}>
            <option value="default">선택</option>
            {processedList.map((data) => (
              <option value={data}>{data}</option>
            ))}
          </select>
        </div>
        <div className="schedule-calendar-check-box">
          <span>가는날</span>
          <input ref={dateRef} type="date" onChange={handleDate} />
        </div>
        <div className="schedule-button-box">
          <button
            onClick={() => {
              ScheduleCheck();
            }}
          >
            확인
          </button>
        </div>
      </div>
      {click && ( // 스케줄정보 있을때
        <div className="schedule-all-box">
          <>
            <div className="schedule-exist-box">
              <p>
                [출발일:{date}, 출발지:{getFlightList.Dcode}, 도착지:
                {getFlightList.Acode}] <br />
                스케줄 정보를 조회하였습니다.
              </p>
              <table>
                <tr>
                  <td>{start}</td>
                  <td>
                    <IoAirplane className="schedule-exist-top-icon" />
                  </td>
                  <td>{end}</td>
                </tr>
                <tr>
                  <td>편명</td>
                  <td>출발</td>
                  <td>도착</td>
                </tr>
                <tr>
                  <td>{getFlightList.fnum}</td>
                  <td>{getFlightList.Dtime}</td>
                  <td>{getFlightList.Atime}</td>
                </tr>
              </table>
              <div>화면에 표시되는 시각은 현지 시각 기준입니다.</div>
              <div>
                <button
                  onClick={() => {
                    reservation();
                    scrollToTop();
                  }}
                >
                  예약하기
                </button>
                <button onClick={changeCountry}>출도착지 바꾸기</button>
              </div>
              {/* 여기서 예약하기 누르면 그냥 메인페이지로 넘어감 ( 이거 좀 바꿀필요가잇다고 생각)
               */}
            </div>
          </>
        </div>
      )}
      {scheduleExist && !click && (
        <div className="schedule-all-box">
          <div className="schedule-none-exist-box">
            <p>
              [출발일:{date}&nbsp;&nbsp;출발지:{start}&nbsp;&nbsp;도착지:{end}]{" "}
              <br />
              일치하는 스케줄 정보가 없습니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
