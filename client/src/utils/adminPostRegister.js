
/***************************** 
 * 어드민 항공권 등록 유효성 체크
*****************************/
export const validateFlightAdd = (refs) =>{
  const validateArr = [
    { key: 'adDeparture', ref: refs.adDepartureRef, msg: '출발지를 선택해주세요.' },
    { key: 'adArrive', ref: refs.adArriveRef, msg: '도착지를 선택해주세요.' },
    { key: 'adStartDate', ref: refs.adStartDateRef, msg: '출발 일자를 선택해주세요.' },
    { key: 'adStartTime', ref: refs.adStartTimeRef, msg: '출발 시간을 선택해주세요.' },
    { key: 'adEndDate', ref: refs.adEndDateRef, msg: '도착 일자를 선택해주세요.' },
    { key: 'adEndTime', ref: refs.adEndTimeRef, msg: '도착 시간을 선택해주세요.' },
    { key: 'pnum', ref: refs.pnumRef, msg: '비행기 번호를 선택해주세요.' },
    { key: 'basicPrice', ref: refs.basicPriceRef, msg: '기본 가격을 입력해주세요.' },
    { key: 'prePrice', ref: refs.prePriceRef, msg: '프리미엄 가격을 입력해주세요.' }
  ];

  const errors = {};

  for (const { key, ref, msg } of validateArr) {
    if (!ref?.current) continue;

    const value = ref.current.value;
    if(key === 'pnum' && value ==='default'){
      errors[key] = msg;
      ref.current.focus();
      return { result: false, msgResult: {[key]:msg}, msgCheck:key};
    }else if (!value || value.trim() === '') {
      errors[key] = msg;
      ref.current.focus();
      return { result: false, msgResult: {[key]:msg}, msgCheck:key};
    }
  }
  return {result: true, msgResult: {}, msgCheck: ''};
};





