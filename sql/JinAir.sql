show databases;
use JinAirDB;
show tables;

-- 테이블 전체 데이터 조회
select * from admin;
select * from country;
select * from customer;
select * from flight;
select * from main_menu_category;
select * from qna;
select * from reservation;
select * from sub_category;
select * from product;
select * from view_my_reservation;
select * from coupon;

-- 테이블 데이터 타입 조희
desc admin;
desc country;
desc customer;
desc flight;
desc main_menu_category;
desc qna;
desc reservation;
desc sub_category;


-- ******** db 수정 테스트 **************** 

UPDATE customer
SET interest_area = NULL
WHERE id = 'test1';

-- customer 테이블 test1 아이디에 프사 넣기 (서령)
UPDATE customer
SET profile_img = JSON_ARRAY('/images/ddung.jpg')
WHERE id = 'test1';

-- customer 테이블 test1 아이디에 프사 삭제 (서령)
UPDATE customer
SET profile_img = NULL
WHERE id = 'test1';

-- customer 테이블 값 수정 : phone 데이터 수정하기 010-0000-0000 -> 01000000000, 관심 지역 2개정도 넣어놓기 , 관심테마는 삭제해도 될듯



-- 예약 테이블 탑승객 이름 (passenger_name) 컬럼 추가, JSON으로 타입 변경
DROP TABLE reservation;

CREATE TABLE `reservation` (
  `NO` int auto_increment PRIMARY KEY,
  `ID` varchar(20) NOT NULL,
  `fNUM` varchar(20) NOT NULL,
  `RES_NUM` varchar(20) NOT NULL, 
  `passenger_name` json not null ,
  `RES_DATE` datetime NOT NULL,
  KEY `SUB_RESERVATION_FK_fnum` (`fNUM`),
  KEY `SUB_RESERVATION_FK_id` (`ID`),
  CONSTRAINT `SUB_RESERVATION_FK_fnum` FOREIGN KEY (`fNUM`) REFERENCES `flight` (`fNUM`),
  CONSTRAINT `SUB_RESERVATION_FK_id` FOREIGN KEY (`ID`) REFERENCES `customer` (`id`)
);

INSERT INTO reservation (id, fnum, res_num, passenger_name , res_date)
VALUES ('test1', 'LJ279', 'A11111', JSON_ARRAY('홍길순', '김철수', '이영희') , now()),
      ('test1', 'LJ278', 'A11111', JSON_ARRAY('홍길순', '김철수', '이영희'), now()),
      ('test1', 'LJ255', 'A11222', JSON_ARRAY('홍길순', '김철수'), now());


-- coupon 테이블 (신규)
DROP TABLE coupon;

CREATE TABLE `coupon` (
  `NO` int auto_increment PRIMARY KEY, 
  `ID` varchar(20) NOT NULL,  
  `coupon_name` varchar(50) NOT NULL,  -- 쿠폰명 예) 국내선 1천원 깜짝쿠폰
  `coupon_code` varchar(20) NOT NULL,  -- 쿠폰 코드 예)asxd7124
  `discount_price` int NOT NULL,   -- 할인 금액
  `start_date` date NOT NULL,  -- 쿠폰 유효기간 시작일 
  `end_date` date NOT NULL,  -- 쿠폰 유효기간 종료일
  `used` TINYINT(1) NOT NULL DEFAULT 0 ,  -- 쿠폰 사용 여부 (미사용 0, 사용 1)
  KEY `sub_coupon_fk_id` (`ID`),
  CONSTRAINT `sub_coupon_FK_id` FOREIGN KEY (`ID`) REFERENCES `customer` (`id`)
);

INSERT INTO coupon (id, coupon_name, coupon_code, discount_price , start_date, end_date, used )
VALUES ('test1', '[온라인 전용] 1천원 깜짝쿠폰' , 'cl0001', 1000 , '2025-04-01', '2025-12-31', 0),
		('test1',  '[온라인 전용] 2천원 깜짝쿠폰', 'cl0002', 2000 ,'2025-04-01', '2025-12-31', 0);

-- 4/17 영문성 컬럼명 변경 ename_firtst -> ename_first
alter table customer
		rename column ename_firtst to ename_first ;
        
-- 좌석 테이블 생성
CREATE TABLE `seats` (
  `fNUM` varchar(20)	not null	PRIMARY KEY,
  `basic_seats` json NOT NULL,
  `reserved_basic` json NULL, 
  `premium_seat` json NOT NULL,
  `reserved_premium` json NULL,
  KEY `SUB_SEATS_FK_fnum` (`fNUM`),
  CONSTRAINT `SUB_SEATS_FK_fnum` FOREIGN KEY (`fNUM`) REFERENCES `flight` (`fNUM`)
);
-- qna 테이블에 이미지 추가
alter table qna add column qnaImg json null ;

