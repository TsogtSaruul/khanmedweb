import React from 'react'
import useCallaction from '../hooks/useCallaction'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const CallAction = () => {
    const callactions = useCallaction();

    return (
        <section className="call-action overlay" data-stellar-background-ratio="0.5">
            <div className="container">
                <div className="row">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={15}
                        slidesPerView={1}
                        loop={false}
                        pagination={{ clickable: true }}
                        style={{ userSelect: "none" }}
                        // navigation
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}
                        >
                            {callactions?.map((item, index) => {
                                return (
                                <SwiperSlide key={index}>
                                    {/* <div className="row" key={index}> */}
                                        {/* <div className="col-lg-12 col-md-12 col-12"> */}
                                        <div className="col-12">
                                            <div className="content">
                                                <h2>{item.title}</h2>
                                                <h1>{item.action}</h1>
                                                <p>{item.text}</p>
                                                <div className="button">
                                                    <a href={item.link} className="btn">Холбоо&nbsp;барих</a>
                                                </div>
                                            </div>
                                        </div>
                                    {/* </div> */}
                                </SwiperSlide>  
                                )
                            })}
                    </Swiper>    
                </div>
            </div>
        </section>
    )
}

export default CallAction