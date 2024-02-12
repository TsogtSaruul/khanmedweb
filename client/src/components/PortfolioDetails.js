import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from '../api/index';
import useDepartment from '../hooks/useDepartment';
import moment from "moment";
import useSocial from '../hooks/useSocial';


const PortfolioDetails = () => {
    const [portfolio, setPortfolio] = useState({});
    const params = useParams();
    const departments = useDepartment();
    const socials = useSocial();


    useEffect(() => {
        const getPortfolio = async () => {
            try {
                const { data } = await api.getPortfolio(params.id);
                setPortfolio(data?.portfolio);
    
            } catch (error) {
                console.log(error);
            }
        };

        if (params?.id) getPortfolio();
    }, [params?.id]);


    return (
        <section className="pf-details section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="inner-content">
                            <div className="image-slider">
                                <div className="pf-details-slider">
                                    <img src={portfolio.largeImage} alt="#" />
                                </div>
                            </div>
                            <div className="date">
                                <ul>
                                    <li><span>Тасаг нэгж: </span>{departments.map((d) => d.id === portfolio.department ? d.name : null)}</li>
                                    <li>
                                        <span>Огноо: </span>
                                        {moment(portfolio.date).year()}/{moment(portfolio.date).month()}/{moment(portfolio.date).date()}
                                    </li>
                                    <li><span>Үйлчлүүлэгч: </span>{portfolio.clientName}</li>
                                    <li><span>Процедур: </span>{portfolio.procedure}</li>
                                </ul>
                            </div>
                            <div className="body-text">
                                <h3>{portfolio.title}</h3>
                                <p>{portfolio.text1}</p><br />
                                <p>{portfolio.text2}</p>

                                <div className="share">
                                    <h4>Бусадтай хуваалцах -</h4>
                                    <ul>
                                        {socials?.map((item, index) => (
                                            <li key={index}>
                                                <a href={item.link} target='_blank' rel="noreferrer">
                                                    <i className={item.icon}></i>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>    
    )
}

export default PortfolioDetails