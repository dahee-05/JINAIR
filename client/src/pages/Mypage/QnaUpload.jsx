import React, { useRef, useState, useEffect } from "react";
import MypageNavigation from "../../component/mypage/MypageNavigation";
import "../../scss/haon.scss";
import { ImBubbles3 } from "react-icons/im";
import { MdPlace } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getCountry } from "../../service/searchApi.js";
import QnaImgMulti from "../../component/QnaImgMulti.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SendEmail from "../../component/order/SendEmail.jsx";

export default function QnaUpload() {
  const navigate = useNavigate();
  const [fnames, setFnames] = useState({});
  let [formData, setFormData] = useState({});
  const [inputData, setInputData] = useState({});
  const [all, setAll] = useState({});
  const [previewList, setPreviewList] = useState([]);

  const getFileName = (filesNames) => {
    setFnames(filesNames);
    setPreviewList(filesNames.uploadFileName);
  };
  useEffect(() => {
    dispatch(getCountry());
  }, []);
  const list1 = [
    "수하물 신고(파손/분실)",
    "지니홈배송",
    "칭송",
    "불만",
    "문의/요청",
    "제언",
  ];
  const list2 = [
    "홈페이지 회원정보",
    "항공권 예약/조회",
    "항공권 변경",
    "이름 철자 변경",
    "항공권 환불",
    "수하물",
    "체크인(수속)",
    "도움이 필요하신 고객",
    "할인/이벤트",
    "나비포인트",
    "기타",
  ];

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.search.countryList);
  const processedList = countryList.map((item) => item.city.split(" (")[0]);
  const refs = {
    resNumRef: useRef(null),
    startDateRef: useRef(null),
    titleRef: useRef(null),
    contentRef: useRef(null),
    nameRef: useRef(null),
    phoneRef: useRef(null),
    emailRef: useRef(null),
    typeRef: useRef(null),
    fieldRef: useRef(null),
    startRef: useRef(null),
    endRef: useRef(null),
  };

  const handleStart = () => {
    setStart(refs.startRef.current.value);
  };
  const handleEnd = () => {
    setEnd(refs.endRef.current.value);
  };
  const handleForm = (e) => {
    const { name, value } = e.target;
    // 문의유형이 수하물 신고(파손/분실)일 때 문의분야 강제 세팅
    if (name === "type" && value === "수하물 신고(파손/분실)") {
      refs.fieldRef.current.value = "수하물";
      setInputData({
        ...inputData,
        [name]: value,
        field: "수하물",
      });
    } else {
      setInputData({ ...inputData, [name]: value });
    }
  };

  const validate = () => {
    if (refs.typeRef.current.value === "default") {
      refs.typeRef.current.focus();
      return false;
    } else if (refs.fieldRef.current.value === "default") {
      refs.fieldRef.current.focus();
      return false;
    } else if (refs.titleRef.current.value === "") {
      refs.titleRef.current.focus();
      return false;
    } else if (refs.contentRef.current.value === "") {
      refs.contentRef.current.focus();
      return false;
    } else if (refs.nameRef.current.value === "") {
      refs.nameRef.current.focus();
      return false;
    } else if (refs.phoneRef.current.value === "") {
      refs.phoneRef.current.focus();
      return false;
    } else if (refs.emailRef.current.value === "") {
      refs.emailRef.current.focus();
      return false;
    }
    return true;
  };
  const handleClick = () => {
    const id = localStorage.getItem("user_id");
    if (validate()) {
      formData = {
        ...formData,
        upload_file: fnames.uploadFileName,
        id: id,
        inputData,
      };
      // console.log('fdfd',formData);

      axios
        .post("http://localhost:9000/chatbot/dbQnaupload", formData)
        .then((res) => {
          if (res.data.result_rows === 1) {
            const select = window.confirm(
              "질문등록이 완료되었습니다. 마이페이지로 이동하시겠습니까?",
            );
            select ? navigate("/mypage/index") : navigate("/");
          } else {
            alert("질문등록에 실패하였습니다. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          alert("질문등록실패");
          console.log(error);
        });
    }
  };

  return (
    <div className=" mypage-qnaUpload-container">
      <div className="r-common mypage-qnaUpload-content">
        <MypageNavigation />
        <section className="mp-common-content">
          <div className="mypage-qnaUpload-text-box">
            <span>고객의 말씀(Q&A)</span>
          </div>
          <span className="mypage-qnaUpload-text">
            소중한 의견을 반영해 더 발전하는 진에어가 되겠습니다.
          </span>
          <div className="mp-table-wrap">
            <div className="mypage-qnaUpload-all-box">
              <table>
                <tr>
                  <td>
                    문의유형<span style={{ color: "red" }}>*</span>
                  </td>
                  <td>
                    <select
                      ref={refs.typeRef}
                      name="type"
                      id=""
                      onChange={handleForm}
                    >
                      <option value="default">문의 유형 선택</option>
                      {list1.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </select>
                    <select
                      ref={refs.fieldRef}
                      name="field"
                      id=""
                      onChange={handleForm}
                    >
                      <option value="default">문의 분야 선택</option>
                      {list2.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>예약 정보</td>
                  <td>
                    <div>
                      <button>나의 예약 조회</button>
                      <span>
                        * 예매 또는 탑승정보의 정확한 확인을 위해 온라인 예매는
                        예약 정보 선택 버튼을 통해 등록해주세요.
                      </span>
                    </div>
                    <li>
                      <label htmlFor="">예약번호</label>
                      <input
                        ref={refs.resNumRef}
                        name="resNum"
                        type="text"
                        placeholder="예약번호"
                        onChange={handleForm}
                      />
                    </li>
                    <li>
                      <label htmlFor="">출발일</label>
                      <input
                        ref={refs.startDateRef}
                        name="startDate"
                        type="date"
                        placeholder="출발일"
                        onChange={handleForm}
                      />
                    </li>
                    <li>
                      <label htmlFor="">출발지/도착지</label>
                      <select name="" id="" onChange={handleStart}>
                        <option value="default">선택</option>
                        {processedList.map((data) => (
                          <option value={data}>{data}</option>
                        ))}
                      </select>
                      <select name="" id="" onChange={handleEnd}>
                        <option value="default">선택</option>
                        {processedList.map((data) => (
                          <option value={data}>{data}</option>
                        ))}
                      </select>
                    </li>
                  </td>
                </tr>
                <tr>
                  <td>
                    제목<span style={{ color: "red" }}>*</span>
                  </td>
                  <td>
                    <input
                      ref={refs.titleRef}
                      name="title"
                      type="text"
                      onChange={handleForm}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    내용<span style={{ color: "red" }}>*</span>
                  </td>
                  <td>
                    <input
                      ref={refs.contentRef}
                      name="content"
                      type="text"
                      onChange={handleForm}
                    />
                  </td>
                </tr>
                <tr>
                  <td>파일첨부</td>
                  <td>
                    <div>
                      <QnaImgMulti getFileName={getFileName} />
                      {previewList &&
                        previewList.map((preview) => (
                          <img
                            src={`http://localhost:9000/${preview}`}
                            alt="미리보기"
                            style={{ width: "200px" }}
                          />
                        ))}
                      <li>
                        <input
                          type="hidden"
                          name="uploadFile"
                          value={fnames.uploadFileName}
                        />
                        <input
                          type="hidden"
                          name="sourceFile"
                          value={fnames.sourceFileName}
                        />
                      </li>
                    </div>
                    <ul>
                      <li>
                        최대 3MB 이내/pdf, jpg, jpeg, png, webp만 등록
                        가능합니다.
                      </li>
                      <li>
                        개인정보가 포함된 신분증/서류(여권,주민등록증 등) 제출
                        시,{" "}
                        <span>
                          주민번호 뒷자리는 반드시 마스킹 처리 후 첨부
                        </span>{" "}
                        부탁드립니다.
                      </li>
                      <li>
                        당사는 관련 법에 따라 개인정보 수집 및 이용 목적 달성 후
                        수집된 개인정보를 지체 없이 파기하겠습니다.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    신청자 정보<span style={{ color: "red" }}>*</span>
                  </td>
                  <td>
                    <li>
                      <label htmlFor="">이름</label>
                      <input
                        ref={refs.nameRef}
                        name="name"
                        type="text"
                        onChange={handleForm}
                      />
                    </li>
                    <li>
                      <label htmlFor="">연락처</label>
                      <input
                        ref={refs.phoneRef}
                        name="phone"
                        type="text"
                        onChange={handleForm}
                      />
                    </li>
                    <li>
                      <label htmlFor="">이메일</label>
                      <input
                        ref={refs.emailRef}
                        name="email"
                        type="text"
                        onChange={handleForm}
                      />
                    </li>
                    <p>
                      문의하신 내용에 대한 답변이 등록되면, 입력해주신 이메일로
                      알림이 전송됩니다.
                    </p>
                  </td>
                </tr>
              </table>
              <div className="mypage-qnaUpload-middle-box">
                <div>
                  개인정보 수집동의<span style={{ color: "red" }}>*</span>
                </div>
                <div>
                  <div>
                    정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 개인정보
                    보호법에 따라 개인정보 수집 시 아래와 같은 사항을 고지하고
                    동의를 받습니다.
                    <br />
                    1. 수집하는 개인정보 항목
                    <br />
                    - 필수항목 : 이름, 연락처, 이메일 주소
                    <br />
                    - 선택항목 : 예약번호, 출발일, 출발지, 도착지
                    <br />
                    2. 자동으로 생성되는 개인정보
                    <br />
                    - 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 등<br />
                    3. 개인정보의 수집 및 이용목적
                    <br />
                    진에어는 이용자의 동의가 있거나 법령의 규정에 의한 경우를
                    제외하고는 명시된 규정에서 고지한 범위를 넘어 이용자의
                    개인정보를 이용하지 않습니다. 가. 처리 및 관리
                    <br />
                    회원인 경우 본인 확인 및 당사 서비스 기록 확인, 개인 식별,
                    불량 회원의 부정 이용 방지와 비인가 사용 방지, 분쟁 조정을
                    위한 기록 보존, 불만 처리 등 민원 처리, 고지사항 전달 나.
                    서비스 개선에 활용
                    <br />
                    접속 빈도 파악, 만족도 조사 등 이용자 경험 개선 활동
                    <br />
                    4. 개인정보의 처리 및 보유 기간
                    <br />
                    전자상거래 등에서의 소비자 보호에 관한 법률에 따라 ‘3년간’
                    보관할 수 있습니다. 당사는 상기 개인정보의 수집 및 이용 목적
                    달성 후 수집된 개인 정보를 파기하겠습니다. 다만, 개인정보의
                    수집 및 이용 목적이 달성된 경우에도 상법, 전자 상거래
                    등에서의 소비자 보호에 관한 법률 등 관계법령의 규정에 의하여
                    보존할 필요성이 있는 경우 및 사전에 보유기간을 이용자에게
                    고지하거나 명시한 경우는 그에 따라 개인정보를 보관할 수
                    있습니다. 5. 개인정보의 수집 및 이용에 대한 동의 거부 관련
                    <br />
                    개인정보의 수집 및 이용 동의에 거부하실 수 있으나 이 경우
                    해당 서비스 이용이 불가합니다.
                    <br />
                  </div>
                  <div>
                    <input type="checkbox" />
                    <span>개인정보 수집 및 이용에 동의합니다.</span>
                  </div>
                  <ul>
                    <li>
                      고객님께서 남겨 주신 문의는 접수 순서에 따라 최대한 신속히
                      안내해 드리고 있습니다.
                    </li>
                    <li>
                      단, 주말, 공휴일에 접수된 문의, 관계기관의 사실 확인이
                      필요한 문의는 회신이 다소 지체될 수 있는 점 양해 부탁
                      드립니다.
                    </li>
                    <li>
                      여행사, 온라인 여행 사이트 등을 통해 구매한 항공권의 취소,
                      변경, 환불은 해당 구매처를 통해 문의 부탁 드립니다.
                    </li>
                    <li>
                      진에어 웹사이트/App 및 고객서비스센터 예매 항공권은
                      홈페이지의 [마이페이지] - [예약조회/변경/취소]에서 직접
                      변경 및 환불이 가능합니다.
                    </li>
                    <li>
                      신속한 답변을 위해 예매 또는 탑승 정보를 정확히 작성해
                      주시면 빠른 처리가 가능합니다.
                    </li>
                    <li>
                      특히 항공권의 변경, 환불, 나비포인트, 수하물 신고 관련
                      문의사항은 ‘예약번호, 출발지, 도착지, 탑승자명’ 정보를
                      정확히 기입해 주시기 바랍니다.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mypage-qnaUpload-bottom-box">
                <div>
                  <button onClick={handleClick}>등록</button>
                </div>
                <ul>
                  <li>
                    <div>
                      <span>
                        <RiCustomerService2Fill className="mypage-qnaUpload-icon" />
                      </span>
                      <div>
                        <h4>고객 서비스 센터</h4>
                        <h5>- 전화번호 : 1600-6200 / 02-6099-1200</h5>
                        <h5>- 상담가능시간 : 오전 09:00 ~ 오후 18:00</h5>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        <MdPlace className="mypage-qnaUpload-icon" />
                      </span>
                      <div>
                        <h4>지점 안내</h4>
                        <h5>
                          진에어의 국내외 각 취항지별 지점을 안내해 드립니다.
                        </h5>
                      </div>
                    </div>
                    <div>
                      <span>자세히 보기</span>
                      <IoArrowForwardCircleOutline className="mypage-qnaUpload-icon2" />
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        <ImBubbles3 className="mypage-qnaUpload-icon" />
                      </span>
                      <div>
                        <h4>마케팅 제휴 문의</h4>
                        <h5>
                          마케팅 제휴 문의에 한해 담당자 확인 후 연락
                          드리겠습니다.
                        </h5>
                      </div>
                    </div>
                    <div>
                      <span>문의하기</span>
                      <IoArrowForwardCircleOutline className="mypage-qnaUpload-icon2" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
