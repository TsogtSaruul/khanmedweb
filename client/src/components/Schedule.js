import React from 'react'
import useSchedule from '../hooks/useSchedule'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Schedule = () => {
    const schedules = useSchedule();

    return (
        <section className="schedule">
            <div className="container">
                <div className="schedule-inner">
                    <div className="row">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={30}
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
                                schedules?.map((s, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="col-lg-12 col-md-12 col-12 " key={i}>
                                            <div className="single-schedule first">
                                                <div className="inner">
                                                    <div className="icon">
                                                        <i className={s.icon} ></i>
                                                    </div>
                                                    <div className="single-content">
                                                        <span>{s.subTitle}</span>
                                                        <h4>{s.title}</h4>
                                                        <p>{s.text1}</p>
                                                        <p>{s.text2}</p>
                                                        <a href={s.link}>Дэлгэрэнгүй<i className="fa fa-long-arrow-right"></i></a>
                                                    </div>
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
        </section>
    )
}

export default Schedule