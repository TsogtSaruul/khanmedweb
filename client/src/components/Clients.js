import React from 'react'
import IMG1 from '../assets/section-img2.png'
import useClient from '../hooks/useClient'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Clients = () => {
    const clients = useClient();

    
    return (
        <div className="clients overlay">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Манай хамтын ажиллагаа өдөр ирэх тусам өргөжин тэлсээр</h2>
                            <img src={IMG1} alt="#" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <Swiper
                            spaceBetween={100}
                            // slidesPerView={3}
                            loop={false}
                            breakpoints={{
                                1400: { slidesPerView: 3 },
                                992: { slidesPerView: 2 },
                                576: { slidesPerView: 2 },
                            }}
                            >
                            {
                                clients?.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className="single-clients">
                                                <img src={item.photo} alt="#" />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clients