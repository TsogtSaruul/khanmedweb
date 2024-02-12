import React from 'react'
import IMG1 from '../assets/section-img.png'
import useAbout from '../hooks/useAbout';


const WhyChoose = () => {
    const abouts = useAbout();


    return (
        <section className="why-choose section" >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Манай байгууллагын товч танилцуулга</h2>
                            <img src={IMG1} alt="#" />
                            <p>Хэдийгээр үйл ажиллагаагаа эхлээд удаагүй байгаа ч бид өдөр бүр улам сайжирч байгаа</p>
                        </div>
                    </div>
                </div>

                {abouts && abouts.map((a,i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="col-lg-6 col-12">
                                <div className="choose-left">
                                    <h3>{a.title}</h3>
                                    <p>{a.text}</p>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ul className="list">
                                                {a.list.split(",").map((item, index) => {
                                                    return (
                                                        <li key={index}><i className="fa fa-caret-right"></i>{item}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="choose-right">
                                    <div className="video-image">
                                        <div className="promo-video">
                                            <div className="waves-block">
                                                <div className="waves wave-1"></div>
                                                <div className="waves wave-2"></div>
                                                <div className="waves wave-3"></div>
                                            </div>
                                        </div>
                                        <a href={a.link} className="video video-popup mfp-iframe" target='_blank'><i className="fa fa-play"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}                
            </div>
        </section>
    )
}

export default WhyChoose