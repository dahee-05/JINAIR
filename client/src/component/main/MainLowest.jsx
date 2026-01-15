import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdPin } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import BarChart from "../BarChart";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Mainlowests() {
  const nav = useNavigate();
  const [lowest, setLowest] = useState([]);
  const [lowsetChart, setLowsetChart] = useState([]);
  const [selectedOption, setSelectedOption] = useState("anytime");
  const promotion = useSelector((state) => state.myinfo.customThemeList);

  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get("/data/mainBanner.json")
      .then((res) => {
        setLowest(res.data.lowest);
        setLowsetChart(res.data.lowestChart);
      })
      .catch((error) => console.error("error:", error));
  }, []);

  const PrevArrow = ({ className, style, onClick }) => (
    <div
      style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
      onClick={onClick}
    >
      <GrFormPrevious className={className} size={30} color="#333" />
    </div>
  );

  const NextArrow = ({ className, style, onClick }) => (
    <div
      style={{ ...style, display: "block", right: "-25px", zIndex: 1 }}
      onClick={onClick}
    >
      <GrFormNext className={className} size={30} />
    </div>
  );

  const slickSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    dots: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <div className="main_home_lowest_warp">
        <div className="main_home_lowest" style={{ marginTop: "30px" }}>
          <div className="main_home_lowest_title">
            <div className="main_home_lowest_title_1">
              <span className="main_home_lowest_before">
                최저가로 떠나는 여행
              </span>
            </div>
          </div>

          <div className="main_home_lowest_sub">
            <span>편도</span>
            <span>총액</span>
          </div>
        </div>

        <div className="main_home_lowest_buttons">
          <div
            className={`lowest_button button_anytime ${
              selectedOption === "anytime" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("anytime")}
          >
            <span>언제든 AnyTime</span>
          </div>
          <div
            className={`lowest_button button_anywhere ${
              selectedOption === "anywhere" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("anywhere")}
          >
            <span>어디든 AnyWhere</span>
          </div>
        </div>

        {selectedOption === "anytime" && (
          <div className="lowest_anytime_warp">
            <div className="lowset_pin">
              <p>
                <IoMdPin />
              </p>
              <span>일자별 최저가 항공권</span>
            </div>
            <div className="lowest_anytime">
              <BarChart />
            </div>
          </div>
        )}

        {selectedOption === "anywhere" && (
          <div className="slick-lowest-container">
            <Slider
              ref={sliderRef}
              {...slickSettings}
              className="main_home_content_lowest"
            >
              {promotion.map((item, i) => (
                <div key={i}>
                  <div className="lowest_slider">
                    <div className="main_lowest_img">
                      <img
                        src={item.images}
                        alt={`Banner ${i + 1}`}
                        className="main_lowest"
                        style={{ height: "285px" }}
                      />
                    </div>
                    <div className="main_lowest_text">
                      <p>
                        {item.Departure_location}({item.D_acode})
                      </p>
                      <p>
                        {item.Arrive_location}({item.A_acode})
                      </p>
                      <p>{item.basic_price.toLocaleString()}원</p>
                      <p>
                        {dayjs(item.Departure_date).format("YYYY.MM.DD (ddd)")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}

        <div className="main_lowest_more_warp">
          <div
            className="main_lowest_more"
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span>
              <IoStatsChart /> 최저가 항공권 더보기
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
