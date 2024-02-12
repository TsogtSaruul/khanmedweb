import React from 'react'
import IMG from '../assets/section-img.png'
import usePricing from '../hooks/usePricing';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const PricingTable = () => {
    const pricings = usePricing();

  
    return (
    <section className="pricing-table section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Бид үйлчилгээнийхээ үнийн саналыг хамгийн боломжийн түвшинд баридаг</h2>
                        <img src={IMG} alt="#" />
                        <p>Манайхаар үйлчлүүлсэн хүмүүс төлсөнөөсөө илүүг авах ёстой гэсэн уриан дор манай баг хамт олон ажиллаж байна.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={20}
                    breakpoints={{
                        1400: { slidesPerView: 3 },
                        756: { slidesPerView: 2 },
                        576: { slidesPerView: 1 },
                    }}
                    loop={false}
                    pagination={{ clickable: true, draggable: true }}
                    style={{ padding: '30px 0', bottom: "30px", userSelect: "none"  }}
                    // scrollbar={{ draggable: true }}
                    >
                        {pricings && pricings.map((item, index) => {
                            return (
                                <SwiperSlide key={index} >
                                    <div className="col-12" key={index}>
                                        <div className="single-table">
                                            <div className="table-head">
                                                <div className="icon">
                                                    <i className={item?.icon}></i>
                                                </div>
                                                <h4 className="title">{item?.title}</h4>
                                                <div className="price">
                                                    <p className="amount">${item?.price}<span>/ {item?.unit}</span></p>
                                                </div>	
                                            </div>
                                            <ul className="table-list">
                                                {
                                                    item?.list?.split(",").map((listItem, index) => (
                                                        <li key={index}><i className="icofont icofont-ui-check"></i>{listItem}</li>
                                                    ))
                                                }
                                            </ul>
                                            <div className="table-bottom">
                                                <a className="btn" href="/contact-us">Захиалах</a>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </div>	
        </div>	
    </section>	
  )
}

export default PricingTable