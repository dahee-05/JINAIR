import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MypageNavigation from "../../component/mypage/MypageNavigation.jsx";
import { useDispatch, useSelector } from "react-redux";
import "../../scss/ryeong.scss";
import { getMyInfo, updateMyInfo } from "../../service/myinfoApi.js";
import { deleteProfileImage } from "../../service/profileApi.js";
import { Modal } from "antd";
import ModifyPass from "../../component/mypage/ModifyPass.jsx";
import Postcode from "../../component/mypage/Postcode.jsx";
import ImageUpload from "../../component/ImageUpload.jsx";

export default function ModifyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // 로그인한 유저의 정보 가져오기
  const myinfo = useSelector((state) => state.myinfo.myinfo);
  const uploadButtonRef = useRef(); // 프사 업로드 참조

  /* 회원 정보 조회 */
  useEffect(() => {
    console.log("회원정보 >>>", myinfo);
    if (isLoggedIn) {
      dispatch(getMyInfo());
    } else {
      const select = window.confirm(
        "로그인 서비스가 필요합니다. \n로그인 하시겠습니까?",
      );
      select ? navigate("/login") : navigate("/");
    }
  }, []);

  const [countries, setCountries] = useState([]);

  /* 국가 정보 불러오기(JSON) */
  useEffect(() => {
    fetch("/data/countryInfo.json")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  /* 비밀번호 변경 모달 */
  const [pwdModalOpen, setPwdModalOpen] = useState(false);

  const handlePwdTogle = () => {
    setPwdModalOpen((prev) => !prev);
  };

  /* 우편번호 변경 모달 */
  const [postcodeModalOpen, setPostcodeModalOpen] = useState(false);

  const handlePostTogle = () => {
    setPostcodeModalOpen((prev) => !prev);
  };

  //postcode 주소 변경시 회원정보수정에 반영
  const handleAddressChange = ({ zipcode, roadAddress, detailAddress }) => {
    setFormData((prev) => ({
      ...prev,
      zipcode,
      address: roadAddress,
      detail_address: detailAddress,
    }));
  };

  /* 변경된 회원 정보 formData에 저장  */

  const [formData, setFormData] = useState({
    email: "",
    nationality: "",
    residence: "",
    phone: "",
    detail_address: "",
    zipcode: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    if (myinfo.id) {
      setFormData({
        email: myinfo.email || "",
        phone: myinfo.phone || "",
        nationality: myinfo.nationality || "한국",
        residence: myinfo.residence || "한국",
        zipcode: myinfo.zipcode || "",
        address: myinfo.address || "",
        detail_address: myinfo.detail_address || "",
      });
    }
  }, [myinfo]);

  // 폼 값 변화 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* 프사 */

  // 새로운 프사 업로드
  const handleProfileUpload = (filename) => {
    dispatch(getMyInfo());
  };

  // 프사 삭제
  const handleDelProfile = () => {
    const filename = myinfo.profile_img?.[0]?.split("/").pop();
    if (!filename) return;

    deleteProfileImage(filename, myinfo.id).then(() => {
      dispatch(getMyInfo());
    });
  };

  /* 회원정보 수정 */
  const handleSubmit = () => {
    const updatedData = {
      id: myinfo.id,
      ...formData,
      password: formData.password || myinfo.password,
    };

    console.log("최종 업뎃 회원 정보", updatedData);
    dispatch(updateMyInfo(updatedData)).then(() => {
      dispatch(getMyInfo());
      alert("회원 정보가 수정되었습니다.");
    });
  };

  return (
    <div className="r-common mp-container">
      <div className="mp-content">
        <MypageNavigation />
        <div className="small-wrap">
          {/* 회원정보 수정 상단 */}
          <h2 className="f32 w700 align-center">회원정보수정</h2>
          <p className="sub-desc w300 align-center">
            회원정보는 개인정보취급방침에 따라 안전하게 보호되며
            <br />
            회원님의 명백한 동의 없이 공개 또는 제 3자에게 제공되지 않습니다.
          </p>
          {/* 프로필 사진 */}
          <div className="profile-wrap">
            <b>프로필 사진</b>
            <div className="profile-img">
              {myinfo.profile_img?.[0] ? (
                <img src={`http://localhost:9000/${myinfo.profile_img[0]}`} />
              ) : (
                <div className="default-profile-img" />
              )}

              <div className="profile-img-desc">
                <strong className="w300">
                  <b>
                    '{myinfo.kname_first}
                    {myinfo.kname_last}'
                  </b>{" "}
                  님 반갑습니다.
                </strong>
                <p className="w300">
                  사진 변경/등록 시 5Mb 이하의 파일 등록만 가능하며 자동으로
                  리사이징 처리 됩니다. 등록 가능한 확장자는 jpg, jpeg, gif,
                  png, heic 파일입니다.
                </p>
                <span className="w300">
                  ※사진 등록 시 선정적인 사진은 삭제처리 되거나 제재를 받을 수
                  있습니다.
                </span>
              </div>
            </div>
            <div className="profile-button">
              <button ref={uploadButtonRef}>변경</button>
              <button onClick={handleDelProfile}>삭제</button>
            </div>

            <div className="profile-upload-area">
              <ImageUpload
                getFileName={handleProfileUpload}
                triggerRef={uploadButtonRef}
              />
            </div>
          </div>
          {/* 기본정보 */}
          <div className="info-wrap">
            <div className="info-title">
              <p className="f22 w600 ">기본정보</p>
              <span className="w300 f12">
                <b className="input-required-label">*</b> 필수입력사항
              </span>
            </div>
            <div className="info-content">
              <div className="field-wrapper info-user-id">
                <label className="info-field-title">
                  아이디<span className="input-required-label W300"> *</span>
                </label>
                <input
                  className="w300"
                  type="text"
                  disabled
                  placeholder={myinfo.id}
                />
              </div>
              <div className="field-wrapper info-user-pwd">
                <label className="info-field-title">
                  비밀번호 <span className="input-required-label W300"> *</span>
                </label>
                <button onClick={handlePwdTogle}>비밀번호 변경</button>
                {pwdModalOpen && (
                  <Modal
                    open
                    onCancel={handlePwdTogle}
                    footer={null}
                    width={550}
                  >
                    <ModifyPass
                      userId={myinfo.id}
                      onConfirm={(newPassword) => {
                        setFormData((prev) => ({
                          ...prev,
                          password: newPassword,
                        }));
                        setPwdModalOpen(false);
                      }}
                    />
                  </Modal>
                )}
              </div>
              <div className="field-wrapper info-user-name-full">
                <label className="info-field-title">
                  이름<span className="input-required-label W300"> *</span>
                </label>
                <input
                  className="w300"
                  type="text"
                  disabled
                  value={myinfo.kname_first + myinfo.kname_last}
                />
              </div>
              <div className="field-row info-user-name-kor">
                <div className="field-group">
                  <label className="info-field-title">
                    성(한글)
                    <span className="input-required-label W300"> *</span>
                  </label>
                  <input
                    className="w300"
                    type="text"
                    disabled
                    value={myinfo.kname_first}
                  />
                </div>
                <div className="field-group">
                  <label className="info-field-title">
                    이름(한글)
                    <span className="input-required-label W300"> *</span>
                  </label>
                  <input
                    className="w300"
                    type="text"
                    disabled
                    value={myinfo.kname_last}
                  />
                </div>
              </div>
              <div className="field-row info-user-name-eng">
                <div className="field-group">
                  <label>
                    성(영문)
                    <span className="input-required-label W300"> *</span>
                  </label>
                  <input
                    className="w300"
                    type="text"
                    disabled
                    value={myinfo.ename_first}
                  />
                </div>
                <div className="field-group">
                  <label className="info-field-title">
                    이름(영문)
                    <span className="input-required-label W300"> *</span>
                  </label>
                  <input
                    className="w300"
                    type="text"
                    disabled
                    value={myinfo.ename_last}
                  />
                </div>
              </div>
              <div className="field-wrapper info-user-birthday">
                <label className="info-field-title">
                  생년월일<span className="input-required-label W300"> *</span>
                </label>
                <input
                  className="w300"
                  type="text"
                  disabled
                  value={myinfo.birth}
                />
              </div>
              <div className="field-wrapper info-user-birthday">
                <label className="info-field-title">
                  연락처<span className="input-required-label W300"> *</span>
                </label>
                <select
                  name=""
                  className="info-select-box w300"
                  onChange={handleChange}
                >
                  {countries.map((country) => (
                    <option value="">{`${country.ko_name} (${country.dial_code})`}</option>
                  ))}
                </select>
                <div className="flex gap10">
                  <input
                    className="w300"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="예)01000000000"
                  />
                  {/* <button className='info-navy-btn'>변경/인증</button> */}
                </div>
              </div>
              <div className="field-wrapper info-user-email">
                <label className="info-field-title">
                  이메일<span className="input-required-label W300"> *</span>
                </label>
                <input
                  className="w300"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="field-wrapper info-user-email">
                <label className="info-field-title">
                  국적(여권)
                  <span className="input-required-label W300"> *</span>
                </label>
                <select
                  name="nationality"
                  className="info-select-box w300"
                  onChange={handleChange}
                >
                  {/* json에서 선택된 값이 db로 가야함 */}

                  {countries.map((country) => (
                    <option value="">{`${country.ko_name} (${country.en_name})`}</option>
                  ))}
                </select>
              </div>
              <div className="field-wrapper info-user-email">
                {/* json에서 선택된 값이 db로 가야함 */}

                <label className="info-field-title">거주국가</label>
                <select
                  name="country"
                  className="info-select-box w300"
                  onChange={handleChange}
                >
                  {countries.map((country) => (
                    <option value="">{`${country.ko_name} (${country.en_name})`}</option>
                  ))}
                </select>
              </div>
              <div className="field-wrapper info-user-address">
                <label className="info-field-title">주소</label>
                <div className="flex gap10">
                  <input
                    className="w300"
                    type="text"
                    disabled
                    value={formData.zipcode}
                    placeholder="우편 번호를 검색 해주세요."
                  />
                  <button className="info-navy-btn" onClick={handlePostTogle}>
                    우편번호 검색
                  </button>
                </div>
                <input
                  className="w300"
                  type="text"
                  disabled
                  value={formData.address}
                  placeholder="도로명 주소를 검색 해주세요."
                />
                <input
                  className="w300"
                  type="text"
                  value={formData.detail_address}
                  onChange={handleChange}
                  placeholder="우편번호 검색 후에 상세주소를 입력해주세요."
                />
              </div>
              {/* 주소 검색 모달 */}
              {postcodeModalOpen && (
                <Modal
                  open
                  onCancel={handlePostTogle}
                  footer={null}
                  width={550}
                >
                  <Postcode
                    onCompleteAddress={handleAddressChange}
                    onClose={handlePostTogle}
                  />
                </Modal>
              )}

              <div className="field-wrapper info-user-confirm">
                <label className="info-field-title">
                  마케팅 광고 활용 수신 동의
                </label>
                <div className="flex gap10">
                  <div className="checkbox-wrap">
                    <input type="checkbox" defaultChecked />
                    <label htmlFor="" className="f14 w300">
                      이메일
                    </label>
                  </div>
                  <div className="checkbox-wrap">
                    <input type="checkbox" defaultChecked />
                    <label htmlFor="" className="f14 w300">
                      SMS
                    </label>
                  </div>
                  <div className="checkbox-wrap">
                    <input type="checkbox" defaultChecked />
                    <label htmlFor="" className="f14 w300">
                      App푸시
                    </label>
                  </div>
                </div>
              </div>
              {/* SNS 계정연동 */}
              {/* <div className='field-wrapper disable-link'>
                                <b className='f16'>SNS 계정연동</b>
                                <p className='f14 w300'>- SNS 계정을 통해서 간편하게 로그인 하세요.</p>
                                <div className='sns-btn-wrap'>
                                    <button  >
                                        <img src="/images/icon_kakao2.webp" alt="" onClick={()=>{alert('준비중 입니다.')}} />
                                        카카오 로그인 연동하기</button>
                                    <button onClick={()=>{alert('준비중 입니다.')}}>
                                        <img src="/images/icon_naver.webp" alt="" />
                                        네이버 로그인 연동하기</button>
                                </div>
                            </div> */}
              {/* <div className='field-wrapper disable-link' >
                                <b className='f16'>회원탈퇴</b>
                                <p className='f14 w300'>탈퇴 후 14일 이내에 가입이 불가능합니다.</p>
                                <button className='withdraw-btn disable-link'>회원 탈퇴하기</button>
                            </div> */}
              <div className="btn-group">
                <button className="gray-btn">취소</button>
                <button className="navy-btn2" onClick={handleSubmit}>
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end of small wrap  */}
      </div>{" "}
      {/* 해당 컴포넌트 가운데 정렬*/}
    </div> /* 백그라운드 컬러 설정 */
  );
}
