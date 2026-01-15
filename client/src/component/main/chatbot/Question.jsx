import React, { useState } from 'react';

export default function Question() {
    const [activeTab, setActiveTab] = useState('');
    const [reserTab, setReserTab] = useState('');

    const list = [
        { tab: 'reservation', name: '항공권 예매' },
        { tab: 'sale', name: '할인제도' },
        { tab: 'promotion', name: '프로모션' },
        { tab: 'checkin', name: '체크인(수속)' },
        { tab: 'baggage', name: '수하물' },
        { tab: 'help', name: '도움이 필요하신 고객' },
        { tab: 'service', name: '기내서비스' },
        { tab: 'homePage', name: '홈페이지' },
        { tab: 'point', name: '나비포인트' },
        { tab: 'etc', name: '기타' }
    ];
    const reservationList = [
        {tab: 'reservation', name : '예약'},
       { tab:'payment', name : '결제'},
       { tab:'change', name : '변경/환불'},
       { tab:'air', name : '항공권'},
      {  tab:'etc', name : '기타(영수증 발급 등)'},
    ];
    const handleList = (tab) => {
        setActiveTab(tab);
    };
    const handleReservationList = (tab) => {
        setReserTab(tab);
    };
    return (
        <div className='chatbot-question-all-box'>
            <div className='schedule-all-box'>
                <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                    <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                    최선을 다해 답변해 드리겠습니다.</p>
                <div className='cheap-button-box'>
                    {list.map(({ tab, name }) => (
                        <button key={tab} onClick={() => handleList(tab)}>{name}</button>
                    ))}
                </div>
            </div>
            {activeTab === 'reservation' &&// 항공권 일떄
                <div className='schedule-all-box'>
                    <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                        <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                        최선을 다해 답변해 드리겠습니다.</p>
                    <div className='cheap-button-box'>
                    {reservationList.map(({ tab, name }) => (
                        <button key={tab} onClick={() => handleReservationList(tab)}>{name}</button>
                    ))}
                    </div>
                </div>
            }
                {reserTab === 'reservation' && // 예약일때
                    <div className='schedule-all-box'>
                        <div className='cheap-button-box1'>
                            <button>단체 예약은 어떻게 하나요?</button>
                            {/* 챗봇 답변 :단체 예약은 10명이상이 동일한 여정으로 여행하시는 경우를 말합니다. 전 승객이 소아인 경우는 단체 및 개인 예약이 불가합니다. (최소 성인 1명 포함되어야함) 인원 일정과 출발 시간 결정되시면 가까운 여행사로 문의해주시기 바랍니다. */}
                            <button>대기 예약이 가능한가요? 항공권 구매 중 오류가 발생되어 좌석이 만석이 되었습니다.</button>
                            {/* 챗봇 답변 : 진에어는 예약과 동시에 발권이 이루어 지고 있습니다.
                            대기예약 및 오픈예매는 불가 하며, 홈페이지 예약시 모든 탑승객 정보 입력 후 결제 직전에 예약 번호가 생성되며 결제까지 정상적으로 완료 되어야 예약이 완료됩니다.
                            만석이었던 항공편일지라도 기존 예약하신 고객님께서 예약취소/환불/일정변경 등을 하실 경우, 예약 상황은 수시로 변경되어 잔여좌석이 발생할 수도 있으며, 항공권은 홈페이지 외 모바일,고객 서비스센터, 공항, 국내/외 여행사를 통해 동시 다발적으로 항공권이 판매 되고 있어 결제 도중 오류 발생 과정에 다른 고객님께서 좌석을 먼저 점유 하신다면 좌석 조회가 불가할 수 있다는 점 참고 부탁드립니다. */}
                            <button>티켓은 출발 며칠 전부터 예약 가능할까요? 티켓 구매 방법 알려주세요.</button>
                            {/*  챗봇 답변 :항공편의 조회 및 예매는 아래 기간의 출발편까지 가능합니다.
                        국내선 : 예매시점 1시간 이후 출발편부터 240일 이내의 출발편
                        국제선 : 예매시점 3시간 이후 출발편부터 361일 이내의 출발편
                        진에어 홈페이지 및 모바일을 통해 24시간 내내 항공권 예매가 가능하며, 고객서비스센터 또는 공항 및 대리점을 통해서도 구매 가능합니다. 고객서비스센터 또는 공항에서 신규 항공권을 구매하는 경우 수수료가 부과되며, 항공사의 사정에 따라 구매가능 시점은 변경될 수 있으니 자세한 사항은 진에어 홈페이지를 참고해주세요.
                        ​전체메뉴>예약>예약/결제 안내 */}
                        </div>
                    </div>
                }
            {activeTab === 'promotion' &&// 프로모션 일떄
                <div className='schedule-all-box'>
                    <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                        <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                        최선을 다해 답변해 드리겠습니다.</p>
                    <div className='cheap-button-box'>
                        <button>진마켓 할인에 대해 알고 싶습니다.</button>
                        <button>슬림한 잔은 무엇인가요?</button>
                        <button>프로모션 코드가 뭔가요? 어떻게 받을 수 있나요?</button>
                    </div>
                </div>
                //1번째
                //2번째
                //3번째
                //4번째
                //5번째
            }
            {activeTab === 'sale' &&// 할인제도 일떄
                <div className='schedule-all-box'>
                    <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                        <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                        최선을 다해 답변해 드리겠습니다.</p>
                    <div className='cheap-button-box'>
                        <button>유아는 할인이 적용 되나요?</button>
                        <button>가족 운임 할인 제도란 무엇인가요?</button>
                        <button>제주/재외도민 그리고 명예도민 할인 되나요?</button>
                        <button>기업 우대 할인은 어떻게 하나요?</button>
                    </div>
                </div>
                //1번째
                //2번째
                //3번째
                //4번째
            }
            {activeTab === 'checkin' &&// 체크인 일떄
                <div className='schedule-all-box'>
                    <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                        <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                        최선을 다해 답변해 드리겠습니다.</p>
                    <div className='cheap-button-box'>
                        <button>공항 체크인</button>
                        <button>웹 모바일 셀프 체크인</button>
                        <button>여행서류</button>
                        <button>카운터안내</button>
                    </div>
                </div>
                //1번째
                //2번째
                //3번째
                //4번째
            }
            {activeTab === 'baggage' &&// 수하물 일떄
                <div className='schedule-all-box'>
                    <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                        <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                        최선을 다해 답변해 드리겠습니다.</p>
                    <div className='cheap-button-box'>
                        <button>휴대수하물</button>
                        <button>위탁수하물</button>
                        <button>기내유실물</button>
                        <button>수하물배상</button>
                        <button>기내반입제한</button>
                    </div>
                </div>
                //1번째
                //2번째
                //3번째
                //4번째
                //5번째
            }
            {activeTab === 'point' &&//나비포인트 일떄
                <div className='schedule-all-box'>
                    <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                        <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                        최선을 다해 답변해 드리겠습니다.</p>
                    <div className='cheap-button-box'>
                        <button>나비포인트 적립/소멸</button>
                        <button>나비포인트 사용</button>
                        <button>대한항공 공동운항</button>
                    </div>
                </div>
                //1번째
                //2번째
                //3번째
            }
            {activeTab === 'etc' &&//기타 일때
                <>
                    <div className='schedule-all-box'>
                        <p>아래 목록중 문의 사항이 있으시면 선택해주세요!
                            <br /> 목록중에 원하는 질문이 없으시다면 저에게 직접 질문해주시면<br />
                            최선을 다해 답변해 드리겠습니다.</p>
                        <div className='cheap-button-box'>
                            <button>진에어 현황</button>
                            <button>대리점</button>
                            <button>제휴문의</button>
                        </div>
                    </div>
                    //진에어 현황 클릭
                    <div className='cheap-button-box'>
                        <button>운영 중인 비행기 기종과 좌석수를 알려주세요.</button>
                        <button>진에어 연혁에 대해서 알려주세요.</button>
                        <button>성수기와 비수기가 언제인가요?</button>
                    </div>
                        //1번 대답시
                    <div>진에어에서 운영하는 항공기 기종은 B737-800, B737-8, B737-900, B777-200ER 입니다.
                        <li>B737-800 : 대형 항공사에서 단거리 국제선에 운용하고 있는 기종이며, 100% 디지털 기술로 운항하는 737기종 중에서도 최신예 기종에 속하는 항공기</li>
                        <li>B737-8 : B737 시리즈 중 가장 최신에 개발된 항공기로 엔진 기술 향상 및 날개 개선 등 첨단 기술 적용으로 항속거리 및 효율성이 개선 된 항공기 입니다.</li>
                        <li>B737-900 : 대형 항공사에서 단거리 국제선에 운용하고 있는 기종이며, 100% 디지털 기술로 운항하는 737기종 중에서도 최신예 기종에 속하는 항공기</li>
                        <li>B777-200ER : 국내 LCC 최초로 도입한 항공기로 현재 운영 좌석 수는 393석이며, 장거리 노선을 운항할 수 있는 최첨단 항공기 입니다.</li>
                        <p>자세한 내용은 아래의 링크에서 확인해보세요.</p>
                        <a href="https://www.jinair.com/company/aircraft">항공기 소개</a>
                    </div>
                //2번 대답시
                //3번 대답시
                </>
            }
        </div>
    );
}

