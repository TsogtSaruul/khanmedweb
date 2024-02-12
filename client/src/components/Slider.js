import React from 'react'
import useSlider from '../hooks/useSlider';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Slider = () => {
    const sliders = useSlider();

    return (
        <section className="slider">
            <div className="hero-slider">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={false}
                    navigation={{ clickable: true }}
                    >
                    {
                        sliders?.map((slider, index) => (
                            <SwiperSlide key={index}>
                                <div className="single-slider" style={{ backgroundImage: `url(${slider.photo})` }}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <div className="text">
                                                    <h1>{slider.title1} <span>{slider.title2}</span> {slider.title3} <span>{slider.title4}</span></h1>
                                                    <p>{slider.text} </p>
                                                    <div className="button">
                                                        <a href="/appointment" className="btn">Үзлэгийн цаг авах</a>
                                                        <a href="/about-us" className="btn primary">Дэлгэрэнгүй</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Slider