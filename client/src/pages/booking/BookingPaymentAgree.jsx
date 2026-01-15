import React, { useState, useEffect } from "react";
import {
    FaAngleUp,
    FaAngleDown,
    FaRegSquareCheck,
    FaSquareCheck,
} from "react-icons/fa6";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

export default function BookingPaymentAgree() {
    // 모든 동의 항목을 초기값 true로 설정
    const [openStates, setOpenStates] = useState({
        more1: false,
        more2: true,
        more3: false,
        additionall: true,  // 전체 선택 초기값 true
        addition1: true,    // 개별 선택 초기값 true
        addition2: true,    // 개별 선택 초기값 true
        addition3: true,    // 개별 선택 초기값 true
        addition4: true,    // 개별 선택 초기값 true
    });

    // 이용약관 중 위험 물질 관리
    const [dangerousItems, setDangerousItems] = useState([]);

    useEffect(() => {
        fetch("/data/agree.json")
            .then((response) => response.json())
            .then((data) => setDangerousItems(data))
            .catch((error) => console.error("Error loading the JSON file", error));
    }, []);

    // 전체 선택
    const handleCheckAll = () => {
        const newValue = !openStates.additionall;
    
        // 전체 선택 해제 시도 시 막기
        if (!newValue) {
            alert("해당 항목들은 필수 동의 항목입니다.");
            return; // 해제 막기
        }
    
        setOpenStates((prev) => ({
            ...prev,
            additionall: newValue,
            addition1: newValue,
            addition2: newValue,
            addition3: newValue,
            addition4: newValue,
        }));
    };
    

    // 개별 선택 => 전체 선택 관여
    const updateAllCheckStatus = (updatedStates) => {
        const allChecked =
            updatedStates.addition1 &&
            updatedStates.addition2 &&
            updatedStates.addition3 &&
            updatedStates.addition4;

        setOpenStates((prev) => ({
            ...prev,
            ...updatedStates,
            additionall: allChecked,
        }));
    };

    const toggleList = (key) => {
        const isRequiredKey = ["addition1", "addition2", "addition3", "addition4"].includes(key);
        const newValue = !openStates[key];
    
        // 필수 항목을 체크 해제하려는 경우 막기
        if (isRequiredKey && !newValue) {
            alert("해당 항목은 필수 동의 항목입니다. 해제시 구매가 제한됩니다.");
            return; // 상태 변경 없이 종료
        }
    
        const updatedStates = {
            ...openStates,
            [key]: newValue,
        };
    
        updateAllCheckStatus(updatedStates);
    };
    

    return (
        <section className="booking-payment-section payment-bottom">
            <div className="payment-bottom-agree">
                <div className="agree1">
                    <h3>예약 규정 및 기타 사항 확인(필수)</h3>
                </div>
                <div className="agree2">
                    <span className="check-icon-warp">
                        <label onClick={handleCheckAll} className="check-icon">
                            {openStates.additionall ? (
                                <FaSquareCheck size="28" />
                            ) : (
                                <FaRegSquareCheck size="28" />
                            )}
                        </label>
                        <label className="all">전체 선택</label>
                    </span>
                </div>
            </div>

            <ul>
                <li>
                    <div className="bottom-agree-title">
                        <strong>항공권 운임 규정</strong>
                        <span className="agree-toggleB">
                            <span className="check-icon-warp">
                                <label onClick={() => toggleList("addition1")}>
                                    {openStates.addition1 ? (
                                        <FaSquareCheck size="25" />
                                    ) : (
                                        <FaRegSquareCheck size="25" />
                                    )}
                                </label>
                                <label>동의 하기</label>
                            </span>
                        </span>
                    </div>
                </li>

                <li>
                    <div className="bottom-agree-title">
                        <strong>부가서비스별 유의사항</strong>
                        <span className="check-icon-warp">
                            <label onClick={() => toggleList("addition2")}>
                                {openStates.addition2 ? (
                                    <FaSquareCheck size="25" />
                                ) : (
                                    <FaRegSquareCheck size="25" />
                                )}
                            </label>
                            <label>동의 하기</label>
                            <button
                                className="agree-toggleA"
                                onClick={() => toggleList("more1")}
                            >
                                {openStates.more1 ? <FaAngleUp /> : <FaAngleDown /> }
                            </button>
                        </span>
                    </div>

                    <div
                        className={openStates.more1 ? "agree-notic-block" : "agree-notic-hide"}
                    >
                        <ul className="bottom-agree-notic-list">
                            <li>
                                <ul>
                                    <li>
                                        항공권 구매 이후에도, [예약상세]–[부가서비스 관리]에서 부가서비스
                                        구매 가능합니다.
                                    </li>
                                    <li>
                                        부가서비스 구매 후 변경은 불가하며, 취소 후 재구매 해야 합니다.
                                    </li>
                                    <li>
                                        부가서비스별 구매/취소 가능 기한
                                        <ul className="agree-notic-inside">
                                            <li>
                                                <span>✓</span>
                                                항공기 출발 24시간 전까지 : [마이페이지]- [부가서비스 구매/취소]
                                            </li>
                                            <li>
                                                <span>✓</span>
                                                항공기 출발 24시간 이후 ~ 항공기 출발 1시간 전까지 : [마이페이지]- [여행보험 취소] 클릭
                                            </li>
                                            <li>
                                                <span>✓</span>
                                                항공기 출발 1시간 전부터 ~ 항공기 출발 이후 : Chubb여행보험
                                                (1666-5075) 문의 후 진에어 고객서비스센터 (1600-6200)로 항공권
                                                환불 문의 (평일 업무시간: 09:00~18:00 / 주말, 공휴일 제외)
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        각 부가서비스별 유의 사항은 부가서비스 안내 페이지에서 반드시 확인 바랍니다.
                                    </li>
                                    <li>
                                        항공기 기종과 스케줄은 사전예고 없이 변경될 수 있으며, 이 경우 사전
                                        구매하신 좌석이 변경 또는 취소될 수 있습니다.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <div className="bottom-agree-title">
                        <button>
                            국내선 여객운송 약관
                            <BsArrowUpRightCircleFill />
                        </button>
                    </div>
                </li>

                <li>
                    <div className="bottom-agree-title">
                        <strong>항공기 위험물 안내</strong>
                        <span className="check-icon-warp">
                            <label onClick={() => toggleList("addition3")}>
                                {openStates.addition3 ? (
                                    <FaSquareCheck size="25" />
                                ) : (
                                    <FaRegSquareCheck size="25" />
                                )}
                            </label>
                            <label>동의 하기</label>
                            <button
                                className="agree-toggleA"
                                onClick={() => toggleList("more2")}
                            >
                                {openStates.more2 ? <FaAngleUp /> : <FaAngleDown /> }
                            </button>
                        </span>
                    </div>

                    <div
                        className={openStates.more2 ? "agree-notic-block" : "agree-notic-hide"}
                    >
                        <ul>
                            <li>
                                국제민간항공기구(ICAO) 및 국제항공운송협회(IATA)에서 지정한 항공위험물은
                                수하물로 운송될 수 없습니다.
                            </li>
                            <li>
                                100Wh 초과 ~ 160Wh 이하 보조배터리는 항공사 승인이 필요합니다. (승객당 2개)
                            </li>
                            <li>
                                보조배터리는 단락 방지를 위해 반드시 개별 포장(비닐, 보호캡, 절연테이프 등)이 필요합니다.
                            </li>
                            <li>
                                보조배터리 및 전자담배는 기내에서 충전하거나 선반 보관이 금지됩니다. 개인이 직접 휴대하거나 좌석 앞 주머니에 보관 바랍니다.
                            </li>
                        </ul>
                    </div>
                </li>

                {openStates.more2 && (
                    <div className="bottom-more-goods">
                        {dangerousItems.map((category, index) => (
                            <div key={index} className="dangerous-item-category">
                                <strong>{category.category}</strong>
                                <ul>
                                    {category.items.map((item, idx) => (
                                        <li key={idx} className="dangerous-item">
                                            <img src={item.img} alt={item.name} />
                                            <p>{item.name} <br /> {item.name_en}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                <li>
                    <div className="bottom-agree-title">
                        <strong>기타 유의사항</strong>
                        <span className="check-icon-warp">
                            <label onClick={() => toggleList("addition4")}>
                                {openStates.addition4 ? (
                                    <FaSquareCheck size="25" />
                                ) : (
                                    <FaRegSquareCheck size="25" />
                                )}
                            </label>
                            <label>동의 하기</label>
                            <button
                                className="agree-toggleA"
                                onClick={() => toggleList("more3")}
                            >
                                {openStates.more3 ? <FaAngleUp /> : <FaAngleDown /> }
                            </button>
                        </span>
                    </div>

                    <div
                        className={openStates.more3 ? "agree-notic-block" : "agree-notic-hide"}
                    >
                        <p>B737-800은 일반석만 운영하며, B737-900은 지니 비즈 좌석과 일반석을 운영합니다.</p>
                        <p>B777은 지니플러스시트와 일반석을 운영합니다.</p>
                        <p>항공권 예매는 국내선: 예매 시점 30분 이후 출발편부터 / 국제선: 3시간 이후 출발편부터 361일 이내까지 가능합니다.</p>
                        <p>인터넷 예약은 최대 9명까지 가능하며, 예약과 동시 구매하지 않으면 자동 취소됩니다.</p>
                        <p>유효기간 6개월 이상 여권, 필요한 비자 지참 필수입니다.</p>
                        <p>훼손된 여권은 입국 거절 가능성 있습니다.</p>
                        <p>환불 신청은 항공권 유효기간 만료일 기준 30일 이내 가능합니다.</p>
                    </div>
                </li>
            </ul>
        </section>
    );
}
