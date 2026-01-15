import {setModalOpen, setPeopleModal ,setCalendar, setCalendar2,setTab,setSearchTab,
    setAdultNum,  setPediatricNum,  setBabyNum, setTotal,setCalendar3,setChatbotModalOpen,
    setDeparture,setArrive,  setStartDate,setEndDate,setType,setCountryList,setCalendarType,
    setMessage,setReserMessage,setReserMessage1, setCheckinDate,setCheckinFirstNm,setCheckinLastNm,setCheckinResnum,
  } from "../features/search/searchSlice.js";
import { axiosPost } from "./api.js";

export const getModalOpen = (data) => (dispatch) => {
    data === true && dispatch(setModalOpen(data));
    data === false && dispatch(setModalOpen(data));
}
export const getChatbotModalOpen = (data) => (dispatch) => {
    data === true && dispatch(setChatbotModalOpen(data));
    data === false && dispatch(setChatbotModalOpen(data));
}
export const getPeopleModal = (data) => (dispatch) => {
    data === true && dispatch(setPeopleModal(data));
    data === false && dispatch(setPeopleModal(data));
}
export const getCalendar = (data) => (dispatch) => {
    data === true && dispatch(setCalendar(data));
    data === false && dispatch(setCalendar(data));
}
export const getCalendar2 = (data) => (dispatch) => {
    data === true && dispatch(setCalendar2(data));
    data === false && dispatch(setCalendar2(data));
}
export const getCalendar3 = (data) => (dispatch) => {
    data === true && dispatch(setCalendar3(data));
    data === false && dispatch(setCalendar3(data));
}

export const getAdultNum = (num) => (dispatch) => {
    dispatch(setAdultNum(num));
}
export const getPediatricNum = (num) => (dispatch) => {
    dispatch(setPediatricNum(num));
}
export const getBabyNum = (num) => (dispatch) => {
    dispatch(setBabyNum(num));
}
export const getTotal = (num) => (dispatch) => {
    dispatch(setTotal(num));
}

export const getDeparture = (country) => (dispatch) => {
    dispatch(setDeparture(country));
}
export const getArrive = (country) => (dispatch) => {
    dispatch(setArrive(country));
}

export const getStartDate = (date) => (dispatch) => {
    dispatch(setStartDate(date));
}
export const getEndDate = (date) => (dispatch) => {
    dispatch(setEndDate(date));
}

export const getType = (type) => (dispatch) => {
    dispatch(setType(type));
}

export const getCalendarType = (type) => (dispatch) => {
    dispatch(setCalendarType(type));
}

/** 
 * 나라데이터 가져오기
 */
export const getCountry = () => async(dispatch) => {
    const url = 'http://localhost:9000chatbot';

    const result = await axiosPost({url}); 
    if(result) {
        dispatch(setCountryList(result));
    }
}

export const getTab = (tab) => (dispatch) => {
    dispatch(setTab(tab));
}
export const getSearchTab = (tab) => (dispatch) => {
    dispatch(setSearchTab(tab));
}

export const getMessage = (tab) => (dispatch) => {
    dispatch(setMessage(tab));
}
export const getReserMessage = (tab) => (dispatch) => {
    dispatch(setReserMessage(tab));
}
export const getReserMessage1 = (tab) => (dispatch) => {
    dispatch(setReserMessage1(tab));
}

export const getCheckinDate = (tab) => (dispatch) => {
    dispatch(setCheckinDate(tab));
}
export const getCheckinLastNm = (tab) => (dispatch) => {
    dispatch(setCheckinLastNm(tab));
}
export const getCheckinFirstNm = (tab) => (dispatch) => {
    dispatch(setCheckinFirstNm(tab));
}
export const getCheckinResnum = (tab) => (dispatch) => {
    dispatch(setCheckinResnum(tab));
}
