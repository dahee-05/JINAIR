import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { LuArrowUpRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { IoTicketSharp } from "react-icons/io5";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { customTheme } from "../../service/myinfoApi"; // 맞춤항공권 가져오기 (서령)

import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function MainPromotions() {
  dayjs.locale("ko");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const promotion = useSelector((state) => state.myinfo.customThemeList);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.myinfo.myinfo);

  // 맞춤항공권 hot category 기본으로 가져오기 (서령)
  useEffect(() => {
    dispatch(customTheme("hot"));
  }, []);

  return (
    <>
      <div className="main_home_promotion_warp">
        <div className="main_home_promotion" style={{ marginTop: "30px" }}>
          <div className="main_home_promotion_title">
            <div className="main_home_promotion_title_1">
              <span className="main_home_promotion_before">고객님</span>
              <span>을 위한 맞춤 항공권</span>
            </div>
            <div
              className="main_home_promotion_title_2"
              onClick={() => navigate("/login")}
            >
              <span>
                {isLoggedIn ? (
                  <>
                    #{user.kname_first}
                    {user.kname_last}님을_위한_맞춤_프로모션 <LuArrowUpRight />
                  </>
                ) : (
                  <>
                    #로그인_회원가입_후_맞춤_최저가_항공권_정보_겟겟!{" "}
                    <LuArrowUpRight />
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="main_home_promotion_sub">
            <span>편도</span>
            <span>총액</span>
          </div>
        </div>
        <div className="swiper-promotion-container">
          <button ref={prevRef} className="custom-prev">
            <GrFormPrevious size={20} />
          </button>

          <Swiper
            className="main_home_content_promotion"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={4}
            slidesPerGroup={4}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              if (swiper && prevRef.current && nextRef.current) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
          >
            {/* 리스트 가져오기 (db 컬럼에 맞게 수정함), 스타일도 바로 수정 */}
            {promotion &&
              promotion.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="promotion_slider">
                    <img
                      src={item.images}
                      alt=""
                      style={{ borderRadius: "10px" }}
                    />
                    <div
                      style={{
                        lineHeight: "28px",
                        textAlign: "left",
                        paddingTop: "5px",
                      }}
                    >
                      <p style={{ fontSize: "16px" }}>
                        {item.Departure_location}({item.D_acode})
                      </p>
                      <p style={{ fontSize: "20px", fontWeight: "600" }}>
                        {item.Arrive_location}({item.A_acode})
                      </p>
                      <div style={{ paddingTop: "5px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                          KRW
                        </span>
                        <span style={{ fontSize: "20px", fontWeight: "600" }}>
                          {item.basic_price.toLocaleString()}원
                        </span>
                      </div>
                      <p>
                        {dayjs(item.Departure_date).format("YYYY.MM.DD (ddd)")}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          <button ref={nextRef} className="custom-next">
            <GrFormNext size={20} />
          </button>
        </div>
        <div className="main_promotion_more_warp">
          <div className="main_promotion_more">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("./customticket");
              }}
            >
              <IoTicketSharp />
              맞춤 항공권 더보기
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
