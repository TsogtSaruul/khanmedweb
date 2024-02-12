import React from 'react';
import useDoctor from "../hooks/useDoctor";


const Team = () => {
    const doctors = useDoctor();


    return (
        <section id="team" className="team section single-page">
            <div className="container">
                <div className="row">
                    {doctors.map((d, i) => (
                        <div className="col-lg-4 col-md-6 col-12" key={i}>
                            <div className="single-team">
                                <div className="t-head">
                                    <img src={d.photo} alt="#" />
                                    <div className="t-icon">
                                        <a href="/appointment" className="btn">Үзлэгийн цаг авах</a>
                                    </div>
                                </div>
                                <div className="t-bottom">
                                    <h2><a href={`/doctor-details/${d.id}`}>{d.name}</a></h2>
                                    <p>{d.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team