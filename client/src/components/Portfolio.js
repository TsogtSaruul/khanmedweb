import React from 'react'
import IMG from '../assets/section-img.png'
import usePortfolio from '../hooks/usePortfolio'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Portfolio = () => {
    const portfolios = usePortfolio();

    return (
        <section className="portfolio section" >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Эмнэлгийн дотоод ариун цэвэр бол бидний хувьд хамгийн эрхэм</h2>
                            <img src={IMG} alt="#" />
                            <p>Манай эмнэлгийн хаалгаар оронгууд таныг манай үйлчлэгч эгч инээмсэглэн угтан авна. Манай эмнэлгийн хаалгаар оронгууд таныг манай үйлчлэгч эгч инээмсэглэн угтан авна. </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={15}
                            breakpoints={{
                                1400: { slidesPerView: 3 },
                                756: { slidesPerView: 2 },
                                576: { slidesPerView: 1 },
                            }}
                            loop={false}
                            style={{ userSelect: "none" }}
                            pagination={{ clickable: true, draggable: true }}
                            navigation
                            >
                            {portfolios && portfolios.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="single-pf">
                                            <img src={item.smallImage} alt="#" />
                                            <a href={`/portfolio-details/${item.id}`} className="btn">Дэлгэрэнгүй...</a>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Portfolio