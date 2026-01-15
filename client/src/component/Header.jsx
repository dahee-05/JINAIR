import React, { useEffect, useState } from "react";
import { FaEarthAmericas, FaCalendarCheck } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoMdAirplane, IoIosPricetags, IoIosGift } from "react-icons/io";
import { MdAirplaneTicket, MdOutlinePets } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import {
  PiCalendarStarFill,
  PiSeatFill,
  PiAirplaneInFlightFill,
} from "react-icons/pi";
import { FaUtensils } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { BsSuitcase2Fill } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { LuPackagePlus, LuHeartHandshake } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../service/authApi.js";
import axios from "axios";
import ExchangeRate from "./main/ExchangeRate.jsx";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [menuData, setMenuData] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);

  const handleAllMenuToggle = () => {
    setIsAllMenuOpen((prev) => !prev);
  };

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      const select = window.confirm("정말로 로그아웃 하시겠습니까?");
      if (select) {
        dispatch(getLogout());
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  };

  const handleNav = (path) => navigate(path);

  useEffect(() => {
    axios
      .get("/data/category.json")
      .then((res) => setMenuData(res.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="header_outline">
      <div className="header">
        <div className="header_content">
          <div className="header_top">
            <div className="header_top_menu header_local">
              <button onClick={handleLoginToggle}>
                <span>{isLoggedIn ? "로그아웃" : "로그인·회원가입"}</span>
              </button>
              <button>
                <span>고객센터</span>
              </button>
            </div>

            <div className="header_top_menu">
              <div className="home_main_logo" onClick={() => handleNav("/")}>
                <img
                  src="https://images.jinair.com/newHom/images/web/common/logo.svg"
                  alt="jinair-logo"
                />
              </div>
              <div className="menu_list">
                <ul>
                  <li
                    className="menu_list1"
                    onMouseEnter={() => setActiveMenu("menu1")}
                    onMouseLeave={() => setActiveMenu("menu1")}
                  >
                    예약
                  </li>
                  <li
                    className="menu_list2"
                    onMouseEnter={() => setActiveMenu("menu2")}
                    onMouseLeave={() => setActiveMenu("menu2")}
                  >
                    프로모션/제휴
                  </li>
                  <li
                    className="menu_list3"
                    onMouseEnter={() => setActiveMenu("menu3")}
                    onMouseLeave={() => setActiveMenu("menu3")}
                  >
                    부가서비스
                  </li>
                  <li
                    className="menu_list4"
                    onMouseEnter={() => setActiveMenu("menu4")}
                    onMouseLeave={() => setActiveMenu("menu4")}
                  >
                    운항정보
                  </li>
                </ul>
              </div>

              <div
                onClick={() => handleNav("/mypage/index")}
                style={{
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "center",
                }}
              >
                <CiUser size={20} />
              </div>
            </div>
          </div>

          {/* 각 메뉴의 hover 상태에 따라 메뉴를 보이게 설정 */}
          <div
            className={`header_bottom_menu_warp1 ${
              activeMenu === "menu1" ? "show" : ""
            }`}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="header_bottom_menu1">
              <ul>
                <li className="menu-main">
                  <IoMdAirplane /> 예약안내
                </li>
                <li>항공권 예약</li>
                <li>예약/결제안내</li>
                <li>예약변경/취소/환불</li>
              </ul>

              <ul>
                <li className="menu-main">
                  <MdAirplaneTicket /> 추천 항공권
                </li>
                <li>최저가항공권</li>
                <li>맞춤항공권</li>
              </ul>

              <ul>
                <li className="menu-main">
                  <IoIosPricetags /> 운임 및 수수료
                </li>
                <li>국내선</li>
                <li>국제선</li>
              </ul>

              <ul>
                <li className="menu-main">
                  <RiDiscountPercentFill /> 할인
                </li>
                <li>할인코드</li>
                <li>프로모션코드</li>
                <li>신분할인제도</li>
                <li>상용우대 프로그램</li>
              </ul>
            </div>
          </div>

          <div
            className={`header_bottom_menu_warp2 ${
              activeMenu === "menu2" ? "show" : ""
            }`}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="header_bottom_menu2">
              <ul>
                <li className="menu-main">
                  <PiCalendarStarFill /> 이벤트
                </li>
                <li>진행중</li>
                <li>종료</li>
                <li>당첨자 발표</li>
              </ul>

              <ul>
                <li className="menu-main">
                  <LuHeartHandshake /> 제휴
                </li>
                <li>차량</li>
                <li>호텔</li>
                <li>여행보험</li>
                <li>현지투어/통신</li>
                <li>카드/환전</li>
                <li>지니 보딩패스</li>
              </ul>
            </div>
          </div>

          <div
            className={`header_bottom_menu_warp3 ${
              activeMenu === "menu3" ? "show" : ""
            }`}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="header_bottom_menu3">
              <ul>
                <li className="menu-main">
                  <LuPackagePlus /> 부가서비스 안내
                </li>
              </ul>

              <ul>
                <li className="menu-main">
                  <IoIosGift /> 묶음 할인
                </li>
              </ul>

              <ul>
                <li className="menu-main">
                  <PiSeatFill /> 좌석
                </li>
              </ul>

              <ul>
                <li className="menu-main">
                  <BsSuitcase2Fill /> 수하물
                </li>
              </ul>
              <ul>
                <li className="menu-main">
                  <FaUtensils /> 기내식
                </li>
              </ul>
              <ul>
                <li className="menu-main">
                  <AiFillSafetyCertificate /> 여행보험
                </li>
              </ul>
              <ul>
                <li className="menu-main">
                  <MdOutlinePets /> JINI PET
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`header_bottom_menu_warp4 ${
              activeMenu === "menu4" ? "show" : ""
            }`}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="header_bottom_menu4">
              <ul>
                <li className="menu-main">
                  <PiAirplaneInFlightFill /> 출도착 안내
                </li>
                <li>구간 조회</li>
                <li>편명 조회</li>
              </ul>

              <ul>
                <li className="menu-main">
                  <FaCalendarCheck /> 스케줄 조회
                </li>
                <li>왕복</li>
                <li>편도</li>
              </ul>

              <ul>
                <li className="menu-main">
                  <FaEarthAsia /> 취항 노선 안내
                </li>
                <li>국내선</li>
                <li>국제선</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
