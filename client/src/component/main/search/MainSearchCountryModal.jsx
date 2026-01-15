import React, { useRef } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getModalOpen}  from '../../../service/searchApi.js';

export default function MainSearchCountryModal({  mom, mom2, departure }) {
        const dispatch = useDispatch();
            const type = useSelector(state => state.search.type);
        

    const data = [
        {
            'country': '한국',
            'list': [
                '서울/인천(ICN)',
                '서울/김포(GMP)',
                '부산(PUS)',
                '제주(CJU)',
                '광주(KWJ)',
                '군산(KUV)',
                '대구(TAE)',
                '무안(MWX)',
                '사천(HIN)',
                '울산(USN)',
                '원주(WJU)',
                '여수(RSU)',
                '청주(CJJ)',
                '포항/경주(KPO)'
            ]
        },
        {
            'country': '동북아',
            'list': [
                '도쿄/나리타(NRT)',
                '오사카/간사이(KIX)',
                '후쿠오카(FUK)',
                '기타큐슈(KKJ)',
                '나고야(NGO)',
                '다카마쓰(TAK)',
                '미야코지마/시모지시마(SHI)',
                '이시가키지마(ISG)',
                '삿포로(CTS)',
                '오키나와(OKA)',
                '상하이/푸둥(PVG)',
                '시안(XIY)',
                '정저우(CGO)',
                '홍콩(HKG)',
                '마카오(MFM)',
                '타이베이/타오위안(TPE)',
                '타이중(RMQ)',
            ]
        },
        {
            'country': '동남아',
            'list': [
                '방콕(BKK)',
                '푸껫(HKT)',
                '치앙마이(CNX)',
                '세부(CEB)',
                '클락(CRK)',
                '보홀(TAG)',
                '다낭(DAD)',
                '나트랑(CXR)',
                '푸꾸옥(PQC)',
                '비엔티안(VTE)',
                '코타키나발루(BKI)'
            ]
        },
        {
            'country': '괌',
            'list': [
                '괌(GUM)'
            ]
        },
        {
            'country': '몽골',
            'list': [
                '울란바토르(UBN)'
            ]
        }

    ];

    const handleCountry = (item, item1) => {
        const engFind = item.indexOf('(');
        const sliceEng = item.slice(0, engFind);
        if (type === 'x' || type === 'o') {
            mom2(sliceEng);
        } else {
            mom(sliceEng);
        }
        dispatch(getModalOpen(false));
    }



    return (
            <div className='main-search-modal-content'>
                <div className='main-search-country-all'>
                    <div>
                        <span>{type === 'y' ? '출발지 선택' : '도착지 선택'}</span>
                        <IoMdClose onClick={() => dispatch(getModalOpen(false))} className='main-search-country-icon2' />
                    </div>
                    <div>
                        <IoSearch />
                        <input type="text" placeholder='도시 또는 공항을 입력해주세요.' />
                        <IoMdCloseCircle className='main-search-country-icon' />
                    </div>
                    <div>
                        {
                            data.map((item1) => (
                                <div>
                                    <span>{item1.country}</span>
                                    <ul>
                                        {item1.list.map((item) => (
                                            <li
                                                key={item}
                                                onClick={() => { handleCountry(item, item1) }}
                                                className={departure === '서울/인천' && item1.country === '한국' ? 'test' :
                                                    departure === '서울/김포' && item1.country !== '한국' ? 'test' : null
                                                }
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div >
            </div>
    );
}

