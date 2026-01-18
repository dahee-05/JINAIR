import React, { useState, useRef, useEffect } from "react";
import { IoAirplane } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountry,
  getChatbotModalOpen,
  getDeparture,
  getArrive,
  getStartDate,
  getTab,
  getSearchTab,
} from "../../../service/searchApi.js";
import axios from "axios";

export default function Airplane() {
  const [country, setCountry] = useState(false);
  const [airNum, setAirNum] = useState(false);
  const [countryClick, setCountryClick] = useState(false);
  const [noneCountryClick, setNoneCountryClick] = useState(false);
  const [airNumClick, setAirNumClick] = useState(false);
  const [noneAirNumClick, setNoneAirNumClick] = useState(false);
  const [airNumber, setAirNumber] = useState("");
  const [airNumStartDate, setAirNumStartDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const airnumRef = useRef(null);
  const airnumDateRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const countryRef = useRef(null);
  const dispatch = useDispatch();
  const [getFlightList, setGetFlightList] = useState([]);
  const countryList = useSelector((state) => state.search.countryList);
  const btnRef = useRef(null);

  useEffect(() => {
    dispatch(getCountry());
  }, []);
  const processedList = countryList.map((item) => item.city.split(" (")[0]);

  const handleAirnumber = (e) => {
    setAirNumber(e.target.value);
  };
  const handleAirnumDate = (e) => {
    setAirNumStartDate(e.target.value);
  };
  const handleStartCountry = () => {
    setStart(startRef.current.value);
  };
  const handleEndCountry = () => {
    setEnd(endRef.current.value);
  };
  const handleCountryDate = (e) => {
    setDate(e.target.value);
  };

  const validateAirnum = () => {
    if (airNumber === "") {
      airnumRef.current.focus();
      return false;
    } else if (airNumStartDate === "") {
      airnumDateRef.current.focus();
      return false;
    }
    return true;
  };
  const validateCountry = () => {
    if (start === "") {
      startRef.current.focus();
      return false;
    } else if (end === "") {
      endRef.current.focus();
      return false;
    } else if (date === "") {
      countryRef.current.focus();
      return false;
    }
    return true;
  };

  const handleAirNum = () => {
    if (validateAirnum()) {
      // 서버에서 있는지 조회
      axios
        .post("http://localhost:9000/chatbot/searchAirplane", {
          airNumber,
          airNumStartDate,
        })
        .then((res) => {
          if (res.data.result === 1) {
            setAirNumClick(true);
            setNoneAirNumClick(false);
            axios
              .post("http://localhost:9000/chatbot/getSchedule", {
                airNumber,
                airNumStartDate,
              })
              .then((res) => setGetFlightList(res.data.result))
              .catch((error) => console.log(error));
          } else {
            setNoneAirNumClick(true);
            setAirNumClick(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCountry = () => {
    if (validateCountry()) {
      axios
        .post("http://localhost:9000/chatbot/searchSchedule", {
          start,
          end,
          date,
        })
        .then((res) => {
          if (res.data.result === 1) {
            setCountryClick(true);
            setNoneCountryClick(false);
            axios
              .post("http://localhost:9000/chatbot/getSchedule", {
                start,
                end,
                date,
              })
              .then((res) => setGetFlightList(res.data.result))
              .catch((error) => console.log(error));
          } else {
            setNoneCountryClick(true);
            setCountryClick(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const exchangeCountry = () => {
    setStart(end);
    setEnd(start);
    axios
      .post("http://localhost:9000/chatbot/searchAirplane", {
        airNumber,
        airNumStartDate,
      })
      .then((res) => {
        if (res.data.result === 1) {
          setAirNumClick(true);
          setNoneAirNumClick(false);
          axios
            .post("http://localhost:9000/chatbot/getSchedule", {
              airNumber,
              airNumStartDate,
            })
            .then((res) => setGetFlightList(res.data.result))
            .catch((error) => console.log(error));
        } else {
          setNoneAirNumClick(true);
          setAirNumClick(false);
        }
      })
      .catch((error) => console.log(error));
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

  useEffect(() => {
    if (airNum && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (country && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (airNumClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (noneAirNumClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (countryClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // 얘를 간단히 쓸수없낭
    // if(){
    //     btnRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
  }, [airNum, country, airNumClick, noneAirNumClick, countryClick]);

  return (
    <div className="airplane-all-box">
      <div className="schedule-all-box">
        <p>출도착조회를 선택하셨습니다. 조회하실 방법을 선택해주세요.</p>
        <div>
          <button
            onClick={() => {
              setAirNum(true);
              setCountry(false);
            }}
          >
            편명으로 조회
          </button>
          <button
            onClick={() => {
              setCountry(true);
              setAirNum(false);
              setAirNumClick(false);
              setNoneAirNumClick(false);
            }}
          >
            출도착지로 조회
          </button>
        </div>
      </div>
      {airNum && (
        <div className="schedule-all-box" ref={btnRef}>
          <div>
            <p>진에어 항공편의 출도착 조회를 도와드릴게요~</p>
            <p>편명과 날짜를 입력해주세요!</p>
          </div>
          <div className="schedule-calendar-check-box">
            <span>편명</span>
            <input
              type="text"
              placeholder="LJ001 형식으로 입력해주세요"
              onChange={handleAirnumber}
              ref={airnumRef}
            />
          </div>
          <div className="schedule-calendar-check-box">
            <span>가는날</span>
            <input
              type="date"
              onChange={handleAirnumDate}
              ref={airnumDateRef}
            />
          </div>
          <div>
            <button
              onClick={() => {
                handleAirNum();
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {airNum && noneAirNumClick && (
        <div className="schedule-all-box" ref={btnRef}>
          <p>
            해당 날짜에 일치하는 출도착 정보가 없습니다. <br />
            다른 날짜, 다른 여행지를 조회 해 보시는건 어떤가요?!
          </p>
        </div>
      )}
      {airNumClick && (
        <div className="airplane-airNumClick" ref={btnRef}>
          <div className="schedule-all-box">
            <p>
              [출발일:{airNumStartDate}, 편명:{airNumber}] <br />
              출도착 정보를 조회하였습니다.
            </p>
            <table>
              <tr>
                <td>
                  {getFlightList.Departure_location}({getFlightList.Dcode})
                </td>
                <td>
                  <IoAirplane className="schedule-exist-top-icon" />
                </td>
                <td>
                  {getFlightList.Arrive_location}({getFlightList.Acode})
                </td>
              </tr>
              <tr>
                <td>스케줄 {getFlightList.Dtime}</td>
                <td></td>
                <td>스케줄 {getFlightList.Atime}</td>
              </tr>
            </table>
          </div>
        </div>
      )}
      {country && (
        <div className="schedule-all-box" ref={btnRef}>
          <div className="schedule-top-box">
            <p>진에어 항공편의 스케줄 조회를 도와드릴게요~</p>
            <p>출발지, 도착지와 가는날을 선택해주세요!</p>
          </div>
          <div className="schedule-country-check-box">
            <span>출발/도착</span>
            <select name="" onChange={handleStartCountry} ref={startRef}>
              <option value="default">선택</option>
              {processedList.map((data) => (
                <option value={data}>{data}</option>
              ))}
            </select>
            <select name="" onChange={handleEndCountry} ref={endRef}>
              <option value="default">선택</option>
              {processedList.map((data) => (
                <option value={data}>{data}</option>
              ))}
            </select>
          </div>
          <div className="schedule-calendar-check-box">
            <span>가는날</span>
            <input type="date" ref={countryRef} onChange={handleCountryDate} />
          </div>
          <div className="schedule-button-box">
            <button
              onClick={() => {
                handleCountry();
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {countryClick && (
        <>
          <div className="schedule-all-box" ref={btnRef}>
            <div className="schedule-exist-box">
              <p>
                [출발일:{date}, 출발지:{getFlightList.Dcode}, 도착지:
                {getFlightList.Acode}] <br />
                스케줄 정보를 조회하였습니다.
              </p>
              <table className="airplane-country-table">
                <tr>
                  <td>
                    {start}({getFlightList.Dcode})
                  </td>
                  <td>
                    <IoAirplane className="schedule-exist-top-icon" />
                  </td>
                  <td>
                    {end}({getFlightList.Acode})
                  </td>
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
                <button
                  onClick={() => {
                    exchangeCountry();
                  }}
                >
                  출도착지 바꾸기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {noneCountryClick && (
        <div className="schedule-all-box">
          <div className="schedule-none-exist-box">
            <p>
              [출발일:{date}, 출발지:{start}, 도착지:{end}] <br />
              일치하는 스케줄 정보가 없습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
