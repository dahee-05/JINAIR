import { axiosGet, axiosPost } from "./api";

import {
  setMyInfo,
  setMyInterest,
  setMyCoupon,
  setCouponCount,
  setCustomTheme,
} from "../features/myinfo/myinfoSlice.js";

// 회원 정보 불러오기
export const getMyInfo = (data) => async (dispatch) => {
  const url = "http://localhost:9000/mypage/getMyInfo";
  const id = localStorage.getItem("user_id");

  const getMyInfoResult = await axiosPost({ url, data: { id } });

  const result_rows = getMyInfoResult.result_rows;

  if (result_rows) {
    dispatch(setMyInfo(result_rows[0]));
  }
};

// 회원정보 업데이트
export const updateMyInfo = (formData) => async (dispatch) => {
  const url = "http://localhost:9000/mypage/updateMyInfo";
  const result = await axiosPost({ url, data: formData });
  if (result.success) {
    dispatch(setMyInfo(result.updatedInfo));
  }
};

// 관심지역 저장

export const updateInterest = (checkList) => async (dispatch) => {
  const url = "http://localhost:9000/mypage/updateInterest";
  const id = localStorage.getItem("user_id");

  const result = await axiosPost({ url, data: { id, checkList } });

  result && dispatch(setMyInterest(checkList));
};

// 관심지역 불러오기
export const getInterest = () => async (dispatch) => {
  const url = "http://localhost:9000/mypage/getInterest";
  const id = localStorage.getItem("user_id");

  const result = await axiosPost({ url, data: { id } });

  if (result && result[0]?.interest_area) {
    dispatch(setMyInterest(result[0].interest_area));
  } else {
    dispatch(setMyInterest([]));
  }
};

// 나의 사용가능 쿠폰 불러오기
export const getMyCoupon = () => async (dispatch) => {
  const url = "http://localhost:9000/mypage/getMyCoupon";
  const id = localStorage.getItem("user_id");

  const result = await axiosPost({ url, data: { id } });

  result && dispatch(setMyCoupon(result));
};

// 나의 쿠폰 카운트
export const couponCount = () => async (dispatch) => {
  const url = "http://localhost:9000/mypage/couponCount";
  const id = localStorage.getItem("user_id");

  const result = await axiosPost({ url, data: { id } });

  result && dispatch(setCouponCount(result));
};

// 나의 쿠폰 사용 처리 (사용처: 결제 페이지)
// 사용 테스트 MyCoupon.jsx에서 해봤음 해당 부분 주석 처리 되어있음(버튼) 참고할 것
// 테스트 함수 : handleUseCoupon
// 쿠폰 하나만 적용하여 사용하는 로직으로 쿠폰 2개 이상 선택할 시에는 리듀서 추가해야함

// export const applyCoupon = (couponCode) => async (dispatch) => {
//     const url = 'http://localhost:9000/mypage/applyCoupon';
//     const id = localStorage.getItem("user_id");

//     const result = await axiosPost({ url, data: { id, couponCode } });

//      if (result && result[0]) {
//         dispatch(setCouponCount(result[0].coupon_count));
//     }
//   };

export const applyCoupon = (couponCode) => async (dispatch) => {
  const url = "http://localhost:9000/mypage/applyCoupon";
  const id = localStorage.getItem("user_id");

  const result = await axiosPost({ url, data: { id, couponCode } });

  if (result && result[0]) {
    dispatch(setCouponCount(result[0].coupon_count));

    // 쿠폰 다시 불러오기
    const refreshUrl = "http://localhost:9000/mypage/getMyCoupon";
    const refreshResult = await axiosPost({ url: refreshUrl, data: { id } });

    if (refreshResult) {
      dispatch(setMyCoupon(refreshResult));
    }
  }
};

// 맞춤 항공권 정보 (테마별)

export const customTheme = (category) => async (dispatch) => {
  const url = "http://localhost:9000/mypage/customTheme";
  const result = await axiosPost({ url, data: { category } });
  if (result) dispatch(setCustomTheme(result));
};

// 맞춤 항공권 정보 (유저 설정 관심지역)
export const customArea = async () => {
  const id = localStorage.getItem("user_id");
  const url = "http://localhost:9000/mypage/customArea";

  const result = await axiosPost({ url, data: { id } });
  return result;
};
