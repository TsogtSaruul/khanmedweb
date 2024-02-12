import React from 'react'
import IMG1 from '../assets/section-img2.png'
import useDoctor from "../hooks/useDoctor";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const OurTeam = () => {
    const doctors = useDoctor();


    return (
        <section
            id="team"
            className="team section overlay"
            data-stellar-background-ratio="0.5"
            style={{ backgroundPosition: "-25px -3404.51px" }}
            >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Манай эмч нарын баг таны асуудлыг шийдэхийн төлөө ажиллана</h2>
                            <img src={IMG1} alt="#" />
                            <p>
                                Манай эмч нарын багт дандаа нарийн мэргэжлийн эмч нар орсон байгаа.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-12">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={35}
                            breakpoints={{
                                1400: { slidesPerView: 3 },
                                992: { slidesPerView: 2 },
                                576: { slidesPerView: 2 },
                            }}
                            loop={false}
                            style={{ userSelect: "none" }}
                            navigation={{ clickable: true }}
                            // pagination={{ clickable: true, draggable: true }}
                            >
                            {doctors.map((d, i) => (
                                <div className="col-lg-4 col-md-6 col-12" key={i}>
                                    <SwiperSlide key={i}>
                                        <div className="single-team">
                                            <div className="t-head">
                                                <img src={d.photo} alt="#" />
                                                <div className="t-icon">
                                                    <a href="/appointment" className="btn">Үзлэгийн&nbsp;Цаг&nbsp;Авах</a>
                                                </div>
                                            </div>
                                            <div className="t-bottom">
                                                <h2><a href={`/doctor-details/${d._id}`}>{d.name}</a></h2>
                                                <p>{d.position}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            ))}
                        </Swiper>
                    </div>
                </div>                
            </div>
        </section>
    )
}

export default OurTeam