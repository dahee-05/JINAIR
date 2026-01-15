import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',   // 인풋 초기화
    reserMessage: '', // 전달할 값1
    reserMessage1: '', // 전달할 값2
    searchTab: 'roundTrip' ,// MainSearch 왕복편도다구간 탭
    tab: 'main',  
    chatbotModalOpen: false,
    modalOpen: false,
    peopleModal: false,
    calendar: false,
    calendar2: false,
    calendar3: false,
    type: 'n',
    departure: '', // 출발지
    arrive: '', // 도착지
    multiDepart: '',
    multiArr: '',
    adultNum: 1, // 성인 수
    pediatricNum: 0,    // 소아 수 
    babyNum: 0, // 유아 수
    total: 0,
    startDate: '',  // 출발일
    startDate2: '',
    endDate: '', // 도착일
    countryList: [],
    calendarType: '',
    checkinResnum : '',  //체크인 예약번호
    checkinLastNm : '', // 체크인 성
    checkinFirstNm : '', //체크인 이름
    checkinDate : '', //체크인 출발일
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setCheckinResnum(state, action){
            state.checkinResnum = action.payload;

        },
        setCheckinLastNm(state, action){
            state.checkinLastNm = action.payload;

        },
        setCheckinFirstNm(state, action){
            state.checkinFirstNm = action.payload;

        },
        setCheckinDate(state, action){
            state.checkinDate = action.payload;

        },
        setMessage(state, action){
            state.message = action.payload;
        },
        setReserMessage(state, action){
            state.reserMessage = action.payload;
        },
        setReserMessage1(state, action){
            state.reserMessage1 = action.payload;
        },
        setSearchTab(state, action){
            state.searchTab = action.payload;
        },
        setTab(state, action) {
            state.tab = action.payload;
        },
        setChatbotModalOpen(state, action) {
            state.chatbotModalOpen = action.payload;
        },
        setCalendarType(state, action) {
            state.countryList = action.payload;
        },
        setCountryList(state, action) {
            state.countryList = action.payload;
        },
        setModalOpen(state, action) {
            state.modalOpen = action.payload;
        },
        setPeopleModal(state, action) {
            state.peopleModal = action.payload;
        },
        setCalendar(state, action) {
            state.calendar = action.payload;
        },
        setCalendar2(state, action) {
            state.calendar2 = action.payload;
        },
        setCalendar3(state, action) {
            state.calendar3 = action.payload;
        },
        setAdultNum(state, action) {
            state.adultNum = action.payload;

        }, setPediatricNum(state, action) {
            state.pediatricNum = action.payload;
        }, setBabyNum(state, action) {
            state.babyNum = action.payload;
        }, setTotal(state, action) {
            state.total = action.payload;
        },
        setType(state, action) {
            state.type = action.payload;
        },
        setDeparture(state, action) {
            state.departure = action.payload;
        },
        setArrive(state, action) {
            state.arrive = action.payload;
        },
        setStartDate(state, action) {
            state.startDate = action.payload;
        }, setStartDate2() {

        }, setEndDate(state, action) {
            state.endDate = action.payload;
        },
        // 🎯 여기에 초기화 액션 추가
        resetSearch: () => initialState
    },
})

export const { setModalOpen, setPeopleModal, setCalendar, setCalendar2, setCalendar3,
    setMessage,setReserMessage,setReserMessage1,
    setCheckinDate,setCheckinFirstNm,setCheckinLastNm,setCheckinResnum,
    setAdultNum, setPediatricNum, setBabyNum, setTotal, setDeparture, setArrive,setTab,setSearchTab,
    setStartDate, setEndDate, setType, resetSearch, setCountryList, setCalendarType, setChatbotModalOpen
} = searchSlice.actions
export default searchSlice.reducer