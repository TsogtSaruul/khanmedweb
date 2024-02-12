import React from 'react'
import IMG from '../assets/section-img.png'
import Service from './Service'


const Services = () => {
    
    return (
        <section className="services section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Таны эрүүл мэндийн төлөө бид төрөл бүрийн үйлчилгээ үзүүлэх болно</h2>
                            <img src={IMG} alt="#" />
                            <p>Манай үйлчилгээний нэр төрөл өдөр ирэх тусам олширч таны биеийн бүх өвчнийг оношилдог болох нь бидний зорилго юм.</p>
                        </div>
                    </div>
                </div>
                
                <Service />
            </div>
        </section>
    )
}

export default Services