import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRightArrowLeft,
  FaEquals,
  FaAngleUp,
  FaAngleDown,
  FaRegSquareCheck,
  FaSquareCheck,
  FaArrowRightLong,
  FaPlus,
} from "react-icons/fa6";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { setTotalPaymentPrice } from "../../features/booking/paymentSlice.js";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import BookingStep from "../../component/booking/BookingStep.jsx";
import BookingPaymentAgree from "./BookingPaymentAgree.jsx";
import axios from "axios";

export default function BookingPayment() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const { resevationType } = useSelector((state) => state.booking);
  const backFlightNum = useSelector((state) => state.booking.backFlightNum);
  const goFlightNum = useSelector((state) => state.booking.goFlightNum);
  const ticketPrice = useSelector((state) => state.booking.ticketPrice); // 편도
  const {
    goTicketPrice,
    backTicketPrice,
    // goSeatType,
    // backSeatType 좌석번호 생기면 변경 예정
  } = useSelector((state) => state.booking);

  const flightNum = useSelector((state) => state.booking.flightNum);
  const passengers = useSelector((state) => state.booking.passengers);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const hasCheckedLogin = useRef(false);

  //토탈 프라이스 관련
  // total_payment_price 계산
  useEffect(() => {
    const total_payment_price =
      resevationType === "oneWay"
        ? ticketPrice * passengers.length // 편도 예약 시 ticketPrice 사용
        : goTicketPrice * passengers.length +
          backTicketPrice * passengers.length; // 왕복 예약 시 기존 방식 사용

    console.log(passengers);

    // 계산된 금액을 Redux에 저장
    dispatch(setTotalPaymentPrice(total_payment_price));
  }, [
    goTicketPrice,
    backTicketPrice,
    passengers.length,
    ticketPrice,
    resevationType,
    dispatch,
  ]);

  // 리덕스에서 값 가져오기
  const totalPaymentPrice = useSelector(
    (state) => state.payment.total_payment_price,
  );
  // 날짜 계산 수식
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} 
    ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  const [openStates, setOpenStates] = useState({
    segment1: true,
    segment2: true,
  });

  // 로그인 체크
  useEffect(() => {
    if (hasCheckedLogin.current) return;
    hasCheckedLogin.current = true;

    if (!isLoggedIn) {
      const select = window.confirm(
        "로그인 서비스가 필요합니다. \n로그인 하시겠습니까?",
      );
      select ? nav("/login") : nav("/");
    }
  }, [isLoggedIn]);

  //좌석 관련 체크
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const nums =
          resevationType === "roundTrip"
            ? [goFlightNum, backFlightNum]
            : [flightNum];

        const responses = await Promise.all(
          nums.map((num) =>
            axios.post("http://localhost:9000/payment/flight", {
              flightNum: num,
            }),
          ),
        );

        const flights = responses.map((res) => res.data.flight[0]);
        setSelectedFlights(flights);
      } catch (error) {
        console.error("항공편 조회 실패:", error);
      }
    };

    const shouldFetch =
      resevationType === "roundTrip" ? goFlightNum && backFlightNum : flightNum;

    if (shouldFetch) {
      fetchFlights();
    }
  }, [goFlightNum, backFlightNum, flightNum, resevationType]);

  const toggleList = (segmentKey) => {
    setOpenStates((prev) => ({
      ...prev,
      [segmentKey]: !prev[segmentKey],
    }));
  };

  // 성인/소아 여부 확인 함수
  const calculateAge = (birth) => {
    const birthDate = new Date(birth.replace(/\./g, "-"));
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const orderClick = () => {
    if (Object.values(openStates).slice(-4).includes(false)) {
      alert("이용약관을 모두 동의해주셔야 결제가 가능합니다.");
    } else {
      nav("/booking/afterPayment");
    }
  };

  return (
    <div className="booking-payment">
      <div className="booking-payment-wrap">
        <BookingStep text={"payment"} />
      </div>

      <div className="booking-passenger-contents">
        <p className="booking-page-title">4. 결제 (항공운임/부가서비스 확인)</p>

        {/* 여행 정보 - 편도/왕복에 따른 article 렌더링 */}
        <section className="booking-payment-section">
          {resevationType === "oneWay" ? (
            <article className="payment-agreement-top">
              <h3>
                <p>여행정보</p>
              </h3>
              <div className="noneExtras-warp">
                <div className="noneExtras-icon">
                  <p>
                    <FaArrowRightLong />
                  </p>
                  <p>편도</p>
                </div>
                <div className="noneExtras-way-warp">
                  <div className="noneExtras-way1">
                    <div className="noneExtras-way-title">구간1</div>
                    <div>
                      {selectedFlights[0]?.Departure_location}{" "}
                      {selectedFlights[0]?.D_acode}
                    </div>
                    <BiSolidPlaneTakeOff />
                    <div>
                      {selectedFlights[0]?.Arrive_location}{" "}
                      {selectedFlights[0]?.A_acode}
                    </div>
                    <div>
                      {formatDate(selectedFlights[0]?.Arrive_date)} ~{" "}
                      {formatDate(selectedFlights[0]?.Departure_date)}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <article className="payment-agreement-top">
              <h3>
                <p>여행정보</p>
              </h3>
              <div className="noneExtras-warp">
                <div className="noneExtras-icon">
                  <p>
                    <FaArrowRightArrowLeft />
                  </p>
                  <p>왕복</p>
                </div>
                {/* 구간1 - 가는편 */}
                <div className="noneExtras-way-warp">
                  <div className="noneExtras-way1">
                    <div className="noneExtras-way-title">구간1</div>
                    <div>
                      {selectedFlights[0]?.Departure_location}{" "}
                      {selectedFlights[0]?.D_acode}
                    </div>
                    <BiSolidPlaneTakeOff />
                    <div>
                      {selectedFlights[0]?.Arrive_location}{" "}
                      {selectedFlights[0]?.A_acode}
                    </div>
                    <div>
                      {formatDate(selectedFlights[0]?.Arrive_date)} ~{" "}
                      {formatDate(selectedFlights[0]?.Departure_date)}
                    </div>
                  </div>
                  <div className="noneExtras-way2">
                    <div className="noneExtras-way-title">구간2</div>
                    <div>
                      {selectedFlights[1]?.Departure_location}{" "}
                      {selectedFlights[1]?.D_acode}
                    </div>
                    <BiSolidPlaneTakeOff />
                    <div>
                      {selectedFlights[1]?.Arrive_location}{" "}
                      {selectedFlights[1]?.A_acode}
                    </div>
                    <div>
                      {formatDate(selectedFlights[1]?.Arrive_date)} ~{" "}
                      {formatDate(selectedFlights[1]?.Departure_date)}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          <article className="payment-agreement-bottom">
            <div className="noneExtras-warp2">
              <h3>
                <p>탑승객 정보</p>
              </h3>
            </div>
            <table className="paymentPassenger-info">
              <colgroup>
                <col style={{ width: "200px" }} />
                <col style={{ width: "180px" }} />
                <col style={{ width: "180px" }} />
                <col style={{ width: "250px" }} />
                <col style={{ width: "400px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>성명</th>
                  <th>구분</th>
                  <th>성별</th>
                  <th>생년월일</th>
                  <th>국적</th>
                </tr>
              </thead>
              <tbody>
                {passengers &&
                  passengers.map((passenger, index) => {
                    const age = calculateAge(passenger.birth);
                    return (
                      <tr key={index}>
                        <td>
                          {passenger.kname_first}
                          {passenger.kname_last}
                        </td>
                        <td>{age >= 19 ? "성인" : "소아"}</td>
                        <td>{passenger.gender}</td>
                        <td>{passenger.birth}</td>
                        <td>{passenger.country}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </article>
        </section>
        {/* 항공운임 정보 */}
        <section className="booking-payment-section">
          <article className="payment-tax-warp">
            <h3>
              <p>항공운임 정보</p>
            </h3>
            <div className="payment-table-head">
              <span>구분</span>
              <span>항공운임</span>
              <span>유류할증료</span>
              <span>세금</span>
              <span>합계</span>
            </div>

            <ul>
              {/* 편도일 경우 ticketPrice 사용, 왕복일 경우 goTicketPrice, backTicketPrice 사용 */}
              <li>
                <button
                  type="button"
                  className="payment-table-button"
                  onClick={() => toggleList("segment1")}
                >
                  <span>구간1</span>
                  <span>
                    KRW&nbsp;
                    {(resevationType === "oneWay"
                      ? ticketPrice * 0.75 * passengers.length
                      : goTicketPrice * 0.75 * passengers.length
                    ).toLocaleString()}
                  </span>
                  <span>
                    KRW&nbsp;
                    {(resevationType === "oneWay"
                      ? ticketPrice * 0.15 * passengers.length
                      : goTicketPrice * 0.15 * passengers.length
                    ).toLocaleString()}
                  </span>
                  <span>
                    KRW&nbsp;
                    {(resevationType === "oneWay"
                      ? ticketPrice * 0.1 * passengers.length
                      : goTicketPrice * 0.1 * passengers.length
                    ).toLocaleString()}
                  </span>
                  <span>
                    KRW&nbsp;
                    {(resevationType === "oneWay"
                      ? ticketPrice * passengers.length
                      : goTicketPrice * passengers.length
                    ).toLocaleString()}
                    {openStates.segment1 ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </button>
                <ul>
                  {passengers &&
                    passengers.map((passenger, index) => (
                      <li
                        key={index}
                        className={
                          openStates.segment1
                            ? "payment-table-text"
                            : "payment-table-hide"
                        }
                      >
                        <span>구간1</span>
                        <span>
                          KRW{" "}
                          {(resevationType === "oneWay"
                            ? ticketPrice * 0.75
                            : goTicketPrice * 0.75
                          ).toLocaleString()}
                        </span>
                        <span>
                          KRW{" "}
                          {(resevationType === "oneWay"
                            ? ticketPrice * 0.15
                            : goTicketPrice * 0.15
                          ).toLocaleString()}
                        </span>
                        <span>
                          KRW{" "}
                          {(resevationType === "oneWay"
                            ? ticketPrice * 0.1
                            : goTicketPrice * 0.1
                          ).toLocaleString()}
                        </span>
                        <span>
                          KRW{" "}
                          {(resevationType === "oneWay"
                            ? ticketPrice
                            : goTicketPrice
                          ).toLocaleString()}
                        </span>
                      </li>
                    ))}
                </ul>
              </li>

              {/* 왕복일 경우 구간2 */}
              {resevationType === "roundTrip" && (
                <ul>
                  <li>
                    <button
                      type="button"
                      className="payment-table-button"
                      onClick={() => toggleList("segment2")}
                    >
                      <span>구간2</span>
                      <span>
                        KRW&nbsp;
                        {(
                          backTicketPrice *
                          0.75 *
                          passengers.length
                        ).toLocaleString()}
                      </span>
                      <span>
                        KRW&nbsp;
                        {(
                          backTicketPrice *
                          0.15 *
                          passengers.length
                        ).toLocaleString()}
                      </span>
                      <span>
                        KRW&nbsp;
                        {(
                          backTicketPrice *
                          0.1 *
                          passengers.length
                        ).toLocaleString()}
                      </span>
                      <span>
                        KRW&nbsp;
                        {(backTicketPrice * passengers.length).toLocaleString()}
                        {openStates.segment2 ? <FaAngleDown /> : <FaAngleUp />}
                      </span>
                    </button>
                    <ul>
                      {passengers &&
                        passengers.map((passenger, index) => (
                          <li
                            key={index}
                            className={
                              openStates.segment2
                                ? "payment-table-text"
                                : "payment-table-hide"
                            }
                          >
                            <span>구간2</span>
                            <span>
                              KRW {(backTicketPrice * 0.75).toLocaleString()}
                            </span>
                            <span>
                              KRW {(backTicketPrice * 0.15).toLocaleString()}
                            </span>
                            <span>
                              KRW {(backTicketPrice * 0.1).toLocaleString()}
                            </span>
                            <span>KRW {backTicketPrice.toLocaleString()}</span>
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>
              )}

              {/* 항공운임 합계: 왕복/편도 관계 없이 항상 보이게 */}
              <li className="payment-table-total">
                <div>
                  <strong>항공요금 합계</strong>
                </div>
                <span>
                  KRW&nbsp;
                  {(
                    (resevationType === "oneWay"
                      ? ticketPrice
                      : goTicketPrice) *
                      passengers.length +
                    (resevationType === "roundTrip"
                      ? backTicketPrice * passengers.length
                      : 0)
                  ).toLocaleString()}
                </span>
              </li>
            </ul>
          </article>
        </section>

        {/* 부가서비스 정보 */}
        <section className="booking-payment-section">
          <article>
            <h3>부가서비스 정보</h3>
            <div className="payment-addition-info">
              <div className="addition-table-head">
                <span>구분</span>
                <span>내역</span>
                <span>합계</span>
              </div>

              {/* 추가 서비스 */}
              <div className="payment-addition-warp">
                <table className="payment-addition-table">
                  <colgroup>
                    <col style={{ width: "100%" }} />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>성명</th>
                      <th>내역</th>
                      <th>합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-wrap">
                        <div>
                          <span>부가서비스 신청내역이 없습니다</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="payment-addition-warp">
                <div className="payment-addition-total">
                  <div>
                    <strong>부가서비스 합계</strong>
                  </div>
                  <span>KRW&nbsp;0</span>
                </div>
              </div>
            </div>
          </article>
        </section>
        {/* 결제 가격 안내 */}
        <section className="payment-information">
          <h3>결제정보</h3>
          <article>
            <div className="calc-warp calc-item">
              <span>항공운임</span>
              <strong>KRW&nbsp;{totalPaymentPrice.toLocaleString()}</strong>
            </div>
            <strong className="operation">
              <FaPlus />
            </strong>
            <div className="calc-warp calc-item">
              <span>부가서비스</span>
              <strong>KRW&nbsp;0</strong>
            </div>
            <strong className="operation">
              <FaEquals />
            </strong>
            <div className="calc-warp calc-result">
              <span>총 예상 결제 금액</span>
              <strong>KRW&nbsp;{totalPaymentPrice.toLocaleString()}</strong>
            </div>
          </article>
        </section>

        {/* 이용약관 규정 */}
        <section className="booking-payment-section payment-bottom">
          <BookingPaymentAgree
            openStates={openStates}
            setOpenStates={setOpenStates}
          />
        </section>
        {/* 결제하기  */}
        <div className="order-button" onClick={orderClick}>
          <button>결제진행</button>
        </div>
      </div>
    </div>
  );
}
