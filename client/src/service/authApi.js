import { setIsLoggedIn, setLoginReset, setIsLogout, setAdminIsLoggedIn, setAdminLoginResest, setAdminLogout, resetAll } from '../features/auth/authSlice.js';
import { getUserInfo } from './bookingApi.js';
import { axiosPost } from'./api.js';

/***************************** 
 * 로그인 
*****************************/
export const getLogin = (formData) =>async(dispatch) =>{
  const url = `http://localhost:9000member/login`;
  const data = formData;

  const loginResult = await axiosPost({url, data});
  
  const cnt = loginResult.cnt;

  if(cnt){
    localStorage.setItem("token",loginResult.token);
    localStorage.setItem("user_id",formData.id);
    dispatch(setIsLoggedIn({cnt}));
    dispatch(getUserInfo());
  }else{
    dispatch(setIsLoggedIn({cnt}))
  }
};

/***************************** 
 * 로그인 리셋
*****************************/
export const getLoginResest = () => async(dispatch) =>{
  dispatch(setLoginReset());
};

/***************************** 
 * 로그아웃
*****************************/
export const getLogout = () => async(dispatch) =>{
  localStorage.clear();
  dispatch(setIsLogout());
  dispatch(resetAll());
};


/***************************** 
 * 어드민 로그인 
*****************************/
export const getAdminLogin = (formData) => async(dispatch) => {
  const url = `http://localhost:9000admin/login`;
  const data = formData; 

  const loginResult = await axiosPost({url, data});
  const cnt = loginResult.cnt;

  if(loginResult.cnt){
    localStorage.setItem("admin_id",formData.id);
    localStorage.setItem("token",loginResult.token);
    dispatch(setAdminIsLoggedIn({cnt}))
  }else{
    dispatch(setAdminIsLoggedIn({cnt}))
  }
};

/***************************** 
 * 어드민 로그인 리셋
*****************************/
export const getAdminLoginResest = () => async(dispatch) =>{
  dispatch(setAdminLoginResest());
};

/***************************** 
 * 어드민 로그아웃
*****************************/
export const getAdminLogout = () => async(dispatch) =>{
  localStorage.clear();
  dispatch(setAdminLogout());
}