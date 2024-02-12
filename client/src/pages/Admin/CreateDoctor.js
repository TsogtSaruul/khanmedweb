import React, { useState, useEffect } from "react";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
import FileBase from 'react-file-base64';
import Breadcrumbs from '../../components/Breadcrumbs';
import useDoctor from '../../hooks/useDoctor';
import useDepartment from '../../hooks/useDepartment';
import toast from "react-hot-toast";
import * as api from '../../api/index';




const { Option } = Select;

const initialState = {
  department: '',
  firstName: '',
  lastName: '',
  position: '',
  title: '',
  biography: '',
  email: '',
  education: '',
  experience: '',
  photo: '',
  password: '',
  confirmPassword: '',
  role: 0,
  startTime: '',
  endTime: '',
  timeDuration: 0,
}

const CreateDoctor = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const doctor = useDoctor();
  const [doctors, setDoctors] = useState();
  const departments = useDepartment();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setDoctors(doctor);
  }, [doctor]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateDoctor(selected.id, formData);
      
        if (data?.success) {
          setDoctors(data.doctor);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createDoctor(formData);
      
        if (data?.success) {
          setDoctors(data.doctor);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Doctor илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteDoctor(id);

      if (data.success) {
        setDoctors(data.doctor);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Doctor устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };


  return (
    <Layout>
      <Breadcrumbs title="Эмч нар" />

      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                  <div className="register-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="register-form">
                  <h2>{selected ? "Эмч засах" : "Эмч үүсгэх"}</h2>
                  {selected ? <p>"Нууц үг" дахин оруулна. "И-мэйл" өөрчилж болохгүй!</p> : null}

                  <form className="form" onSubmit={handleSubmit}>
                    <div className="col">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <Select
                            id="select"
                            bordered={true}
                            showSearch
                            required
                            style={{ width: "100%" }}
                            size="large"
                            placeholder="Тасаг нэгж"
                            value={formData.department !== "" ? formData.department : null}
                            onChange={(value) => setFormData({ ...formData, department: value })}>
                            {departments?.map((d) => (
                              <Option key={d.id} value={d.id}>
                                {d.title}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Өөрийн нэр"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Овог"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="position"
                            placeholder="Албан тушаал"
                            required
                            value={formData.position}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="title"
                            placeholder="Гарчиг"
                            required
                            value={formData.title}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="biography" 
                            id="biography" 
                            cols="50" 
                            rows="10" 
                            placeholder="Товч намтар"
                            required
                            value={formData.biography}
                            onChange={handleChange}
                            style={{ padding: "16px"}}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="И-мэйл"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="education" 
                            id="education" 
                            cols="50" 
                            rows="5" 
                            placeholder="Боловсрол"
                            required
                            value={formData.education}
                            onChange={handleChange}
                            style={{ padding: "16px"}}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="experience" 
                            id="experience" 
                            cols="50" 
                            rows="5" 
                            placeholder="Ажлын туршлага"
                            required
                            value={formData.experience}
                            onChange={handleChange}
                            style={{ padding: "16px"}}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="photo">
                            {formData.photo ? formData.photo.name : "Зураг сонгох"}
                          </label>
                          <FileBase 
                            type="file"
                            id="photo"
                            required
                            multiple={false}
                            onDone={({ base64 }) => setFormData({...formData, photo: base64 })}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          {formData.photo && (
                            <div className="form__image__container">
                              <img
                                className="form__image"
                                src={formData.photo}
                                alt={formData?.photo?.name}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            placeholder="Нууц үг"
                            required
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Нууц үг давтах"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <Select
                            id="role"
                            size="large"
                            showSearch
                            style={{ width: "100%" }}
                            bordered={true}
                            placeholder="Ангилал"
                            onChange={(value) => setFormData({ ...formData, role: value })}>
                            <Option value="2">Эмч</Option>
                            <Option value="1">Админ</Option>
                            <Option value="0">Хэрэглэгч</Option>
                          </Select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="startTime">
                            Ажил эхлэх цаг:
                          </label>
                          <input
                            type="time" 
                            name="startTime"
                            id="startTime"
                            placeholder="Ажил эхлэх цаг"
                            required
                            value={formData.startTime}
                            onChange={handleChange} 
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="endTime">
                            Ажил дуусах цаг:
                          </label>
                          <input
                            type="time" 
                            name="endTime"
                            id="endTime"
                            placeholder="Ажил дуусах цаг"
                            required
                            value={formData.endTime}
                            onChange={handleChange} 
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="timeDuration">
                            Үзлэгийн хугацаа (минутаар):
                          </label>
                          <input
                            type="number" 
                            name="timeDuration"
                            placeholder="Үзлэгийн хугацаа"
                            required
                            value={formData.timeDuration}
                            onChange={handleChange} 
                          />
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="form-group login-btn">
                          <button className="btn" type="submit">ИЛГЭЭХ</button>
                        </div>
                        <br />
                        <div className="form-group login-btn">
                          <button className="btn" type="button" onClick={clear}>АРИЛГАХ</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
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
                    <th scope="col">ГАРЧИГ</th>
                    <th scope="col">ҮЙЛДЭЛ</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors?.map((item, index) => (
                    <tr key={index}>
                      <td key={item.id}><b>{item.name}</b></td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => setSelected(item)}
                        >
                          ЗАСАХ
                        </button>
                          &nbsp;
                        <button
                          className="btn button__danger"
                          onClick={() => handleDelete(item.id)}
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
        </div>
      </div>
    </Layout>
  );
};

export default CreateDoctor;
