import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../scss/haon.scss";
import SendEmail from "../order/SendEmail.jsx";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function AdminQnaComment() {
  const { qid } = useParams();
  const [formData, setFormData] = useState(); //db 에서 가져온 qna 리스트
  const [customerData, setCustomerData] = useState(); //db 에서 가져온 qna 리스트
  const [inputData, setInputData] = useState({});
  const navigate = useNavigate();
  const adminRef = useRef(null);
  const adminContentRef = useRef(null);
  const id = localStorage.getItem("user_id");
  useEffect(() => {
    axios
      .post("http://localhost:9000/chatbot/detail", { qid: qid })
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .post("http://localhost:9000/chatbot/getCustomerInfo", { id })
      .then((res) => {
        setCustomerData(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [qid, id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const validate = () => {
    if (adminRef.current.value === "") {
      adminRef.current.focus();
      return false;
    } else if (adminContentRef.current.value === "") {
      adminContentRef.current.focus();
      return false;
    }
    return true;
  };

  const handleComment = () => {
    if (validate()) {
      axios
        .post("http://localhost:9000/chatbot/updateComment", {
          no: formData.no,
          inputData,
        })
        .then((res) => {
          if (res.data.result_rows === 1) {
            navigate("/admin/qna");
          } else {
            alert("에러가 발생하였습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  // console.log(formData.image);
  const form = useRef();
  const YOUR_SERVICE_ID = "service_017dgfp";
  const YOUR_TEMPLATE_ID = "template_xisu213";
  const YOUR_PUBLIC_KEY = "EnIoNRO6eo5uhtOnt";
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, {
        publicKey: YOUR_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  // const fullName = customerData.kname_first + customerData.kname_last;
  // const email = customerData.email;

  return (
    <div className="admin-qna-comment-all-box">
      <div>
        {formData ? (
          <table>
            <tr>
              <td>아이디&nbsp;&nbsp;{formData.id}</td>
              <td>등록일&nbsp;&nbsp;{formData.reg_date}</td>
            </tr>
            <tr>
              <td>문의유형</td>
              <td>{formData.category}</td>
            </tr>
            <tr>
              <td>제목</td>
              <td>{formData.title}</td>
            </tr>
            <tr>
              <td>내용</td>
              <td>{formData.content}</td>
            </tr>
            <tr>
              <td>사진</td>
              <td>
                {formData.image ? (
                  <img src={`${formData.image}`} alt="이미지" />
                ) : (
                  <span>첨부파일 없음</span>
                )}
              </td>
            </tr>
          </table>
        ) : (
          ""
        )}
      </div>
      <div>
        <table>
          {formData ? (
            <>
              <tr>
                <td>제목</td>
                <td>
                  <input
                    name="title"
                    type="text"
                    onChange={handleInput}
                    ref={adminRef}
                    value={
                      formData.adminTitle
                        ? formData.adminTitle
                        : inputData.title
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>내용</td>
                <td>
                  <input
                    name="content"
                    type="text"
                    onChange={handleInput}
                    ref={adminContentRef}
                    value={
                      formData.adminContent
                        ? formData.adminContent
                        : inputData.content
                    }
                  />
                </td>
              </tr>
            </>
          ) : (
            ""
          )}
        </table>
        <div>
          {customerData && (
            <form ref={form} onSubmit={sendEmail}>
              <input
                hidden
                readOnly
                name="name"
                value={`${customerData.kname_first}${customerData.kname_last}`}
              />
              <input name="email" value={customerData.email} readOnly hidden />
              <input type="submit" value="답변하기" onClick={handleComment} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
