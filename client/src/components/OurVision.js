import React from 'react'
import useVision from '../hooks/useVision';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const OurVision = () => {
    const visions = useVision();

    
    return (
        <section className="our-vision-area ptb-100 pt-0">
            <div className="container">
                <div className="row">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        breakpoints={{
                            1400: { slidesPerView: 3 },
                            756: { slidesPerView: 2 },
                            576: { slidesPerView: 1 },
                        }}
                        loop={false}
                        pagination={{ clickable: true }}
                        style={{ padding: "30px 0", userSelect: "none" }}
                        >
                        {
                            visions?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="col-12">
                                        <div className="single-vision-box">
                                            <div className="icon">
                                                <i className={item.icon}></i>
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default OurVision