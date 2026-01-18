import { axiosPost } from "./api.js";
import {
  setTicketList,
  setResevationType,
  setFlightNum,
  setSeatType,
  setTicketPrice,
  setDcode,
  setAcode,
  setOneWayBseats,
  setOneWayPseats,
  setOneWaySeats,
  setGoFlightNum,
  setGoSeatType,
  setGoTicketPrice,
  setGoSeats,
  setBackFlightNum,
  setBackSeatType,
  setBackTicketPrice,
  setBackSeats,
  setUserInfo,
  setPassengers,
} from "../features/booking/bookingSlice.js";

/*****************************
 * 항공권 선택 페이지
 * 예약 가능 항공권 조회
 *****************************/
export const getOnewayList =
  (departure, arrive, startDate) => async (dispatch) => {
    const url = "http://localhost:9000/booking/availability";
    const data = { departure: departure, arrive: arrive, startDate: startDate };

    const result = await axiosPost({ url, data });
    const dcode = result.A_acode;
    const acode = result.D_acode;

    dispatch(setTicketList({ result }));
    dispatch(setDcode({ dcode }));
    dispatch(setAcode({ acode }));
  };

/*****************************
 * 항공권 선택 페이지(편도)
 * BookingOneWay
 * 비행편, 좌석 타입, 가격 전역 저장
 *****************************/
export const setFlightInfo =
  (resevationType, fnum, seatType, seatPrice) => async (dispatch) => {
    dispatch(setResevationType(resevationType));
    dispatch(setFlightNum(fnum));
    dispatch(setSeatType(seatType));
    dispatch(setTicketPrice(seatPrice));
  };

/*****************************
 * 항공권 선택 페이지(왕복 - 가는 편)
 * BookingGo
 * 가는 비행편, 좌석 타입, 가격 전역 저장
 *****************************/
export const setGoFlightInfo =
  (resevationType, fnum, seatType, seatPrice) => async (dispatch) => {
    dispatch(setResevationType(resevationType));
    dispatch(setGoFlightNum(fnum));
    dispatch(setGoSeatType(seatType));
    dispatch(setGoTicketPrice(seatPrice));
  };

/*****************************
 * 항공권 선택 페이지(왕복 - 오는 편)
 * BookingBack
 * 오는 비행편, 좌석 타입, 가격 전역 저장
 *****************************/
export const setBackFlightInfo =
  (resevationType, fnum, seatType, seatPrice) => async (dispatch) => {
    dispatch(setResevationType(resevationType));
    dispatch(setBackFlightNum(fnum));
    dispatch(setBackSeatType(seatType));
    dispatch(setBackTicketPrice(seatPrice));
  };

/*****************************
 * 예매자 정보 호출
 * BookingPassengerForm
 *****************************/
export const getUserInfo = () => async (dispatch) => {
  const id = localStorage.getItem("user_id");
  const url = "http://localhost:9000/booking/user";
  const data = { id: id };

  const result = await axiosPost({ url, data });
  const userInfo = result.result;

  dispatch(setUserInfo({ userInfo }));
};

/*****************************
 * 좌석 배열 호출
 * BookingSelectSeat
 *****************************/
export const getSeats = (fnum) => async (dispatch) => {
  const url = "http://localhost:9000/booking/seats";
  const data = { fnum: fnum };

  const result = await axiosPost({ url, data });
  const basicList = result.result.basic_seats;
  const premiumList = result.result.premium_seat;

  dispatch(setOneWayBseats({ basicList }));
  dispatch(setOneWayPseats({ premiumList }));
};

/*****************************
 * 탑승객 정보 저장
 * BookingPassenger
 *****************************/
export const setPassengerInfo = (arr) => async (dispatch) => {
  dispatch(setPassengers(arr));
};

/*****************************
 * 선택 좌석 저장(편도)
 * BookingSelectSeat
 *****************************/
export const setOnewaySeatList = (arr) => async (dispatch) => {
  dispatch(setOneWaySeats(arr));
};

/*****************************
 * 선택 좌석 저장(왕복 가는 편)
 * BookingGoSelectSeat
 *****************************/
export const setGoSeatList = (arr) => async (dispatch) => {
  dispatch(setGoSeats(arr));
};

/*****************************
 * 선택 좌석 저장(왕복 가는 편)
 * BookingBackSelectSeat
 *****************************/
export const setBackSeatList = (arr) => async (dispatch) => {
  dispatch(setBackSeats(arr));
};
