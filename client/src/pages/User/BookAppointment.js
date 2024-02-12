import React, { useState, useEffect } from "react";
import { Select } from "antd";
import toast from "react-hot-toast";
import * as api from '../../api/index';
import useDepartment from "../../hooks/useDepartment";
import useDoctor from "../../hooks/useDoctor";
import useAppointment from '../../hooks/useAppointment';
import moment from 'moment'
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs';
// import useUser from '../../hooks/useUser';


const { Option } = Select;

const initialState = {
    patient: '',
    department: '',
    doctor: '',
    date: '',
    time: '',    
}


const BookAppointment = () => {
  const [formData, setFormData] = useState(initialState);
  const userId = JSON.parse(localStorage.getItem('auth'))?.user?._id;
  const appointment = useAppointment();
  const departments = useDepartment();
  const doctors = useDoctor();
  const [appointments, setAppointments] = useState([]);
  const [department, setDepartment] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [listDoctors, setListDoctors] = useState([]);    
  const [doctorId, setDoctorId] = useState('');
  const doctorAppointments = [];
  const dateAppointments = [];
  // const users = useUser();  


  useEffect(() => {
    setDoctor(doctors.find((item) => item.id === doctorId ))
  }, [doctorId, doctors])


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
  }, [department, doctors, formData]);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.createAppointment(formData);

      if (data?.success) {
        setAppointments(data?.appointments);
        toast.success(data?.message);
      } else {
        toast.error("Үзлэгийн цаг бүртгэх үед алдаа гарлаа!!!");
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Үзлэгийн цаг бүртгэх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteAppointment(id);

      if (data.success) {
        setAppointments(data?.appointments);
        toast.success(`Appointment deleted successfully!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Хэлтэс устгах үед алдаа гарлаа!");
    }
  };


  return (
    <Layout>
      <Breadcrumbs title="Үзлэгийн Цаг" />

      <section className="appointment single-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-12">
              <div className="appointment-inner">
                <div className="title">
                  <h3>Үзлэгийн цаг бүртгэх</h3>
                  <p>Үзлэгийн цаг болохоос 2 цагийн өмнө баталгаажуулсан байх шаардлагатай.</p>
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
                                                                Хаалттай
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
                                    placeholder="Write Your Message Here....."
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
                                        Book An Appointment
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


      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="doctor-calendar-table table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Эмч</th>
                    {/* <th scope="col">Patient</th> */}
                    <th scope="col">Огноо</th>
                    <th scope="col">Цаг</th>
                    <th scope="col">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((a, i) => a.patient === userId ? (
                    <tr key={i}>
                      <td key={a._id}><b>{doctors.map((doctor) => doctor.id === a.doctor ? doctor.name : null)}</b></td>
                      {/* <td key={a._id}><b>{users.map((user) => user._id === a.patient ? user.name : null)}</b></td> */}
                      <td key={a._id}><b>{a.date}</b></td>
                      <td key={a._id}><b>{a.time}</b></td>
                      <td>
                        <button
                          className="btn button__danger"
                          onClick={() => handleDelete(a._id)}
                        >
                          УСТГАХ
                        </button>
                      </td>
                    </tr>
                  ) : null)}
                </tbody>
              </table>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookAppointment;
