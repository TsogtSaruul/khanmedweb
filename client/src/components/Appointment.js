import React from 'react'
import IMG from '../assets/section-img.png';
import Appointment2 from './Appointment2';


const Appointment = () => {
    const auth = JSON.parse(localStorage.getItem('auth')).user;  
    
    
    return (
        <section className="appointment">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Та үзлэгийн цаг захиалахыг хүсч байвал дараах талбарыг үзнэ үү.</h2>
                            <img src={IMG} alt="#" />
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Appointment2 />
                </div>
            </div>
        </section>
    )
}

export default Appointment