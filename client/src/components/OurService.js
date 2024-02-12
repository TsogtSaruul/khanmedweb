import React from 'react'
import IMG1 from "../assets/section-img.png";
import Service from './Service'


const OurService = () => {

    return (
        <section className="services section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Бид таны эрүүл мэндийн төлөө дараа үйлчилгээг үзүүлж байна</h2>
                            <img src={IMG1} alt="#" />
                            <p>
                                Манай үйлчилгээний чанар таны сэтгэлд хүрнэ гэдэгт бид итгэж байна.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Service />
        </section>
    )
}

export default OurService