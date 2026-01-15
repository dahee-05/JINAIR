import React, { useEffect, useState, useRef } from 'react';

export default function ExchangeRate({ handleLeave, setIsHover }) {
  const [rates, setRates] = useState(null);
  const [originRate, setOriginRate] = useState(null);
  const [converted, setConverted] = useState({ usd: '', eur: '', jpy: '' });

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json')
      .then(res => res.json())
      .then(data => {
        const filteredNotBase = {
          usd: data.krw.usd,
          eur: data.krw.eur,
          jpy: data.krw.jpy ,
          date: data.date,
        };
        setOriginRate(filteredNotBase);
        const baseAmount = 1000;
        const filtered = {
          usd: data.krw.usd * baseAmount,
          eur: data.krw.eur * baseAmount,
          jpy: data.krw.jpy * baseAmount,
          date: data.date,
          base: 'KRW',
          amount: baseAmount
        };
        setRates(filtered);
      })
      .catch(err => console.error('환율 데이터 오류:', err));
  }, []);

  const won1 = useRef(null);
  const won2 = useRef(null);
  const won3 = useRef(null);


  const handleWon = () => {
    if (!originRate) return;
  
    const v1 = parseFloat(won1.current.value || 0);
    const v2 = parseFloat(won2.current.value || 0);
    const v3 = parseFloat(won3.current.value || 0);
  
    setConverted({
      usd: (v1 * originRate.usd).toFixed(2),
      eur: (v2 * originRate.eur).toFixed(2),
      jpy: (v3 * originRate.jpy).toFixed(2),
    });
  };

  return (
    <div className='header_exchange' onMouseLeave={handleLeave}>
      <h2 className="">{rates?.date} <br />KRW 1,000원 기준 환율</h2>
      {rates ? (
        <>
          <ul className="">
            <li>USD : {rates.usd.toFixed(2)}달러</li>
            <li>EUR : {rates.eur.toFixed(2)}유로</li>
            <li>JPY : {rates.jpy.toFixed(1)}엔</li>
          </ul>
          <div>
            <span>환율계산</span><br />
            <ul>
              <li>
                <label htmlFor="">₩&nbsp;</label>
                <input type="number" onChange={handleWon} ref={won1} name='won1'/>
              </li>
              <li>&#8594;</li>
              <li>
                <label htmlFor="">&nbsp;$&nbsp;&nbsp;</label>
                <input type="number"  value={converted.usd} readOnly/>
              </li>
            </ul>
            <ul>
              <li>
                <label htmlFor="">₩&nbsp;</label>
                <input type="number" onChange={handleWon} ref={won2} name='won2' />
              </li>
              <li>&#8594;</li>
              <li>
                <label htmlFor="">&nbsp;€&nbsp;&nbsp;</label>
                <input type="number" value={converted.eur} readOnly/>
              </li>
            </ul>
            <ul>
              <li>
                <label htmlFor="">₩&nbsp;</label>
                <input type="number" onChange={handleWon} ref={won3}  name='won3'/>
              </li>
              <li>&#8594;</li>
              <li>
                <label htmlFor="">￥&nbsp;</label>
                <input type="number"value={converted.jpy} readOnly />
              </li>
            </ul>
          </div>
        </>
      ) : (
        <p>환율 불러오는 중...</p>
      )}
    </div>
  );
};

