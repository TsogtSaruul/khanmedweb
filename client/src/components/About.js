import React from 'react'
import useAbout from '../hooks/useAbout';


const About = () => {
    const abouts = useAbout();

    return (
        <section className="about-area section">
            <div className="container-fluid p-0">
                {abouts && abouts.map((a,i) => {
                    return (
                        <div className="row m-0" key={i}>
                            <div className="col-lg-6 col-md-12 p-0">
                                <img src={a.photo} alt={a.title} />
                            </div>
                            <div className="col-lg-6 col-md-12 p-0">
                                <div className="about-content" key={i}>
                                    <span>Бидний&nbsp;тухай</span>
                                    <h2>{a.title}</h2>
                                    <p>{a.text}</p>
                                    <ul>
                                    {
                                        a.list.split(",").map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <i className="icofont-tick-mark"></i> 
                                                    {item}
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default About