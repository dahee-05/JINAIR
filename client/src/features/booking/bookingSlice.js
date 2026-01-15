import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {}, // 예매자 정보

    ticketList : [], // 예약 가능 항공권 목록
    resevationType : '', // 예약 타입(편도/왕복)
    oneWayBseats: [], // 베이직석 리스트
    oneWayPseats: [], // 프리미엄석 리스트
    
    flightNum: '', // 편도 비행편 번호(fNUM)
    seatType: '', // 편도 좌석 타입(일반석/프리미엄석)
    ticketPrice: 0, // 편도 좌석 가격
    oneWaySeats: [], // 편도 선택 좌석 리스트

    goFlightNum: '', // 왕복 가는 비행편 번호(fNUM)
    goSeatType: '', // 왕복 가는 비행편 좌석 타입
    goTicketPrice: 0, // 왕복 가는 비행편 가격
    goSeats: [], // 왕복 가는 비행편 좌석 리스트
    
    backFlightNum: '', // 왕복 오는 비행편 번호
    backSeatType: '', // 왕복 오는 비행편 좌석 타입
    backTicketPrice: 0, // 왕복 오는 비행편 가격
    backSeats: [], // 왕복 dh는 비행편 좌석 리스트

    passengers : [], // 탑승객 정보 배열

    dcode: '',
    acode: '',
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        // 예매자 정보
        setUserInfo(state, action) {
            state.userInfo = action.payload.userInfo;
        },

        // 예약 가능 항공권 목록(출발지, 도착지 기준)
        setTicketList(state, action) {
            state.ticketList = action.payload.result;
        },

        // 예약 타입(편도/왕복)
        setResevationType(state, action) {
            state.resevationType = action.payload;
        },

        // 편도 비행편 번호(fNUM)
        setFlightNum(state, action) {
            state.flightNum = action.payload;
        },

        // 편도 좌석 타입(일반석 또는 프리미엄석)
        setSeatType(state, action) {
            state.seatType = action.payload;
        },

        // 편도 좌석 가격
        setTicketPrice(state, action) {
            state.ticketPrice = action.payload;
        },

        // 편도 베이직석 리스트
        setOneWayBseats(state, action) {
            state.oneWayBseats = action.payload.basicList;
        }, 

        // 편도 프리미엄석 리스트
        setOneWayPseats(state, action) {
            state.oneWayPseats = action.payload.premiumList;
        },

        // 편도 선택 좌석 리스트
        setOneWaySeats(state, action) {
            state.oneWaySeats = action.payload;
        },

        // 왕복 가는 비행편 번호(fNUM)
        setGoFlightNum(state, action) {
            state.goFlightNum = action.payload;
        },

        // 왕복 가는 비행편 좌석 타입(일반석 또는 프리미엄석)
        setGoSeatType(state, action) {
            state.goSeatType = action.payload;
        },

        // 왕복 가는 비행편 좌석 가격
        setGoTicketPrice(state, action) {
            state.goTicketPrice = action.payload;
        },

        // 왕복 가는 비행편 선택 좌석 리스트
        setGoSeats(state, action) {
            state.goSeats = action.payload;
        },

        // 왕복 오는 비행편 번호(fNUM)
        setBackFlightNum(state, action) {
            state.backFlightNum = action.payload;
        },

        // 왕복 오는 비행편 좌석 타입(일반석 또는 프리미엄석)
        setBackSeatType(state, action) {
            state.backSeatType = action.payload;
        },

        // 왕복 오는 비행편 좌석 가격
        setBackTicketPrice(state, action) {
            state.backTicketPrice = action.payload;
        },

        // 왕복 오는 비행편 선택 좌석 리스트
        setBackSeats(state, action) {
            state.backSeats = action.payload;
        },

        // 출발 공항 코드
        setDcode(state, action) {
            state.dcode = action.payload.dcode;
        },
        
        // 도착 공항 코드
        setAcode(state, action) {
            state.acode = action.payload.acode;
        },

        // 탑승자 정보 배열
        setPassengers(state, action) {
            state.passengers = action.payload;
        },

        // 결제 후 예약 정보 초기화
        clearReservation(state) {
            //공통 초기화
            state.passengers = [];
            state.resevationType = '';
            state.ticketList = [];
            state.dcode = '';
            state.acode = '';
        
            // 편도 초기화
            state.flightNum = '';
            state.seatType = '';
            state.ticketPrice = 0;
            state.oneWaySeats = []; 
        
            // 왕복 초기화
            state.goFlightNum = '';
            state.goSeatType = '';
            state.goTicketPrice = 0;
            state.goSeats = [];
        
            state.backFlightNum = '';
            state.backSeatType = '';
            state.backTicketPrice = 0;
            state.backSeats = []; 
        }
    },
});

export const {
    setUserInfo,
    setTicketList,
    setResevationType,
    setFlightNum, setSeatType, setTicketPrice, setOneWayBseats, setOneWayPseats, setOneWaySeats, // 편도 관련
    setGoFlightNum, setGoSeatType, setGoTicketPrice, setGoSeats, // 왕복 가는 편 관련
    setBackFlightNum, setBackSeatType, setBackTicketPrice, setBackSeats, // 왕복 오는 편 관련
    setPassengers,
    setDcode, setAcode,
    clearReservation // 결제 후 예약 정보 초기화
} = bookingSlice.actions;

export default bookingSlice.reducer;