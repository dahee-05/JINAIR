import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { GrFormPrevious, GrFormNext } from "react-icons/gr"; // ← React Icons 추가

export default function MainBoon() {
    const [bannerImg, setBannerImg] = useState([]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        axios.get('/data/mainBanner.json')
            .then((res) => setBannerImg(res.data.banner_img))
            .catch((error) => console.error("error:", error));
    }, []);

    return (
        <div className="swiper-boon-container">
            <button ref={prevRef} className="custom-prev">
                <GrFormPrevious size={20} />
            </button>

            <Swiper
                className="main_home_content_boon"
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                slidesPerGroup={2}
                loop={true}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onSwiper={(swiper) => {
                    if (swiper && prevRef.current && nextRef.current) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }
                }}
                
            >
                {bannerImg.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div>
                            <img src={item.img} alt={`Banner ${i + 1}`} className='main_boon' />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button ref={nextRef} className="custom-next">
                <GrFormNext size={20} />
            </button>
        </div>
    );
}
