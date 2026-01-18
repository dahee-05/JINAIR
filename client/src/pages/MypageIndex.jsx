import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../scss/ryeong.scss";
import { useNavigate } from "react-router-dom";
import { getMyInfo, getInterest, couponCount } from "../service/myinfoApi.js";
import { Modal } from "antd";
import MyCoupon from "../component/mypage/MyCoupon.jsx";
import MypageNavigation from "../component/mypage/MypageNavigation.jsx";

export default function MypageIndex() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const myinfo = useSelector((state) => state.myinfo.myinfo); // 로그인 유저 정보
  const interestArea = useSelector((state) => state.myinfo.myinterest);
  const myCouponCnt = useSelector((state) => state.myinfo.couponcount);

  /* 정보 불러오기 */
  useEffect(() => {
    console.log("불러온 회원 정보:", myinfo);
    if (isLoggedIn) {
      dispatch(getMyInfo()); // 유저 정보
      dispatch(getInterest()); // 나의 관심 지역
      dispatch(couponCount()); // 쿠폰 카운트
    } else {
      const select = window.confirm(
        "로그인 서비스가 필요합니다. \n로그인 하시겠습니까?",
      );
      select ? navigate("/login") : navigate("/");
    }
  }, []);

  /* 할인 쿠폰 모달 */
  const [couponModalOpen, setCouponModalOpen] = useState(false);

  const handleCouponTogle = () => {
    setCouponModalOpen((prev) => !prev);
  };

  return (
    <div className="r-common mp-container">
      <div className="mp-content">
        {/* <section className='mypage-subtitle'>
                    <p className='f30'>마이페이지</p>
                </section> */}
        <MypageNavigation />
        <div className="mypage-index">
          <section className="mp-left box-style">
            <article className="user-info-col">
              <span>
                {myinfo.profile_img?.[0] ? (
                  <img src={`http://localhost:9000/${myinfo.profile_img[0]}`} />
                ) : (
                  <div className="default-profile-img" />
                )}
              </span>
              <div>
                <p className="f30">
                  <b>
                    {myinfo.kname_first}
                    {myinfo.kname_last}
                  </b>
                  님
                </p>
                <ul>
                  <li className="thin300">{myinfo.birth}</li>
                  <li className="thin300">{myinfo.email}</li>
                  <li className="thin300">{myinfo.phone}</li>
                </ul>
                <span
                  className="f12 thin300 modify-info"
                  onClick={() => {
                    navigate("../mypage/modifyInfo");
                  }}
                >
                  회원정보수정
                </span>
              </div>
            </article>
            <article className="user-interest">
              <div>
                <p className="f20 w600">관심 지역</p>
                <ul>
                  {interestArea && interestArea.length > 0 ? (
                    interestArea.map((item) => <li> #{item}</li>)
                  ) : (
                    <span className="f13">관심지역을 설정하세요.</span>
                  )}
                </ul>
              </div>
              <div
                className="interest-btn cursor-pointer"
                onClick={() => {
                  navigate("../mypage/myInterest");
                }}
              >
                관심 지역 수정하기
              </div>
            </article>
          </section>
          <section className="mp-center">
            <article className="mp-center-top">
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("../mypage/getReservation");
                }}
              >
                <b>나의 예약</b>
                <p className="w300">
                  예약하신 항공권을
                  <br />
                  확인해보세요.
                </p>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("../mypage/checkIn");
                }}
              >
                <b>탑승권</b>
                <p className="w300">
                  미리 온라인 체크인하고 <br />
                  편하게 여행하세요.
                </p>
              </div>
            </article>
            <article className="mp-center-bottom">
              <div className="mp-coupon-point-wrap">
                <div className="disable-link">
                  <b>0P</b>
                  <span className="w300">나비포인트</span>
                </div>
                <div className="cursor-pointer" onClick={handleCouponTogle}>
                  <b>
                    {myCouponCnt?.[0]?.coupon_count !== undefined
                      ? `${myCouponCnt[0].coupon_count}개`
                      : "0개"}
                  </b>
                  <span className="w300">할인쿠폰</span>
                </div>
                {/* 할인쿠폰 div 클릭시 모달창 오픈 */}
                {couponModalOpen && (
                  <Modal
                    open
                    onCancel={handleCouponTogle}
                    footer={null}
                    width={550}
                  >
                    <MyCoupon onClose={handleCouponTogle} />
                  </Modal>
                )}
              </div>
              <div
                className="mp-friend"
                onClick={() => {
                  alert("준비중 입니다");
                }}
              >
                <p className="f20 w600 block ">여행친구</p>
                <div className="disable-link">
                  <span>친구</span>
                </div>
                <div className="disable-link">
                  <span>그룹</span>
                </div>
                <div className="disable-link">
                  <span>지니펫</span>
                </div>
              </div>
            </article>
          </section>
          <section className="mp-right">
            <article className="mp-right-top">
              <p className="f20 w600 mp-title">진에어페이</p>
              <button>
                <b className="f16">진에어페이</b>
                <p className="f12 w300">
                  진에어페이 등록하고 빠르게 결제하세요!
                </p>
              </button>
              <div className="jinair-pay-info f14 w300">
                <p className="disable-link">지금 간편 결제 등록하고</p>
                <p className="disable-link">빠르게 예약하세요!</p>
              </div>
            </article>
            <article className="mp-right-col-center">
              <div className="mp-company-content">
                <b className="f20 ">
                  상용 우대
                  <br />
                  기업 인증
                </b>
                <ul>
                  <li className="disable-link">기업인증</li>
                </ul>
              </div>
            </article>
            <article className="mp-right-bottom">
              <div className="mp-company-content">
                <b className="f20">고객 문의</b>
                <ul>
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("../mypage/myQna");
                    }}
                  >
                    나의 문의 확인
                  </li>
                  <li
                    className="disable-link"
                    onClick={() => {
                      navigate("/mypage/qnaUpload");
                    }}
                  >
                    고객의 말씀(Q&A)
                  </li>
                  <li className="disable-link">자주 묻는 질문(FAQ)</li>
                </ul>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
