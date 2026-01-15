import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function Postcode({ onCompleteAddress,  onClose }) {
  const [zipcode, setZipcode] = useState(''); // 우편번호
  const [roadAddress, setRoadAddress] = useState(''); // 도로명
  const [detailAddress, setDetailAddress] = useState(''); // 상세

  // 검색된 주소 저장
  const handleComplete = (data) => {
    const fullRoadAddress = data.roadAddress; 
    const zoneCode = data.zonecode;

    setZipcode(zoneCode);
    setRoadAddress(fullRoadAddress);

    if (onCompleteAddress) {
      onCompleteAddress({
        zipcode: zoneCode,
        roadAddress: fullRoadAddress,
        detailAddress,
      });
    }
  };

  // 주소 수정 버튼 클릭시 submit
  const handleSubmit = () => {
    if (!zipcode || !roadAddress) {
      alert('주소를 먼저 검색해주세요.');
      return;
    }
  
    if (onCompleteAddress) {
      onCompleteAddress({
        zipcode,
        roadAddress,
        detailAddress,
      });
    }
  
    if (onClose) onClose();
  };
  

  return (
    <div className='r-common layer-contents'>
      <div className='layer-header'>
        <p className='layer-header-title'>우편번호 검색</p>
        <div className="border-line" />
      </div>

      <div className='layer-contents'>
        <p className='f16'>도로명 주소를 검색 해주세요.</p>

        <div className='field-wrapper'>
          <div className='flex gap10'>
            <input type="text" disabled value={zipcode} placeholder="우편번호" style={{ flex: 1 }} />
            <input type="text" disabled value={roadAddress} placeholder="도로명 + 건물 번호" style={{ flex: 3 }} />
          </div>

          <div className='flex gap10'>
            <input
              className='w300'
              type="text"
              placeholder="상세 주소 입력"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
            <button className='info-navy-btn' onClick={handleSubmit}>주소 수정</button>
          </div>
        </div>
      </div>

      <DaumPostcode
        onComplete={handleComplete}
        autoClose={false}
        style={{
          width: '95%',
          height: '400px',
          margin: '20px auto',
        }}
      />
    </div>
  );
}
