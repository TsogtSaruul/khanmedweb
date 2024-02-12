import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from '../api/index';


const ServiceDetails = () => {
    const [service, setService] = useState({});
    const params = useParams();


    useEffect(() => {
        if (params?.id) getService();
    }, [params?.id]);


    const getService = async () => {
        try {
            const { data } = await api.getService(params.id);
            setService(data?.service);
        } catch (error) {
            console.log(error);
        }
    };
    
    
    return (
        <div className="service-details-area section">
            <div className="container">
                <div className="services-details-img">
                    <img src={service.detailsPhoto} alt="Үйлчилгээний том зураг" />
                    <h2>{service.detailsTitle}</h2>
                    <p>{service.detailsText1}</p>
                    <blockquote>
                        <i className="icofont-quote-left" />
                        {service.detailsQuote} 
                    </blockquote>
                    <p>{service.detailsText2}</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceDetails