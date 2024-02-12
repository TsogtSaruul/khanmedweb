import React, { useEffect, useState } from 'react';
import IMG1 from "../assets/section-img.png";
import useDepartment from '../hooks/useDepartment'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Departments = () => {
    const departments = useDepartment();    
    const [department, setDepartment] = useState(departments[0]?.id);


    useEffect(() => {
        setDepartment(departments[0]?.id)
    }, [departments])


    return (
        <section className="departments section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Манай тасаг нэгжүүд өдөр ирэх тусам өргөжин тэлсээр</h2>
                            <img src={IMG1} alt="#" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="department-tab">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={25}
                                    breakpoints={{
                                        1400: { slidesPerView: 5 },
                                        1200: { slidesPerView: 4 },
                                        992: { slidesPerView: 3 },
                                        768: { slidesPerView: 2 },
                                        576: { slidesPerView: 1 },
                                    }}
                                    loop={false}
                                    style={{ userSelect: "none", paddingLeft: '40px' }}
                                    navigation={{ clickable: true }}
                                    >
                                    {departments?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                        <li className="nav-item" key={index}>
                                            <a
                                                className="nav-link active"
                                                data-toggle="tab"
                                                role="tab"
                                                style={{ cursor: "pointer", userSelect: "none" }}
                                                onClick={() => setDepartment(item.id)}
                                            >
                                                <i className={item.logo}></i>
                                                <span className="first">{item.title}</span>
                                                <span className="second">{item.subtitle}</span>
                                            </a>
                                        </li>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                {departments.map((item, index) => (item.id === department) ? (
                                    <div
                                        className="tab-pane fade show active"
                                        role="tabpanel"
                                        key={index}
                                    >
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="department-left">
                                                    <h3>{item.title}</h3>
                                                    <p className="p1">“{item.quote}”</p>
                                                    <p>{item.text}</p>
                                                    
                                                    <ul className="list">
                                                        {item?.list.split(",").map((item, index) => 
                                                            <li key={index}>
                                                                <i className="fa fa-check"></i>{item}
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="department-right">
                                                    <img src={item.photo} alt="#" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ): null )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Departments;