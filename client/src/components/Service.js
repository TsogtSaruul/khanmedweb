import React from 'react'
import useService from '../hooks/useService'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Service = () => {
    const services = useService();
    
    
    return (
        <div className="container">
            <div className="row">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={15}
                    breakpoints={{
                        1400: { slidesPerView: 3 },
                        756: { slidesPerView: 2 },
                        576: { slidesPerView: 1 },
                    }}
                    loop={false}
                    pagination={{ clickable: true }}
                    style={{ padding: '30px 0', bottom: "30px", userSelect: "none"  }}
                    >
                    {services && services.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="col-12">
                                    <div className="single-service">
                                        <i className={item.serviceLogo}></i>
                                        <h4><a href={`/service-details/${item.id}`}>{item.serviceTitle}</a></h4>
                                        <p>{item.serviceText}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default Service