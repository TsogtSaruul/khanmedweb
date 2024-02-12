import React from 'react'
import IMG1 from '../assets/section-img.png';
import useFeature from '../hooks/useFeature';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Features = () => {
    const features = useFeature();

    return (
        <section className="Feautes section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Бид та болон таны гэр бүлд туслахад ямагт бэлэн</h2>
                            <img src={IMG1} alt="#" />
                            <p>Манай түргэн тусламжийн баг та болон таны гэр бүлд эмнэлгийн тусламж үзүүлэхэд ямагт бэлэн байх болно.</p>
                        </div>
                    </div>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={15}
                    breakpoints={{
                        1400: {
                            slidesPerView: 3,
                        },
                        756: {
                            slidesPerView: 2,
                        },
                        576: {
                            slidesPerView: 1,
                        },
                    }}
                    loop={false}
                    style={{ userSelect: "none" }}
                    pagination={{ clickable: true }}
                    // navigation={{ clickable: true }}
                    >
                    {
                        features?.map((f, i) => (
                            <SwiperSlide key={i}>
                                <div className="single-features">
                                    <div className="signle-icon">
                                        <i className={f.icon}></i>
                                    </div>
                                    <h3>{f.title}</h3>
                                    <p>{f.text}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Features