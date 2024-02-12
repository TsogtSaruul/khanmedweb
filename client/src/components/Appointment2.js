import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import toast from "react-hot-toast";
import * as api from '../api/index';
import useDepartments from '../hooks/useDepartment'
import useDoctors from '../hooks/useDoctor'
import useAppointment from '../hooks/useAppointment';
import moment from 'moment'


const { Option } = Select;

const initialState = {
    patient: '',
    department: '',
    doctor: '',
    date: '',
    time: '',    
}

const Appointment2 = () => {
    const [formData, setFormData] = useState(initialState);
    const userId = JSON.parse(localStorage.getItem('auth'))?.user?._id;
    const appointment = useAppointment();
    const [appointments, setAppointments] = useState([]);

    const departments = useDepartments();
    const doctors = useDoctors();
    const [department, setDepartment] = useState([]);
    const [doctor, setDoctor] = useState({});
    const [listDoctors, setListDoctors] = useState([]);    
    const [doctorId, setDoctorId] = useState('');
    // const [date, setDate] = useState();
    const doctorAppointments = [];
    const dateAppointments = [];
    const navigate = useNavigate();


    useEffect(() => {
        setDoctor(doctors.find((item) => item.id === doctorId ))
    }, [doctorId])

    useEffect(() => {
        setAppointments(appointment);
      }, [appointment]);
    
    if (doctorId) {
        appointments.map((item) => (
            item.doctor === doctorId ? doctorAppointments.push(item) : null
        ))
    }

    if (formData.date) {
        doctorAppointments.map((item) => 
            item.date === formData.date ? dateAppointments.push(item) : null
        )
    }

    const startTime = doctor?.startTime;
    const endTime = doctor?.endTime;
    const timeDuration = doctor?.timeDuration;
    const totalHours = Number(endTime?.split(":")[0]) - Number(startTime?.split(":")[0]) - 1;
    const totalMinutes = (totalHours * 60) + Number(endTime?.split(":")[1]) - Number(startTime?.split(":")[1]);
    const numberOfAppointments = Math.floor(totalMinutes/timeDuration);
    const AppointmentTimes = [];

    AppointmentTimes.push(doctor?.startTime)

    let hour = Number(startTime?.split(":")[0]);
    let minute = Number(startTime?.split(":")[1]);    

    for(let i = 1; i < numberOfAppointments; i++) {
        minute += Number(timeDuration);

        if (minute < 60) {
            minute < 10 ? 
                AppointmentTimes.push(hour < 10 ? `0${hour}:0${minute}` : `${hour}:0${minute}`)
            : 
                AppointmentTimes.push(hour < 10 ? `0${hour}:${minute}` : `${hour}:${minute}`)
        }
        else if (minute === 60) {
            minute = 0;
            hour += 1;
            if (hour === 12) {
                hour +=1
            } 
            AppointmentTimes.push(hour < 10 ? `0${hour}:00` : `${hour}:00`)

        }
        else if (minute > 60) {
            minute = timeDuration - (60 - (minute - timeDuration));
            hour += 1;
            if (hour === 12) {
                hour +=1
            } 
            minute < 10 ? 
                AppointmentTimes.push(hour < 10 ? `0${hour}:0${minute}` : `${hour}:0${minute}`)
            : 
                AppointmentTimes.push(hour < 10 ? `0${hour}:${minute}` : `${hour}:${minute}`)          
        }
    }

    useEffect(() => {
        const items = [];
        doctors.map((item) => {
            if (item.department === department)  {
                items.push(item)
            }
        });
        if (items) {
            setListDoctors(items);
            setFormData({ ...formData, doctor: '' })
        }
    }, [department]);

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.createAppointment(formData);

            if (data?.success) {
                toast.success(data?.message);
                setAppointments(data?.appointments);
            } else {
                toast.error("Үзлэгийн цаг бүртгэх үед алдаа гарлаа!!!");
            }
        
        } catch (error) {
            console.log(error);
            toast.error("Үзлэгийн цаг бүртгэх үед алдаа гарлаа!");
        }
    };

    if (!userId) {
        return (
            <section className="appointment single-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-12 col-12">
                            <div className="appointment-inner">
                                <div className="title">
                                    <h3>Үзлэгийн Цаг Авах</h3>
                                    <h5>Уучлаарай! Үзлэгийн цаг авахын тулд та нэвтэрсэн байх шаардлагатай.</h5>                                
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div className="work-hour">
                                <h3>Ажлын цаг</h3>
                                <ul className="time-sidual">
                                    <li className="day">Даваа - Баасан <span>8:30 - 17:30</span></li>
                                    <li className="day">Цайны завсарлага <span>12:00 - 13:00</span></li>
                                    <li className="day">Бямба - Ням <span>Day Off</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    
    return (
        <section className="appointment single-page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-12 col-12">
                        <div className="appointment-inner">
                            <div className="title">
                                <h3>Үзлэгийн Цаг Авах</h3>
                                <p>Үзлэг эхлэхээс 2 цагийн өмнө баталгаажуулах шаардлагатай.</p>                                
                            </div>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="form-group">
                                            <Select
                                                id="select"
                                                bordered={true}
                                                showSearch
                                                required
                                                style={{ width: "100%"}}
                                                size="large"
                                                value={formData.department ? formData.department : "Тасаг нэгж" }
                                                placeholder="Department"                                                
                                                onChange={(value) => {
                                                    setFormData({ ...formData, department: value, });
                                                    setDepartment(value);
                                                }}>
                                                {departments?.map((d) => (
                                                    <Option key={d.id} value={d.id}>
                                                        {d.title}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="form-group">
                                            <Select
                                                id="select"
                                                bordered={true}
                                                showSearch
                                                required
                                                style={{ width: "100%"}}
                                                size="large"
                                                value={formData.doctor ? formData.doctor : "Эмч" }
                                                placeholder={"Doctor"}
                                                onChange={(value) => {
                                                    setFormData({ 
                                                        ...formData, 
                                                        doctor: value,
                                                        patient: userId,
                                                    })
                                                    setDoctorId(value);
                                                }}>
                                                {listDoctors?.map((d) => (
                                                    <Option key={d.id} value={d.id}>
                                                        {d.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="form-group">
                                            <input
                                                name="date" 
                                                type="date" 
                                                placeholder="Огноо" 
                                                id="datepicker" 
                                                value={formData.date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="form-group">
                                            <p><b>Хэдэн өдөр үлдсэн: {formData?.date ? (moment(formData.date).fromNow()) : null}</b></p>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="doctor-calendar-table table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Үзлэгийн цаг</th>
                                                        <th scope="col">Захиалах</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {formData.date ? AppointmentTimes.map((time, i) => (
                                                        <tr key={i}>
                                                            <td><h4><b>{time}</b></h4></td>
                                                            <td>
                                                                {
                                                                    dateAppointments.find((item) => 
                                                                        String(item.time) === String(time)
                                                                    ) ? (
                                                                        <button
                                                                            className="btn"
                                                                            disabled={
                                                                                dateAppointments.find((item) => 
                                                                                    String(item.time) === String(time)
                                                                            )}
                                                                            onClick={(e) => {
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    time: time,
                                                                                });
                                                                                handleSubmit(e);
                                                                            }}
                                                                            >
                                                                            Хаагдсан
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="btn"
                                                                            onClick={(e) => {
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    time: time,
                                                                                });
                                                                                handleSubmit(e);
                                                                            }}
                                                                            >
                                                                            Нээлттэй
                                                                        </button>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    )) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-12 col-md-12 col-12">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                placeholder="Мессеж үдээх..."
                                                value={formData.message}
                                                onChange={handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div> */}
                                </div>

                                {/* <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="button">
                                                <button type="submit" className="btn">
                                                    Үзлэгийн цаг авах
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="work-hour">
                            <h3>Ажлын Цаг</h3>
                            <ul className="time-sidual">
                                <li className="day">Даваа - Баасан <span>{startTime} - {endTime}</span></li>
                                <li className="day">Цайны цаг <span>12:00 - 13:00</span></li>
                                <li className="day">Бямба - Ням <span>Амрана</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default Appointment2