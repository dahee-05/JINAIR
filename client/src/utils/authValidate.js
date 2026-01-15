// import { useState } from "react";


/***************************** 
 * 로그인 유효성 체크
*****************************/
export const validateLogin = (refs, msgRef) => {

  if(refs.idRef.current.value === ''){
    msgRef.current.style.setProperty('color','red');
    refs.idRef.current.focus();
    return {result:false, msg: '아이디를 입력해주세요.'};
  }else if(refs.pwdRef.current.value === ''){
    msgRef.current.style.setProperty('color','red');
    refs.pwdRef.current.focus();
    return {result: false, msg:'비밀번호를 입력해주세요.'}
  }else{
    return {result:true, msg:''};
  }
};

/***************************** 
 * 아이디 / 비밀번호 찾기 유효성 체크
*****************************/
export const validateFindUseInfo = (refs, msgRefs, item, gender, active, cactive) =>{
    const validateArr = [];
    if(item === 'pwd'){
      validateArr.push({ 
        key: 'id', 
        ref:refs.idRef.current, 
        msgSty:msgRefs.idMsgRef.current,
        msg:'아이디를 입력해주세요',
        value:refs.idRef.current.value
    })}

    validateArr.push(
      { key: 'name', 
        ref:refs.nameRef.current, 
        msgSty:msgRefs.nameMsgRef.current,
        msg:'이름을 입력해주세요',
        value:refs.nameRef.current.value},
      { key: 'gender', 
        ref:refs.genderMaleRef.current, 
        msgSty:msgRefs.genderMsgRef.current,
        msg:'성별을 입력해주세요',
        value:gender},
      { key: 'birth',  
        ref:refs.birthRef.current, 
        msgSty:msgRefs.birthMsgRef.current,
        msg:'생년월일을 입력해주세요',
        value:refs.birthRef.current.value},
      { key: 'email',
        ref: refs.emailRef.current,
        msgSty: msgRefs.emailMsgRef.current,
        msg: '이메일을 입력해주세요',
        value: refs.emailRef.current.value}
      );  

    for(let arr of validateArr){
      if(!arr.value || arr.value.trim() === ''){
        arr.ref.focus();
        return {result: false, msg:arr.msg, key:arr.key}
    }}
    
    if(!active){
      return {result: false, msg:'인증번호를 요청해주세요', key:'req-auth'}
    }

    const authCode = refs.authCodeRef.current.value;
    if(!authCode || authCode.trim() === ''){
      refs.authCodeRef.current.focus();
      return {result: false, msg:'인증번호를 입력해주세요', key:'auth-code'}
    }     
    
    if(!cactive){
      return {result:false, msg:'인증하기 버튼을 클릭해주세요', key:'auth-btn'};
    }
  return { result: true, msg: '' , key:'' };
};



/***************************** 
 * 회원가입 회원정보 입력 유효성 체크
*****************************/
export const validateUserSignup = (refs, msgRefs, item, gender, active, cactive) =>{
  const pwd = refs.pwdRef.current.value.trim();
  const cpwd = refs.cpwdRef.current.value.trim();

  const validateArr = [
    {key: 'id', 
     ref:refs.idRef.current, 
     msgSty:msgRefs.idMsgRef.current,
     msg:'아이디를 입력해주세요',
     value:refs.idRef.current.value},
     { key: 'kname_first', 
      ref:refs.knameFirstRef.current, 
      msgSty:msgRefs.knameFirstMsgRef.current,
      msg:'성(한글)을 입력해주세요',
      value:refs.knameFirstRef.current.value},
     { key: 'kname_last', 
      ref:refs.knameLastRef.current, 
      msgSty:msgRefs.knameFLastMsgRef.current,
      msg:'성(이름)을 입력해주세요',
      value:refs.knameLastRef.current.value},
    { key: 'gender', 
      ref:refs.genderMaleRef.current, 
      msgSty:msgRefs.genderMsgRef.current,
      msg:'성별을 입력해주세요',
      value:gender},
     { key: 'ename_first', 
      ref:refs.enameFirtstRef.current, 
      msgSty:msgRefs.enameFirstMsgRef.current,
      msg:'성(영문)을 입력해주세요',
      value:refs.enameFirtstRef.current.value},
     { key: 'ename_last', 
      ref:refs.enameLastRef.current, 
      msgSty:msgRefs.enameLastMsgRef.current,
      msg:'이름(영문)을 입력해주세요',
      value:refs.enameLastRef.current.value},
    { key: 'email',
      ref: refs.emailRef.current,
      msgSty: msgRefs.emailMsgRef.current,
      msg: '이메일을 입력해주세요',
      value: refs.emailRef.current.value},
    { key: 'birth',  
      ref:refs.birthRef.current, 
      msgSty:msgRefs.birthMsgRef.current,
      msg:'생년월일을 입력해주세요',
      value:refs.birthRef.current.value},
    { key: 'phone',
      ref: refs.phoneRef.current,
      msgSty: msgRefs.phoneMsgRef.current,
      msg: '휴대폰번호를 입력해주세요',
      value: refs.phoneRef.current.value},
    { key: 'password',
      ref: refs.pwdRef.current,
      msgSty: msgRefs.pwdMsgRef.current,
      msg: '비밀번호를 입력해주세요',
      value: refs.pwdRef.current.value},
    { key: 'cpassword',
      ref: refs.cpwdRef.current,
      msgSty: msgRefs.cpwdMsgRef.current,
      msg: '비밀번호 확인을 입력해주세요',
      value: refs.cpwdRef.current.value}
  ];

  for(let arr of validateArr){
    if(!arr.value || arr.value.trim() === ''){
      arr.ref.focus();
      return {result: false, msg:arr.msg, key:arr.key}
  }};

  if (pwd !== cpwd) {
    refs.cpwdRef.current.focus();
    return {
      result: false,
      msg: '비밀번호가 일치하지 않습니다. 다시 입력해주세요',
      key: 'cpassword'
    };
  };
  return { result: true, msg: '' , key:'' };
};