-- qna 테이블 컬럼 추가 고객아이디, 문의유형컬럼
ALTER TABLE qna
ADD COLUMN customer_id varchar(20),
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id) REFERENCES customer(id);
alter table qna add column category varchar(30) not null;


alter table qna add column comment varchar(10) null ;
alter table qna add column adminTitle varchar(100) null ;
alter table qna add column adminContent varchar(100) null ;


-- promotion 테이블 (신규/서령)

DROP TABLE promotion;

CREATE TABLE promotion (
  `no` INT AUTO_INCREMENT PRIMARY KEY,
  `promo_area` VARCHAR(50) NOT NULL,
  `category` JSON NULL,  
  `images` VARCHAR(255) NULL, 
  `A_acode` VARCHAR(10) NOT NULL  -- 도착지 공항 코드
);
INSERT INTO promotion (promo_area, category, images, A_acode) VALUES
('다낭', '["hot", "beach"]', 'http://localhost:3000/promo_imgs/danang.jpg', 'DAD'),
('세부', '["hot", "beach"]', 'http://localhost:3000/promo_imgs/cebu.jpg', 'CEB'),
('오사카/간사이', '["hot", "shopping", "city"]', 'http://localhost:3000/promo_imgs/osaka.jpg', 'KIX'),
('홍콩', '["hot", "shopping"]', 'http://localhost:3000/promo_imgs/hongkong.jpg', 'HKG'),
('괌', '["hot", "beach"]', 'http://localhost:3000/promo_imgs/guam.jpg', 'GUM'),
('푸껫', '["hot", "beach"]', 'http://localhost:3000/promo_imgs/phuket.jpg', 'HKT'),
('코타키나발루', '["hot", "beach"]', 'http://localhost:3000/promo_imgs/kotakinabalu.jpg', 'BKI'),
('방콕', '["shopping"]', 'http://localhost:3000/promo_imgs/bangkok.jpg', 'BKK'),
('상하이/푸둥', '["shopping", "city"]', 'http://localhost:3000/promo_imgs/shanghaipudong.jpg', 'PVG'),
('도쿄/나리타', '["shopping", "city"]', 'http://localhost:3000/promo_imgs/tokyonarita.jpg', 'NRT'),
('나고야', '["hot", "city"]', 'http://localhost:3000/promo_imgs/nagoya.jpg', 'NGO'),
('오키나와', '["beach"]', 'http://localhost:3000/promo_imgs/okinawa.jpg', 'OKA'),
('다카마쓰', '["forest"]' , 'http://localhost:3000/promo_imgs/takamatsu.jpg', 'TAK'),
('삿포로',  '["hot"]' , 'http://localhost:3000/promo_imgs/sapporo.jpg', 'CTS'),
('후쿠오카',  '["hot", "city"]' , 'http://localhost:3000/promo_imgs/fukuoka.jpg', 'FUK'),
('이시가키지마', '["forest"]' , 'http://localhost:3000/promo_imgs/ishigakijima.jpg', 'ISG'),
('기타큐슈',  '["city"]' , 'http://localhost:3000/promo_imgs/kitakyushu.jpg', 'KKJ'),
('보흘',  '["forest"]' , 'http://localhost:3000/promo_imgs/bohol.jpg', 'TAG'),    
('클락',  '["forest"]' , 'http://localhost:3000/promo_imgs/clark.jpg', 'CRK'),    
('나트랑',  '["beach", "hot"]' , 'http://localhost:3000/promo_imgs/nhatrang.jpg', 'CXR'),    
('푸꾸옥',  '["beach", "hot"]' , 'http://localhost:3000/promo_imgs/phuquoc.jpg', 'PQC'),    
('타이중',  '["forest", "city"]' , 'http://localhost:3000/promo_imgs/taichung.jpg', 'RMQ'),    
('타이베이/타오위안',  '["shopping", "city"]' , 'http://localhost:3000/promo_imgs/taipeitaoyuan.jpg', 'TPE'),    
('마카오',  '["city", "shopping"]' , 'http://localhost:3000/promo_imgs/macau.jpg', 'MFM'),    
('정저우',  '["forest"]' , 'http://localhost:3000/promo_imgs/zhengzhou.jpg', 'CGO');

-- 4/21 qna 관리자 제목,답변,답변여부 컬럼 추가
alter table qna add column comment varchar(10) null;
alter table qna add column adminTitle varchar(100) null;
alter table qna add column adminContent varchar(100) null;
	