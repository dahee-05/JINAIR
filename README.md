<p align="center">
  <img src="https://github.com/2eo2yeo/jinAir/blob/main/client/public/images/readmetitle.png?raw=true">
</p>


## 📄개요
- 항공권 예매 사이트인 <B>진에어</B>를 벤치마킹하여 구현한 팀 프로젝트입니다.
- 항공권 예매 시스템의 구조와 동작 원리에 흥미를 느껴 주제로 선정하게 되었습니다
- <B>React, Node.js(Express), MySQL</B>을 사용하였으며, 모든 팀원이 프론트엔드와 백엔드를 함께 개발하였습니다.
- <B>날짜 선택용 캘린더, 좌석 선택 시각화, 항공편 최저가 시각화 차트, 관리자용 항공편 등록 시스템</B> 등을 구현하여 사용자 및 운영자의 편의성을 강화하였습니다.

<br>



### 📆 프로젝트 기간
- 2025.03.24 ~ 2025.04.28

<br>

### 🙋‍♀️ 팀구성
![image](https://github.com/user-attachments/assets/35e53052-3316-4f53-aee8-b5738a94ed3c)


### 📚기술 스택

<div align=left> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <br>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
  <br>
</div>

<br>
<br>

## 🖥️ 프로젝트 시연 영상

<p align="center">
  <a href="https://youtu.be/fy4xuwWGOhA?si=SuaqVev9tDgIny9Y" target="_blank">
    <img src="https://github.com/user-attachments/assets/a9ff6647-b12e-4b5c-b42e-c002f4b6face" width="700" />
  </a>
</p>

<p align="center"> 이미지 클릭시 유튜브로 이동합니다 </p>

<br>
<br>

## 프로젝트 설명

### ⚙️ 설치 및 실행 (로컬환경)
<B>프로젝트폴더/client</B>
```bash
npm i 
npm start
```
<B>프로젝트폴더/server</B> 
```bash
npm i 
nodemon server.js  #nodemon 설치 선행
```
<B>DB</B>
- mysql workbench에서 sql 폴더의 `jinairdb2.sql` 설치

<br>




### ✏️ 설계단계 - ERD 
![image](https://github.com/user-attachments/assets/9ad5db3e-592b-49f2-9686-63a549a3d0c0)

- 항공편, 좌석, 예약, 고객, 쿠폰, 프로모션, 관리자, QnA, 공지사항 테이블로 구성
- 기능별 테이블을 관리하고 필요한 경우 외래키로 연결
  
<br>







## 🖥구현기능 


<details>
<summary><strong>📌 상세 내용 펼치기!</strong></summary>
<div markdown="1">

📁 회원가입
- 회원가입 유효성 체크(필요 정보 입력, 약관 동의)
- 이메일 인증 기능 활용
  
📁 로그인
- 입력 정보 유효성 체크(아이디, 비밀번호)
- SNS 간편 로그인 기능
- 개인정보를 활용한 아이디·비밀번호 찾기 기능구현
  
📁 메인페이지
- 이미지 슬라이드 (swiper, slick)
- DB연동 및 chartJS를 활용한 일일 최저가 조회
- 우측하단의 사이드 바에서 위로가기 버튼을 통해 위치 이동 가능
- 항공편 예약 / 예약 조회 가능

📁 예약
- 왕복/편도 구간 설정
- DB에 저장된 출발 공항과 도착 공항을 선택
- 캘린더를 활용한 여행일정 설정
- 탑승 승객 유형 지정 및 항공권 조회

📁 결제정보 선택 및 입력
- 여행 일정에따라 일반석/프리미엄 석 선택(왕복의 경우 오는 편까지)
- 탑승객 정보 입력
- 구간별 금액 확인 등 가능
- 선택한 좌석 등급에 따른 지정좌석 선택 가능(필수X) 
  
📁 결제페이지
- DB에 저장된 쿠폰 적용 가능
- 토스페이먼츠 API를 활용한 결제 기능 구현

📁 챗봇
- 우측하단 사이드 바 아이콘을 통해 진입하며 항공편 스케줄 조회 및 예약조회
- 항공편 조회 후 메인 화면에 반영 기능
  
📁 환율 계산
- 우측하단 사이드 바 아이콘을 통해 진입하며 달러, 엔화, 유로화를 원화로 환산하는 기능
  
📁 마이페이지
- 쿠폰 / 예약 조회
- 회원 정보 수정, 프로필 사진 설정
- 관심 지역 설정
- 고객 문의 내역과 관리자 답변 확인
- 탑승권 메일 발송 (탑승 당일 활성화, EmailJS 라이브러리 활용)

📁 맞춤항공권
- 사용자가 설정한 관심지역과 카테고리별로 가까운 날짜의 항공편 추천
  
📁 관리자페이지
- 공지사항 등록, 수정, 삭제 기능
- 문의사항 답변으로 답변된 문의와 되지 않은 답변으로 구분 가능
- 항공편 등록, 조회, 검색, 삭제 등 관리 기능

📁 고객 문의 작성 폼
- multer를 통한 사진 첨부 기능 제공


</div>
</details>

<br>

## 😨trouble Issue
- 팀원간 DB 연동 비동기 작업 지연으로 Redux상태 업데이트 오류 발생. 팀원간 소통 오류로 데이터 작업과 비동기 작업의 순서 흐름을 재구성하여 이슈 해결
- 메인화면 ChartJS에대한 DB활용 SQL문 서식에 오류가 있어 서버 에러로 다운. 해당 SQL 서식을 재구성하여 오류를 최소화하도록 디버깅함. 
<br>

## ❗ Reference

- 본 프로젝트는 진에어를 참조하여 학습 목적으로 만들어졌습니다.
- 학습용으로 만들어진 사이트이므로 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제가 될 수 있습니다.
- 본 프로젝트에서 사용하고 있는 사진의 저작권은 모두 진에어에 있습니다. 
<br>
<br><br><br>
