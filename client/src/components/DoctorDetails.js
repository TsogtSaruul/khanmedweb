import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as api from '../api/index';


const DoctorDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState();


    useEffect(() => {
        if (params?.id) getDoctor();
    }, [params?.id]);


    const getDoctor = async () => {
        try {
        const { data } = await api.getDoctor(params.id);
        setDoctor(data.doctor);

    } catch (error) {
        console.log(error);
        }
    };


    const getAppointment = () => {
        // (params.id)
    }


    return (
        <div className="doctor-details-area section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="doctor-details-item">
                            <div className="doctor-details-left">
                                <img src={doctor?.photo} alt="#" />
                                <div className="doctor-details-contact">
                                    <div className="doctor-details-work">
                                        <h3>Ажлын цаг</h3>
                                        <ul className="time-sidual">
                                            <li className="day">
                                                Даваа - Баасан <span>{doctor?.startTime} - {doctor?.endTime}</span>
                                            </li>
                                            <li className="day">Бямба - Ням <span>Амрана</span></li>
                                        </ul>
                                    </div>
                                    {/* <div className="t-icon" style={{ display:"flex", justifyContent: "center", marginTop: "2rem" }}>
                                        <button href="/appointment" className="btn" onClick={getAppointment}>Get Appointment</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="doctor-details-item">
                            <div className="doctor-details-right">
                                <div className="doctor-name">
                                    <h3 className="name">{doctor?.name}</h3>
                                    <p className="deg">{doctor?.position}</p>
                                    <p className="degree">{doctor?.title}</p>

                                </div>
                                <div className="doctor-details-biography">
                                    <h3>Товч намтар</h3>
                                    <p>{doctor?.biography}</p>
                                </div>
                                <div className="doctor-details-biography">
                                    <h3>Боловсрол</h3>
                                    <ul>
                                        {doctor?.education.split(",").map((item, index) => (
                                            <li key={index}>
                                                <h6><i className="icofont-tick-mark"></i>&nbsp;{item.trim()}</h6>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="doctor-details-biography">
                                    <h3>Ажлын туршлага</h3>
                                    <ul>
                                        {doctor?.experience.split(",").map((item, index) => (
                                            <li key={index}>
                                                <h6><i className="icofont-tick-mark"></i>&nbsp;{item.trim()}</h6>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails