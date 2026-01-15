import React, { useEffect } from 'react';
import { getMyCoupon, applyCoupon  } from '../../service/myinfoApi.js';
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';


export default function MyCoupon() {

    const dispatch = useDispatch();
    const myCouponList = useSelector((state) => state.myinfo.mycoupon);
    dayjs.locale('ko');  // 날짜 포맷
    
    /* 쿠폰 목록 불러오기 */
    useEffect(() => {
        dispatch(getMyCoupon());
    }, [])

    /* 해당 쿠폰 사용 버튼 */
    // const handleUseCoupon = (couponCode) => {
    //     dispatch(applyCoupon(couponCode));
    // };


    return (
        <div className='r-common layer-contents'>
            <div className='layer-header'>
                <p className='layer-header-title'>사용 가능 쿠폰 내역</p>
                <div className="border-line" />
            </div> {/* 타이틀 끝 */}
                <p className='coupon-desc'>* 쿠폰은 결제 시에 적용 가능합니다.</p>
            <ul className='coupon-list'>
            {myCouponList && myCouponList.length > 0 ? (
    myCouponList.map((coupon) => (
                        <li className='coupon-wrap'>
                            <div className='coupon-top'>
                                <span className='f16'>항공권 할인 쿠폰</span>
                            </div>
                            <div className='coupon-contents'>
                                <p className='coupon-name' >{coupon.coupon_name}</p>
                                <p className='f12 w300'>[사용 유효기간]
                                     {dayjs(coupon.start_date).format('YYYY.MM.DD (ddd)')}
                                    ~ {dayjs(coupon.end_date).format('YYYY.MM.DD (ddd)')}
                                    </p>
                                <p className='f12 w300'>[사용가능 구간] 왕복, 편도</p>
                            </div>
                            <div className='coupon-bottom'>
                                <b className='f18'>KRW {`${coupon.discount_price.toLocaleString()}원`}</b>
                                <p className='f14'>사용가능</p>
                                {/* 
                                쿠폰 사용 테스트
                                <button onClick={() => handleUseCoupon(coupon.coupon_code)}>쿠폰 사용</button> */}
                            </div>
                        </li>
                     ))
                    ) : (
                        <li className='coupon-wrap'>
                        <div className='coupon-contents' style={{ textAlign: 'center', width: '100%' }}>
                          <p className='f16'>사용 가능한 쿠폰이 없습니다.</p>
                        </div>
                      </li>
                    )
                }
            </ul>
            
        </div>



    );
}

