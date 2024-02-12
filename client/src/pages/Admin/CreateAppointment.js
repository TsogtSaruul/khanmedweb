import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import * as api from '../../api/index';
import useDepartment from "../../hooks/useDepartment";
import useDoctor from "../../hooks/useDoctor";
import useAppointment from '../../hooks/useAppointment';
import moment from 'moment'
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs';
import useUser from '../../hooks/useUser';


const { Option } = Select;

const initialState = {
    patient: '',
    department: '',
    doctor: '',
    date: '',
    time: '',    
}


const CreateAppointment = () => {  
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
  const users = useUser();  
  const [search, setSearch] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [records, setRecords] = useState([]);
  const numberOfPages = Math.ceil(appointments.length / recordsPerPage);  
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  useEffect(() => {
    if (search === ""){
      setAppointments(appointment);
    }
    setRecords(() => appointments?.slice(firstIndex, lastIndex));
  }, [search, currentPage, appointments])
 
  
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  

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


  const handleSearchByPatient = () => {
    if (search != "") {
      const searchItem = users?.filter((item) => item.name.includes(String(search)) ? item : null);
      const searchId = searchItem?.map((item) => item._id);
  
      const filteredAppointments = [];
      searchId?.map((id) => {
        appointment?.map((item) => item.patient === id ? filteredAppointments.push(item) : null)
      })
      setAppointments(filteredAppointments);
    }    
  }


  const handleSearchByDoctor = () => {
    if (search != "") {
      const searchItem = doctors?.filter((item) => item.name.includes(String(search)) ? item : null);
      const searchId = searchItem?.map((item) => item.id);
  
      const filteredAppointments = [];
      searchId?.map((id) => {
        appointment?.map((item) => item.doctor === id ? filteredAppointments.push(item) : null)
      })
      setAppointments(filteredAppointments);
    }
  }

  
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
                  <p>Эхлээд тасаг нэгж, дараа нь эмч, өдөр, цаг гэсэн дарааллаар сонгож үзлэгийн цаг захиална.</p>
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
                    </div>
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

      <div className="container" style={{ marginBottom: "4rem"}}>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="main-sidebar">
              <div className="single-widget search">
                <div className="form">
                  <input type="email" placeholder="Үйлчлүүлэгчийн нэрээр хайх..." name="search" onChange={(e) => setSearch(e.target.value)} />
                  <a className="button" onClick={handleSearchByPatient}><i className="fa fa-search"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-12">
            <div className="main-sidebar">
              <div className="single-widget search">
                <div className="form">
                  <input type="email" placeholder="Эмчийн нэрээр хайх..." name="search" onChange={(e) => setSearch(e.target.value)} />
                  <a className="button" onClick={handleSearchByDoctor}><i className="fa fa-search"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="doctor-calendar-table table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Эмч</th>
                    <th scope="col">Үйлчлүүлэгч</th>
                    <th scope="col">Огноо</th>
                    <th scope="col">Цаг</th>
                    <th scope="col">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {records?.map((a, i) => (
                    <tr key={i}>
                      <td><b>{doctors.map((doctor) => doctor.id === a.doctor ? doctor.name : null)}</b></td>
                      <td><b>{users.map((user) => user._id === a.patient ? user.name : null)}</b></td>
                      <td><b>{a.date}</b></td>
                      <td><b>{a.time}</b></td>
                      <td>
                        <button
                          className="btn button__danger"
                          onClick={() => handleDelete(a._id)}
                        >
                          УСТГАХ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <br />
          </div>

          <div className="col-12">
            <div className="pagination">
              <ul className="pagination-list">
                <li>
                  <a onClick={() => setCurrentPage(1)}>
                    <i className="icofont-rounded-double-left" ></i>
                  </a>
                </li>
                <li>
                  <a onClick={previousPage}>
                    <i className="icofont-rounded-left" ></i>
                  </a>
                </li>
                {numbers?.map((n, i) => 
                  (currentPage >= 1 && currentPage < 3 && n >= 1 && n < 4) ?
                  <li className={currentPage === n? 'active': ''} key={i}>
                    <a onClick={() => setCurrentPage(n)}>{n}</a>
                  </li> :

                  ((currentPage >= 3) && (n >= 2) && ((n === currentPage -1) || (n === currentPage) || (n === currentPage +1))) ? 
                  <li className={currentPage === n? 'active': ''} key={i}>
                    <a onClick={() => setCurrentPage(n)}>{n}</a>
                  </li> 
                  : null
                )}
                <li>
                  <a onClick={nextPage}>
                    <i className="icofont-rounded-right"></i>
                  </a>
                </li>
                <li>
                  <a onClick={() => setCurrentPage(numberOfPages)}>
                    <i className="icofont-rounded-double-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>      
    </Layout>
  );
};

export default CreateAppointment;
