import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  adModalOpen: false,
  adCalendar3: false,
  adCalendar4: false,
  adTimeModal: false,
  adStartDate: '',  // 출발일
  adEndDate: '', // 도착일
  adStartTime: '',
  adEndTime: '',
  adType: 'n',
  adDeparture: '', // 출발지
  adArrive: '', // 도착지

}

export const adminSearchSlice = createSlice({
  name: 'adSearch',
  initialState,
  reducers: {
    setModalOpen(state, action) {
      state.adModalOpen = action.payload;
    },
    setCalendar3(state, action) {
      state.adCalendar3 = action.payload;
    },
    setCalendar4(state, action) {
      state.adCalendar4 = action.payload;
    },
    setStartDate(state, action) {
      state.adStartDate = action.payload;
    },
    setEndDate(state, action) {
      state.adEndDate = action.payload;
    },
    setTimeModal(state, action) {
      state.adTimeModal = action.payload;
    },
    setStartTime(state, action) {
      state.adStartTime = action.payload;
    },
    setEndTime(state, action) {
      state.adEndTime = action.payload;
    },
    setType(state, action) {
      state.adType = action.payload;
    },
    setDeparture(state, action) {
      state.adDeparture = action.payload;
    },
    setArrive(state, action) {
      state.adArrive = action.payload;
    },
    resetAll(state) {
      state.adModalOpen = false;
      state.adCalendar3 = false;
      state.adCalendar4 = false;
      state.adTimeModal = false;
      state.adStartDate = '';
      state.adEndDate = '';
      state.adStartTime = '';
      state.adEndTime = '';
      state.adType = 'n';
      state.adDeparture = '';
      state.adArrive = '';
    }
  }
});

export const {setModalOpen, setCalendar3, setCalendar4, setStartDate, setEndDate, setStartTime, setEndTime, setTimeModal, setType, setDeparture, setArrive, resetAll} = adminSearchSlice.actions;

export default adminSearchSlice.reducer;