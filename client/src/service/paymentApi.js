import { setTotalPaymentPrice as setTotalPaymentPriceAction } from '../features/booking/paymentSlice.js';

/*****************************
 * 비행편, 좌석 총합 전역 저장 
 *****************************/
export const updateTotalPrice = (totalPrice) => async(dispatch) => {
    dispatch(setTotalPaymentPriceAction(totalPrice));
}
 