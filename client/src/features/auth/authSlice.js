import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn : false,
  isError : false,
  adminIsLoggedIn : false,
  adminIsError : false
}

export const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers:{
    setIsLoggedIn(state, action){
      if(action.payload.cnt){
        state.isLoggedIn = true;  
      }else{
        state.isError =true;
      }
    },
    setLoginReset(state){
      state.isError = false;
    }, 
    setIsLogout(state){
      state.isLoggedIn = false;
    },
    setAdminIsLoggedIn(state, action){
      if(action.payload.cnt){
        state.adminIsLoggedIn = true;  
      }else{
        state.isError =true;
      }
    },
    setAdminLoginResest(state){
      state.adminIsError = false;
    },
    setAdminLogout(state){
      state.adminIsLoggedIn = false;
    },
    resetAll(state){
      state.isLoggedIn = false;
      state.isError = false;
      state.adminIsLoggedIn = false;
      state.adminIsError = false;
    }
  },
});

export const { setIsLoggedIn, setLoginReset, setIsLogout, setAdminIsLoggedIn, setAdminLoginResest, setAdminLogout, resetAll} = authSlice.actions

export default authSlice.reducer
/* 
 * Redux Toolkit : "자동화된 switch-case reducer"
 * 내부적으로 switch-case 형태의 reducer로 실행되게 만들어줌
*/