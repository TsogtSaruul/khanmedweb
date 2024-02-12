import React from 'react'
import IMG from '../assets/testi-bg.jpg'
import IMG2 from '../assets/section-img2.png'
import useTestimonial from '../hooks/useTestimonial'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Testimonials = () => {
    const testimonials = useTestimonial();


    return (
        <section
            className="section testimonials overlay"
            data-stellar-background-ratio="0.5"
            style={{ backgroundImage: `url(${IMG})` }} 
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Манай үйлчлүүлэгчидийн үлдээсэн сэтгэгдэлүүд</h2>
                            <img src={IMG2} alt="#" />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <div className="owl-stage-outer">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={10}
                                breakpoints={{
                                    1400: { slidesPerView: 3 },
                                    756: { slidesPerView: 2 },
                                    576: { slidesPerView: 1 },
                                }}
                                loop={false}
                                style={{ userSelect: "none" }}
                                // pagination={{ clickable: true }}
                                >
                                {testimonials && testimonials.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div
                                                className="owl-item cloned"
                                                style={{ width: "365px", marginRight: "0px" }}
                                            >
                                                <div className="single-testimonial">
                                                    <img src={item.patientPhoto}></img>
                                                    <h4><a href={`/testimonial-details/${item._id}`}>{item.patientName}</a></h4>
                                                    <p>{item.patientTestimonial}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials