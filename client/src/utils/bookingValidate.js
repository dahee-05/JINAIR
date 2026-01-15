/*******************************
 * 탑승객 정보 입력 폼 유효성 체크
********************************/
export const validate = (actualInputFormCount, refsList, msgRefsList, passengers) => {
    let result = true;
    for (let i = 0; i < actualInputFormCount; i++) {
        const refs = refsList.current[i];
        const msgRefs = msgRefsList.current[i];
        const passengerIndex = i + 1; // 0번은 로그인 유저라 제외


        if (refs.firstNameRef.current.value.trim() === '') {
            msgRefs.firstNameMsgRef.current.style.display = 'block';
            refs.firstNameRef.current.focus();
            result = false;
        } else {
            msgRefs.firstNameMsgRef.current.style.display = 'none';
        }

        if (refs.lastNameRef.current.value.trim() === '') {
            msgRefs.lastNameMsgRef.current.style.display = 'block';
            if (result) refs.lastNameRef.current.focus();
            result = false;
        } else {
            msgRefs.lastNameMsgRef.current.style.display = 'none';
        }

        if (refs.birthRef.current.value.trim() === '') {
            msgRefs.birthMsgRef.current.style.display = 'block';
            if (result) refs.birthRef.current.focus();
            result = false;
        } else {
            msgRefs.birthMsgRef.current.style.display = 'none';
        }

        if (!passengers[passengerIndex].gender || passengers[passengerIndex].gender.trim() === '') {
            msgRefs.genderMsgRef.current.style.display = 'block';
            result = false;
        } else {
            msgRefs.genderMsgRef.current.style.display = 'none';
        }
    }

    return result;
}