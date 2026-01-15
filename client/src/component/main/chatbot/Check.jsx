import React, { useState, useRef } from 'react';

export default function Check() {
    const [airnum, setAirnum] = useState(false);
    const [airnum2, setAirnum2] = useState(false);
    const [country, setCountry] = useState(false);
    const [country2, setCountry2] = useState(false);
    const [airNumber, setAirNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [email, setEmail] = useState('');
    const airnumEmailRef = useRef(null);
    const airnumDateRef = useRef(null);
    const airnumRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const [startCountry, setStartCountry] = useState(''); // 편도
    const [endCountry, setEndCountry] = useState(''); // 편도

    const data = [
        '서울/인천(ICN)',
        '서울/김포(GMP)',
        '부산(PUS)',
        '제주(CJU)',
        '광주(KWJ)',
        '군산(KUV)',
        '대구(TAE)',
        '무안(MWX)',
        '사천(HIN)',
        '울산(USN)',
        '원주(WJU)',
        '여수(RSU)',
        '청주(CJJ)',
        '포항/경주(KPO)',
        '도쿄/나리타(NRT)',
        '오사카/간사이(KIX)',
        '후쿠오카(FUK)',
        '기타큐슈(KKJ)',
        '나고야(NGO)',
        '다카마쓰(TAK)',
        '미야코지마/시모지시마(SHI)',
        '이시가키지마(ISG)',
        '삿포로(CTS)',
        '오키나와(OKA)',
        '상하이/푸둥(PVG)',
        '시안(XIY)',
        '정저우(CGO)',
        '홍콩(HKG)',
        '마카오(MFM)',
        '타이베이/타오위안(TPE)',
        '타이중(RMQ)',
        '방콕(BKK)',
        '푸껫(HKT)',
        '치앙마이(CNX)',
        '세부(CEB)',
        '클락(CRK)',
        '보홀(TAG)',
        '다낭(DAD)',
        '나트랑(CXR)',
        '푸꾸옥(PQC)',
        '비엔티안(VTE)',
        '코타키나발루(BKI)',
        '괌(GUM)',
        '울란바토르(UBN)'
    ];
    const processedList = data.map(item => item.split("(")[0]);
    const valiAir = () => {
        if (airnumRef.current.value === '') {
            airnumRef.current.focus();
            return false;
        } else if (airnumDateRef.current.value === '') {
            airnumDateRef.current.focus();
            return false;
        } else if (airnumEmailRef.current.value === '') {
            airnumEmailRef.current.focus();
            return false;
        }
        return true;
    }
    const handleNum = () => {
        setAirNumber(airnumRef.current.value);
    }
    const handleEmail = () => {
        setEmail(airnumEmailRef.current.value);
    }
    const handleDate = () => {
        setStartDate(airnumDateRef.current.value);
    }
    const handleAirnum = () => {
        if (valiAir()) {
            setAirnum2(true);
        }
    }
    const handleStart = () => {
        setStartCountry(startRef.current.value);
    }
    const handleEnd = () => {
        setEndCountry(endRef.current.value);
    }
    const vali = () => {
        if (startCountry === '') {
            startRef.current.focus();
            return false;
        } else if (endCountry === '') {
            endRef.current.focus();
            return false;
        } else if (startDate === '') {
            airnumDateRef.current.focus();
            return false;
        }
        return true;
    }
    const ScheduleCheckRound = () => { // 왕복
        if (vali()) {
            setCountry2(true);
        }
    }
    return (
        <div className='chatbot-check-all-box'>
            <div className='schedule-all-box'>
                <p>항공운항확인서 발급을 선택하셨습니다!<br />
                    결항/지연/회항 등의 운항 확인서를 발급 받으 실 수 있습니다.
                    <br />발급 방법을 선택해주세요!
                </p>
                <div className='cheap-button-box'>
                    <button onClick={() => { setAirnum(true); setCountry(false) }}>편명으로 조회</button>
                    <button onClick={() => { setCountry(true); setAirnum(false); }}>출도착지로 조회</button>
                </div>
            </div>
            {airnum &&
                <div className='schedule-all-box'>
                    <div>
                        <p>진에어 항공편의 출도착 조회를 도와드릴게요~</p>
                        <p>편명과 날짜를 입력해주세요!</p>
                    </div>
                    <div className='schedule-calendar-check-box'>
                        <span>편명</span>
                        <input type="text" placeholder='LJ001 형식으로 입력해주세요'
                            ref={airnumRef} onChange={handleNum} />
                    </div>
                    <div className='schedule-calendar-check-box'>
                        <span>가는날</span>
                        <input type="date" ref={airnumDateRef} onChange={handleDate}
                        />
                    </div>
                    <div className='schedule-calendar-check-box'>
                        <span>이메일주소</span>
                        <input type="text" placeholder='hong123@gmail.com 형식으로 입력해주세요'
                            ref={airnumEmailRef} onChange={handleEmail} />
                    </div>
                    <div className='cheap-button-box'>
                        <button onClick={handleAirnum}>확인</button>
                    </div>
                </div>
            }
            {airnum2 &&
                <div className='schedule-all-box'>
                    <p>[출발일:{startDate}, 편명:{airNumber}] <br />
                        {email}로 운항정보확인서 전송을 완료하였습니다.</p>
                </div>
            }
            {country &&
                <div className='schedule-all-box'>
                    <p>츨/도착지와 날짜를 선택해주세요!</p>
                    <div className='schedule-country-check-box'>
                        <span>출발/도착</span>
                        <select ref={startRef} name="" id="" onChange={handleStart}>
                            <option value='default'>선택</option>
                            {processedList.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                        <select ref={endRef} name="" id="" onChange={handleEnd}>
                            <option value='default'>선택</option>
                            {processedList.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                    </div>
                    <div className='schedule-calendar-check-box'>
                        <span>가는날</span>
                        <input ref={airnumDateRef} type="date" onChange={handleDate} />
                    </div>
                    <div className='cheap-button-box'>
                        <button onClick={() => { ScheduleCheckRound() }}>확인</button>
                    </div>
                </div>
            }
            {country2 &&
                <>
                    <div className='schedule-all-box'>
                        <p>[출발일:{startDate}, 출발지:{startCountry}, 도착지:{endCountry}]</p>
                        <p>아래 버튼을 눌러 항공운항 확인서를 발급해 주세요</p>
                        <div className='cheap-button-box'>
                            <button>항공운항확인서 발급하기</button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

