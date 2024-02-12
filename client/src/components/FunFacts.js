import React from 'react'
import useFunfact from '../hooks/useFunfact';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const FunFacts = () => {
    const funfacts = useFunfact();

  
    return (
    <div id="fun-facts" className="fun-facts section overlay">
        <div className="container">
            <div className="row">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={15}
                    breakpoints={{
                        1200: {
                            slidesPerView: 4,
                        },
                        998: {
                            slidesPerView: 3,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                    }}
                    loop={false}
                    style={{ userSelect: "none" }}
                    // pagination={{ clickable: true }}
                    >
                    {
                        funfacts?.map((f, i) => (
                            <SwiperSlide key={i}>
                                <div className="col-9">
                                    <div className="single-fun">
                                        <i className={f.icon} ></i>
                                        <div className="content">
                                            <span className="counter">{f.number}</span>
                                            <h3>{f.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>  
                        ))
                    }
                </Swiper>
            </div>
        </div>
    </div>
  )
}

export default FunFacts