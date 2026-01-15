import {setModalOpen, setCalendar3, setCalendar4, setStartDate, setStartTime, setEndTime, setTimeModal, setEndDate, setType, setDeparture, setArrive, resetAll} from '../features/search/adminSearchSlice.js';

export const getModalOpen = (data) => (dispatch) => {
    data === true && dispatch(setModalOpen(data));
    data === false && dispatch(setModalOpen(data));
}
export const adTimeModal = (data) => (dispatch) => {
    data === true && dispatch(setModalOpen(data));
    data === false && dispatch(setModalOpen(data));
}
export const getCalendar3 = (data) => (dispatch) => {
    data === true && dispatch(setCalendar3(data));
    data === false && dispatch(setCalendar3(data));
}
export const getCalendar4 = (data) => (dispatch) => {
    data === true && dispatch(setCalendar4(data));
    data === false && dispatch(setCalendar4(data));
}
export const getStartDate = (date) => (dispatch) => {
    dispatch(setStartDate(date));
}
export const getStartTime = (time) => (dispatch) => {
  dispatch(setStartTime(time));
};

export const getEndTime = (time) => (dispatch) => {
  dispatch(setEndTime(time));
};

export const getTimeModal = (bool) => (dispatch) => {
  dispatch(setTimeModal(bool));
};
export const getEndDate = (date) => (dispatch) => {
    dispatch(setEndDate(date));
}
export const getType = (type) => (dispatch) => {
    dispatch(setType(type));
}
export const getDeparture = (country) => (dispatch) => {
    dispatch(setDeparture(country));
}
export const getArrive = (country) => (dispatch) => {
    dispatch(setArrive(country));
}
export const resetSearchState = () => (dispatch) => {
  dispatch(resetAll());
};