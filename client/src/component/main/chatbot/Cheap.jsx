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
  getAdultNum,
  getPediatricNum,
  getBabyNum,
  getEndDate,
} from "../../../service/searchApi.js";
import axios from "axios";
export default function Cheap() {
  const [dateSelect, setDateSelect] = useState(false);
  const [period, setPeriod] = useState(false);
  const [oneway, setOneway] = useState(false);
  const [roundtrip, setRoundtrip] = useState(false);
  const [onewayClick, setOnewayClick] = useState(false);
  const [roundtripClick, setRoundtripClick] = useState(false);
  const [start, setStart] = useState(""); // 편도
  const [end, setEnd] = useState(""); // 편도
  const [date, setDate] = useState(""); // 편도
  const [endDate, setEndDate] = useState(""); // 왕복
  const [adult, setAdult] = useState(1); // 편도
  const [child, setChild] = useState(0); // 편도
  const [baby, setBaby] = useState(0); // 편도
  const [onewayNone, setOnewayNone] = useState(false); // 편도
  const [peopleClick, setPeopleClick] = useState(false); // 편도
  const [peopleRoundClick, setPeopleRoundClick] = useState(false); // 왕복
  const [onewayScheduleClick, setOneWayScheduleClick] = useState(false);
  const [lastRoundtripClick, setLastRoundtripClick] = useState(false);
  const [roundNone, setRoundNone] = useState(false); // 왕복
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.search.countryList);
  const processedList = countryList.map((item) => item.city.split(" (")[0]);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const dateRef = useRef(null);
  const endDateRef = useRef(null);
  const adultRef = useRef(null);
  const childRef = useRef(null);
  const babyRef = useRef(null);
  const btnRef = useRef(null);
  const [getFlightList, setGetFlightList] = useState([]);

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  const handleStart = () => {
    setStart(startRef.current.value);
  };
  const handleEnd = () => {
    setEnd(endRef.current.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };
  const vali = () => {
    if (start === "") {
      startRef.current.focus();
      return false;
    } else if (end === "") {
      endRef.current.focus();
      return false;
    } else if (date === "") {
      dateRef.current.focus();
      return false;
    } else if (endDate === "") {
      endDateRef.current.focus();
      return false;
    }
    return true;
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
  const handleAdult = () => {
    setAdult(adultRef.current.value);
  };
  const handleChild = () => {
    setChild(childRef.current.value);
  };
  const handleBaby = () => {
    setBaby(babyRef.current.value);
  };
  const ScheduleCheck = () => {
    if (validate()) {
      axios
        .post("http://localhost:9000/chatbot/searchSchedule", {
          start,
          end,
          date,
        })
        .then((res) => {
          if (res.data.result === 1) {
            setOnewayClick(true);
          } else {
            setOnewayNone(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const ScheduleCheckRound = () => {
    // 왕복
    if (vali()) {
      axios
        .post("http://localhost:9000/chatbot/searchSchedule", {
          start,
          end,
          date,
          endDate,
        })
        .then((res) => {
          if (res.data.result === 1) {
            setRoundtripClick(true);
          } else {
            setRoundNone(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const exchangeCountryOneWay = () => {
    setStart(end);
    setEnd(start);
    axios
      .post("http://localhost:9000/chatbot/searchMonthCheap", {
        start,
        end,
        date,
      })
      .then((res) => {
        // if (res.data.result === 1) {
        setGetFlightList(res.data.result);
        setOneWayScheduleClick(true);
      })
      .catch((error) => console.log(error));
  };
  const handleClearOneWay = () => {
    setOneWayScheduleClick(false);
    setOnewayClick(false);
    setOneway(false);
    setDateSelect(false);
    setPeopleRoundClick(false);
    setLastRoundtripClick(false);
    setRoundtripClick(false);
  };

  const peopleList = [
    {
      name: "성인",
      ref: adultRef,
      onChange: handleAdult,
      value: "1",
      count: "1",
    },
    {
      name: "어린이",
      ref: childRef,
      onChange: handleChild,
      value: "default",
      count: "선택",
    },
    {
      name: "유아",
      ref: babyRef,
      onChange: handleBaby,
      value: "default",
      count: "선택",
    },
  ];

  const handleOneway = () => {
    axios
      .post("http://localhost:9000/chatbot/searchMonthCheap", {
        start,
        end,
        date,
      })
      .then((res) => {
        // if (res.data.result === 1) {
        setGetFlightList(res.data.result);
        setOneWayScheduleClick(true);
      })
      .catch((error) => console.log(error));
  };
  const handleRoundTrip = () => {
    axios
      .post("http://localhost:9000/chatbot/searchMonthCheap", {
        start,
        end,
        date,
      })
      .then((res) => {
        // if (res.data.result === 1) {
        setGetFlightList(res.data.result);
        setLastRoundtripClick(true);
      })
      .catch((error) => console.log(error));
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const onewayReservation = () => {
    dispatch(getChatbotModalOpen(false));
    dispatch(getDeparture(start));
    dispatch(getArrive(end));
    dispatch(getStartDate(date));
    dispatch(getTab("main"));
    dispatch(getSearchTab("oneWay"));
    dispatch(getAdultNum(adult));
    dispatch(getPediatricNum(child));
    dispatch(getBabyNum(baby));
  };

  const RoundReservation = () => {
    dispatch(getChatbotModalOpen(false));
    dispatch(getDeparture(start));
    dispatch(getArrive(end));
    dispatch(getStartDate(date));
    dispatch(getEndDate(endDate));
    dispatch(getTab("main"));
    dispatch(getSearchTab("roundTrip"));
    dispatch(getAdultNum(adult));
    dispatch(getPediatricNum(child));
    dispatch(getBabyNum(baby));
  };
  useEffect(() => {
    if (period && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (dateSelect && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (roundtripClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (roundtrip && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (peopleRoundClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (lastRoundtripClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (oneway && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (onewayClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (peopleClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (onewayScheduleClick && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (onewayNone && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (roundNone && btnRef.current) {
      btnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    period,
    dateSelect,
    roundtripClick,
    roundtrip,
    peopleRoundClick,
    lastRoundtripClick,
    oneway,
    onewayClick,
    peopleClick,
    onewayScheduleClick,
    onewayNone,
    roundNone,
  ]);

  return (
    <div className="cheap-all-box">
      <div>
        <p>
          최저가조회를 선택하셨습니다!
          <br />
          아래에서 검색방법을 선택해 주세요!
        </p>
        <div className="schedule-button-box">
          <button
            onClick={() => {
              setDateSelect(true);
              setPeriod(false);
            }}
          >
            날짜지정조회
          </button>
          <button
            onClick={() => {
              setPeriod(true);
              setDateSelect(false);
            }}
          >
            기간지정조회
          </button>
        </div>
      </div>
      {period && (
        <div className="schedule-all-box" ref={btnRef}>
          <p>
            항공권 구매를 선택하셨습니다!
            <br />
            아래에서 ‘편도’, '왕복’중 여정을 선택해주세요 ^^
          </p>
          <div className="cheap-button-box">
            <button
              onClick={() => {
                setOneway(true);
              }}
            >
              편도
            </button>
            <button
              onClick={() => {
                setRoundtrip(true);
              }}
            >
              왕복
            </button>
          </div>
        </div>
      )}
      {dateSelect && ( //날짜지정조회 클릭시
        <>
          <div ref={btnRef}>
            <p>
              항공권 구매를 선택하셨습니다!
              <br />
              아래에서 여정을 선택해주세요 ^^
            </p>
            <div className="cheap-button-box">
              <button
                onClick={() => {
                  setOneway(true);
                }}
              >
                편도
              </button>
              <button
                onClick={() => {
                  setRoundtrip(true);
                }}
              >
                왕복
              </button>
            </div>
          </div>
        </>
      )}
      {roundtrip && ( //왕복클릭시
        <>
          <div ref={btnRef} className="schedule-all-box">
            <p>츨/도착지와 날짜를 선택해주세요!</p>
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
            <div className="schedule-calendar-check-box">
              <span>오는날</span>
              <input type="date" ref={endDateRef} onChange={handleEndDate} />
            </div>
            <div className="cheap-button-box">
              <button
                onClick={() => {
                  ScheduleCheckRound();
                }}
              >
                확인
              </button>
            </div>
          </div>
          {roundNone && (
            <div className="schedule-all-box" ref={btnRef}>
              <div className="schedule-none-exist-box">
                <p>
                  출발지:{start}&nbsp;&nbsp;도착지:{end} <br />
                  출발일:{date}&nbsp;&nbsp;도착일:{endDate}&nbsp;&nbsp; <br />
                  일치하는 스케줄 정보가 없습니다.
                </p>
              </div>
            </div>
          )}
          {roundtripClick && ( //확인클릭시
            <div className="schedule-all-box" ref={btnRef}>
              <p>예약 인원을 선택해 주세요</p>
              <ul>
                {peopleList.map((item) => (
                  <li>
                    <label htmlFor="">{item.name}</label>
                    <select onChange={item.onChange} ref={item.ref}>
                      <option value={item.value}>{item.count}</option>
                      {list.map((num) => (
                        <option value={num}>{num}</option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
              <div className="cheap-button-box">
                <button
                  onClick={() => {
                    setPeopleRoundClick(true);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          )}
          {peopleRoundClick && ( //확인 클릭시
            <div className="schedule-all-box" ref={btnRef}>
              <ul>
                <li>▣ 가는 항공편</li>
                <li>
                  ◈ 경로 : {start} &#10132; {end}
                </li>
                <li>◈ 출발일 : {date}</li>
                <li>▣ 오는 항공편</li>
                <li>
                  ◈ 경로 : {end} &#10132; {start}
                </li>
                <li>◈ 출발일 : {endDate}</li>
                <li>▣ 탑승인원</li>
                <li>⊙ 성인 : {adult}명</li>
                <li>⊙ 소아 : {child}명</li>
                <li>⊙ 유아 : {baby}명</li>
              </ul>
              <p>
                입력하신 정보가 맞는지 확인 해주세요~
                <br />
                잘못 입력하셨다면 처음으로 돌아갑니다.
              </p>
              <div className="cheap-button-box">
                <button
                  onClick={() => {
                    handleRoundTrip();
                  }}
                >
                  예
                </button>
                <button
                  onClick={() => {
                    handleClearOneWay();
                  }}
                >
                  아니오
                </button>
                <button onClick={exchangeCountryOneWay}>출도착지 바꾸기</button>
              </div>
            </div>
          )}
          {lastRoundtripClick && ( //예 클릭시
            <div className="schedule-all-box" ref={btnRef}>
              <div className="cheap-round-before-select">
                <span>
                  가는날 : <span>{date}</span>
                </span>
                <span>
                  오는날 : <span>{endDate}</span>
                </span>
              </div>
              <div>
                <span>{start}</span>
                <IoAirplane className="cheap-icon" />
                <span>{end}</span>
              </div>
              <div>
                성인 {adult}명, 소아{child}명, 유아{baby}명
              </div>
              <div className="cheap-reservation">
                <div>
                  <ul>
                    <li>
                      <span>항공운임</span>
                      <span>
                        {(
                          getFlightList.basic_price * adult +
                          getFlightList.basic_price * child +
                          getFlightList.basic_price * baby
                        ).toLocaleString()}
                        원
                      </span>
                    </li>
                    <li>
                      <span>유류할증료 + 세금</span>
                      <span>
                        {(getFlightList.basic_price * 0.1).toLocaleString()}원
                      </span>
                    </li>
                    <li>
                      <span>총 금액</span>
                      <span>
                        {(
                          getFlightList.basic_price * adult +
                          getFlightList.basic_price * child +
                          getFlightList.basic_price * baby +
                          getFlightList.basic_price * 0.1
                        ).toLocaleString()}
                        원
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <button
                    onClick={() => {
                      RoundReservation();
                      scrollToTop();
                    }}
                  >
                    예약하기
                  </button>
                </div>
              </div>
              <p>
                *상기 운임은 참고사항으로, 공항 사정이나 일정에 따라 수시로 변동
                될 수 있습니다.
              </p>
              <div className="cheap-cheap-month">
                <h5>{getFlightList.month} 최저가</h5>
                <div className="cheap-cheap-month-middle">
                  <div>
                    <ul>
                      <li>
                        {getFlightList.date} ~ {getFlightList.endDate}
                      </li>
                      <li>성인 1명 기준</li>
                      <li>{getFlightList.basic_price.toLocaleString()}원</li>
                      <li>(항공운임, 유류할증료, 세금 포함 금액)</li>
                    </ul>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        RoundReservation();
                        scrollToTop();
                      }}
                    >
                      예약하기
                    </button>
                  </div>
                </div>
                <div className="cheap-round-desc">
                  <p>
                    월별 최저가 운임은 성인 1인 기준으로, 여러 좌석 예매를 진행
                    하실 경우 남은 좌석에 따라 운임이 변동 될 수 있습니다. 또한
                    동일한 운임이 있을 경우 가장 가까운 날짜를 알려드립니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {oneway && ( //편도클릭시
        <>
          <div className="schedule-all-box" ref={btnRef}>
            <p>츨/도착지와 날짜를 선택해주세요!</p>
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
            <div className="cheap-button-box">
              <button
                onClick={() => {
                  ScheduleCheck();
                }}
              >
                확인
              </button>
            </div>
          </div>
          {onewayNone && (
            <div className="schedule-all-box" ref={btnRef}>
              <div className="schedule-none-exist-box">
                <p>
                  [출발일:{date}&nbsp;&nbsp;출발지:{start}&nbsp;&nbsp;도착지:
                  {end}] <br />
                  일치하는 스케줄 정보가 없습니다.
                </p>
              </div>
            </div>
          )}
          {onewayClick && ( //확인클릭시
            <div className="schedule-all-box" ref={btnRef}>
              <p>예약 인원을 선택해 주세요</p>
              <ul>
                {peopleList.map((item) => (
                  <li>
                    <label htmlFor="">{item.name}</label>
                    <select onChange={item.onChange} ref={item.ref}>
                      <option value={item.value}>{item.count}</option>
                      {list.map((num) => (
                        <option value={num}>{num}</option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
              <div className="cheap-button-box">
                <button
                  onClick={() => {
                    setPeopleClick(true);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          )}
          {peopleClick && ( //확인 클릭시
            <div className="schedule-all-box" ref={btnRef}>
              <ul>
                <li>▣ 가는 항공편</li>
                <li>
                  ◈ 경로 : {start}&#10132;{end}
                </li>
                <li>◈ 출발일 : {date}</li>
                <li>▣ 탑승인원</li>
                <li>⊙ 성인 : {adult}명</li>
                <li>⊙ 소아 : {child}명</li>
                <li>⊙ 유아 : {baby}명</li>
              </ul>
              <p>
                입력하신 정보가 맞는지 확인 해주세요~
                <br />
                잘못 입력하셨다면 처음으로 돌아갑니다.
              </p>
              <div className="cheap-button-box">
                <button onClick={handleOneway}>예</button>
                <button
                  onClick={() => {
                    handleClearOneWay();
                  }}
                >
                  아니오
                </button>
                <button onClick={exchangeCountryOneWay}>출도착지 바꾸기</button>
              </div>
            </div>
          )}
          {onewayScheduleClick && ( //예 클릭시
            <div className="schedule-all-box" ref={btnRef}>
              <div>
                <span>
                  출발일 : <span>{date}</span>
                </span>
              </div>
              <div>
                <span>{start}</span>
                <IoAirplane className="cheap-icon" />
                <span>{end}</span>
              </div>
              <div>
                성인 {adult}명, 소아{child}명, 유아{baby}명
              </div>
              <div className="cheap-reservation">
                <div>
                  <ul>
                    <li>
                      <span>항공운임</span>
                      <span>
                        {(
                          getFlightList.basic_price * adult +
                          getFlightList.basic_price * child +
                          getFlightList.basic_price * baby
                        ).toLocaleString()}
                        원
                      </span>
                    </li>
                    <li>
                      <span>유류할증료 + 세금</span>
                      <span>
                        {(getFlightList.basic_price * 0.1).toLocaleString()}원
                      </span>
                    </li>
                    <li>
                      <span>총 금액</span>
                      <span>
                        {(
                          getFlightList.basic_price * adult +
                          getFlightList.basic_price * child +
                          getFlightList.basic_price * baby +
                          getFlightList.basic_price * 0.1
                        ).toLocaleString()}
                        원
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <button
                    onClick={() => {
                      onewayReservation();
                      scrollToTop();
                    }}
                  >
                    예약하기
                  </button>
                </div>
              </div>
              <p>
                *상기 운임은 참고사항으로, 공항 사정이나 일정에 따라 수시로 변동
                될 수 있습니다.
              </p>
              <div className="cheap-cheap-month">
                <h5>{getFlightList.month} 최저가</h5>
                <div className="cheap-cheap-month-middle">
                  <div>
                    <ul>
                      <li>{getFlightList.date}</li>
                      <li>성인 1명 기준</li>
                      <li>{getFlightList.basic_price.toLocaleString()}원</li>
                      <li>(항공운임, 유류할증료, 세금 포함 금액)</li>
                    </ul>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        onewayReservation();
                        scrollToTop();
                      }}
                    >
                      예약하기
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  월별 최저가 운임은 성인 1인 기준으로, 여러 좌석 예매를 진행
                  하실 경우
                  <br /> 남은 좌석에 따라 운임이 변동 될 수 있습니다. 또한
                  동일한 운임이 있을 경우
                  <br /> 가장 가까운 날짜를 알려드립니다.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
