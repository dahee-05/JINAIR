import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resetPayment } from "../../features/booking/paymentSlice.js"
import { clearReservation } from '../../features/booking/bookingSlice';

export default function SuccessPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const userInfo = useSelector((state) => state.booking.userInfo);
  const resevationType = useSelector((state) => state.booking.resevationType);
  const backFlightNum = useSelector((state) => state.booking.backFlightNum);
  const goFlightNum = useSelector((state) => state.booking.goFlightNum);
  const flightNum = useSelector((state) => state.booking.flightNum);



  // 승객 정보 가져오기
  const passengers = useSelector((state) => state.booking.passengers);

  // 승객 이름을 공백 없이 배열로 변환
  const passenger_names =
    passengers && passengers.length > 0
      ? passengers.map(
        (passenger) => `${passenger.kname_first}${passenger.kname_last}`
      )
      : []; // 공백 없이 첫 이름과 마지막 이름 결합

  const handlePayment = () => {
    const id = userInfo.id;

    const fnum = resevationType === "roundTrip"
      ? [goFlightNum, backFlightNum].filter(Boolean)
      : [flightNum];

    const payload = {
      id,
      passenger_names,
      fnum,
    };

    console.log("📦 요청 데이터 확인:", payload);

    axios
      .post("http://localhost:9000payment/res", payload)
      .then((res) => {
        const success = res.data?.success;
        const affected = res.data?.data?.[0]?.affectedRows >= 1;

        if (success && affected) {
          alert("예약이 완료되었습니다.");
          nav("/mypage/getReservation");
          dispatch(resetPayment());
          dispatch(clearReservation());
        } else {
          alert("예약 실패");
        }
      })
      .catch((err) => {
        console.error("❌ 예약 중 에러:", err);
        alert("예약 중 오류 발생");
      });
  };


  return (
    <div className="content">
      <div className="wrapper w-100 success-wqarp">
        {isConfirmed ? (
          <div
            className="flex-column align-center confirm-success w-100 max-w-540"
            style={{ display: "flex" }}
          >
            <img
              src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
              width="120"
              height="120"
            />
            <h2 className="title">결제를 완료했어요</h2>
            <div className="response-section w-100">
              <div className="flex justify-between">
                <span className="response-label">결제 금액</span>
                <span id="amount" className="response-text">
                  {amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="response-label">주문번호</span>
                <span id="orderId" className="response-text">
                  {orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="response-label">paymentKey</span>
                <span id="paymentKey" className="response-text">
                  {paymentKey}
                </span>
              </div>
            </div>

            <div className="w-100 button-group">
              <div className="flex" style={{ gap: "16px" }}>
                <a
                  className="btn w-100"
                  href="https://developers.tosspayments.com/sandbox"
                >
                  다시 테스트하기
                </a>
                <a
                  className="btn w-100"
                  href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
                  target="_blank"
                  rel="noopner noreferer"
                >
                  결제 연동 문서가기
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-column align-center confirm-loading w-100 max-w-540">
            <div className="flex-column align-center">
              <img
                src="https://static.toss.im/lotties/loading-spot-apng.png"
                width="120"
                height="120"
              />
              <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
              <h4 className="text-center description">
                결제 승인 버튼을 누르시면 예약이 완료됩니다.
              </h4>
            </div>
            <div className="w-100 payment-button">
              <button className="btn primary w-100" 
              style={{cursor:"pointer"}}
              onClick={handlePayment}>
                결제 승인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
