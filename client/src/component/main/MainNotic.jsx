import React from 'react';
import { IoChevronForwardCircleOutline } from "react-icons/io5";

export default function MainNotic() {
    return (
        <div className='content'>
            <div className='home_notic'>
                <div className='home_notic_app'>
                    <img src="images/appdown.png" alt="" />
                </div>
                <div className='home_notic_bord'>
                    <div className='home_notic_bord_title'>
                        <span>공지사항</span> <IoChevronForwardCircleOutline size={40}/>
                    </div>
                    <div>
                    <ul>
                        <li className='home_notic_bord_sub'>
                            <span>간사이공항 체크인카운터 위치 변경 (25/3/30~) </span>
                            <span>2025.03.28</span>
                        </li>
                        <li className='home_notic_bord_sub'>
                            <span>[한국발 외] 국제선 유류할증료 (2025년 4월)</span>
                            <span>2025.03.27</span>
                        </li>
                    </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}

