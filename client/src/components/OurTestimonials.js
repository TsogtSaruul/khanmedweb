import React from 'react';
import IMG1 from "../assets/section-img.png";


const OurTestimonials = () => {

    return (
        <section className="Feautes testimonial-page section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Бид та болон танай гэр бүлд туслахад үргэлж бэлэн байх болно</h2>
                            <img src={IMG1} alt="#" />
                            <p>
                                Манай үйлчлүүлэгчид ямар сэтгэгдэлтай үлдсэнийг доорх сэтгэгдэлүүдээс харна уу.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="single-features">
                            <div className="signle-icon">
                                <i className="icofont icofont-ambulance-cross"></i>
                            </div>
                            <h3>Emergency Help</h3>
                            <p>
                                Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                                vulputate.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="single-features">
                            <div className="signle-icon">
                                <i className="icofont icofont-medical-sign-alt"></i>
                            </div>
                            <h3>Enriched Pharmecy</h3>
                            <p>
                                Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                                vulputate.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="single-features last">
                            <div className="signle-icon">
                                <i className="icofont icofont-stethoscope"></i>
                            </div>
                            <h3>Medical Treatment</h3>
                            <p>
                                Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                                vulputate.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurTestimonials