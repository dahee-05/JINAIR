import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./scss/common.scss";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import MobileLayout from "./pages/MobileLayout.jsx";
import Login from "./pages/Login.jsx";
import NaverRedirectPage from "./pages/NaverRedirectPage.jsx";
import KakaoRedirectPage from "./pages/KakaoRedirectPage.jsx";
import FingdUserInfo from "../src/component/member/FingdUserInfo.jsx";
import SignupFunnel from "./pages/SignupFunnel.jsx";
//mypage
import MypageIndex from "./pages/MypageIndex.jsx";
import MyReservation from "./pages/Mypage/MyReservation.jsx";
import CheckIn from "./pages/Mypage/CheckIn.jsx";
import MyInterest from "./pages/Mypage/MyInterest.jsx";
import MyQna from "./pages/Mypage/MyQna.jsx";
import Notice from "./component/member/Notice.jsx";
import NoticeInfo from "./component/member/NoticeInfo.jsx";
import ModifyInfo from "./pages/Mypage/ModifyInfo.jsx";
import CustomTicket from "./pages/CustomTicket.jsx";
import BookingOneWay from "./pages/booking/BookingOneWay.jsx";
import BookingPassenger from "./pages/booking/BookingPassenger.jsx";
import BookingSelectSeat from "./pages/booking/BookingSelectSeat.jsx";
import BookingPayment from "./pages/booking/BookingPayment.jsx";
import BookingGo from "./pages/booking/BookingGo.jsx";
import BookingBack from "./pages/booking/BookingBack.jsx";
import BookingCheckout from "./pages/booking/BookingCheckout.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import AdminLogin from "./component/admin/AdminLogin.jsx";
import AdminFlightList from "./component/admin/AdminFlightList.jsx";
import AdminFlightAdd from "./component/admin/AdminFlightAdd.jsx";
import AdminNotice from "./component/admin/AdminNotice.jsx";
import AdminNoticeInfo from "./component/admin/AdminNoticeInfo.jsx";
import AdminNoticeAdd from "./component/admin/AdminNoticeAdd.jsx";
import AdminQna from "./component/admin/AdminQna.jsx";
import ScrollToTop from "./pages/ScrollToTop.jsx";
import QnaUpload from "./pages/Mypage/QnaUpload.jsx";
import AdminQnaComment from "./component/admin/AdminQnaComment.jsx";
import SuccessPage from "./component/payments/Success.jsx";
import FailPage from "./component/payments/Fail.jsx";
import BookingGoSelectSeat from "./pages/booking/BookingGoSelectSeat.jsx";
import BookingBackSelectSeat from "./pages/booking/BookingBackSelectSeat.jsx";
import ProtectedRoute from "../src/pages/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* mypage */}
          <Route element={<ProtectedRoute />}>
            <Route path="/mypage/index" element={<MypageIndex />} />
            <Route path="/mypage/getReservation" element={<MyReservation />} />
            <Route path="/mypage/checkIn" element={<CheckIn />} />
            <Route path="/mypage/myInterest" element={<MyInterest />} />
            <Route path="/mypage/myQna" element={<MyQna />} />
            <Route path="/mypage/modifyInfo" element={<ModifyInfo />} />
            <Route path="/mypage/qnaUpload" element={<QnaUpload />} />
            <Route path="/CustomTicket" element={<CustomTicket />} />
          </Route>
          <Route path="/user/notice" element={<Notice />} />
          <Route path="/user/noticeInfo/:num" element={<NoticeInfo />} />
          <Route
            path="/booking/availabilityList/oneWay"
            element={<BookingOneWay />}
          />
          <Route path="/booking/availabilityList/go" element={<BookingGo />} />
          <Route
            path="/booking/availabilityList/back"
            element={<BookingBack />}
          />
          <Route path="/booking/passenger" element={<BookingPassenger />} />
          <Route path="/booking/selectSeat" element={<BookingSelectSeat />} />
          <Route
            path="/booking/selectGoSeat"
            element={<BookingGoSelectSeat />}
          />
          <Route
            path="/booking/selectBackSeat"
            element={<BookingBackSelectSeat />}
          />
          <Route path="/booking/beforePayment" element={<BookingPayment />} />
          <Route path="/booking/afterPayment" element={<BookingCheckout />} />
          <Route path="/payment/res" element={<SuccessPage />} />
          <Route path="/payment/fail" element={<FailPage />} />
          {/* <Route path='/payment' element={<Payment />} />
        <Route path='/admin' element={<Admin />} />  */}
        </Route>

        <Route element={<MobileLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/naver-redirect" element={<NaverRedirectPage />} />
          <Route path="/kakao-redirect" element={<KakaoRedirectPage />} />
          <Route path="/find/:finfo" element={<FingdUserInfo />} />
          <Route path="/join/:part" element={<SignupFunnel />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/flight" element={<AdminFlightList />} />
          <Route path="/admin/flight/add" element={<AdminFlightAdd />} />
          <Route path="/admin/notice" element={<AdminNotice />} />
          <Route path="/admin/notice/:num" element={<AdminNoticeInfo />} />
          <Route path="/admin/notice/add" element={<AdminNoticeAdd />} />
          <Route path="/admin/qna" element={<AdminQna />} />
          <Route path="/admin/qnaComment/:qid" element={<AdminQnaComment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
