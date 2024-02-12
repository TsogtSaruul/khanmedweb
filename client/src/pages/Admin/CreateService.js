import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import FileBase from 'react-file-base64';
import Breadcrumbs from '../../components/Breadcrumbs'
import useService from '../../hooks/useService';
import * as api from '../../api/index';


const initialState = {
  serviceLogo: '',
  serviceTitle: '',
  serviceText: '',
  detailsTitle: '',
  detailsText1: '',
  detailsText2: '',
  detailsQuote: '',
  detailsPhoto: '',
}

const CreateService = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const service = useService();
  const [services, setServices] = useState();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setServices(service);
  }, [service]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateService(selected.id, formData);
      
        if (data?.success) {
          setServices(data.service);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createService(formData);
      
        if (data?.success) {
          setServices(data.service);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Service илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteService(id);

      if (data.success) {
        setServices(data.service);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Service устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };


  return (
    <Layout>
      <Breadcrumbs title="Үйлчилгээ" />

      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                  <div className="register-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="register-form">
                  <h2>{selected ? "Үйлчилгээ Засах" : "Үйлчилгээ Үүсгэх"}</h2>

                  <form className="form" onSubmit={handleSubmit}>
                    <div className="col">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="serviceLogo"
                            placeholder="Лого"
                            required
                            value={formData.serviceLogo}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="serviceTitle"
                            placeholder="Гарчиг"
                            required
                            value={formData.serviceTitle}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="serviceText" 
                            id="serviceText" 
                            cols="50" 
                            rows="5" 
                            placeholder="Текст"
                            required
                            value={formData.serviceText}
                            onChange={handleChange}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="detailsTitle"
                            placeholder="Дэлгэрэнгүй Гарчиг"
                            required
                            value={formData.detailsTitle}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="detailsText1" 
                            id="detailsText1" 
                            cols="50" 
                            rows="10" 
                            placeholder="Дэлгэрэнгүй Текст 1"
                            required
                            value={formData.detailsText1}
                            onChange={handleChange}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="detailsText2" 
                            id="detailsText2" 
                            cols="50" 
                            rows="10" 
                            placeholder="Дэлгэрэнгүй Текст 2"
                            required
                            value={formData.detailsText2}
                            onChange={handleChange}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="detailsQuote" 
                            id="detailsQuote" 
                            cols="50" 
                            rows="5" 
                            placeholder="Дэлгэрэнгүй Ишлэл"
                            required
                            value={formData.detailsQuote}
                            onChange={handleChange}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="detailsPhoto">
                            {formData.detailsPhoto ? formData.detailsPhoto.name : "Зураг Сонгох"}
                          </label>
                          <FileBase 
                            type="file"
                            id="detailsPhoto"
                            required
                            multiple={false}
                            onDone={({ base64 }) => setFormData({...formData, detailsPhoto: base64 })}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          {formData.detailsPhoto && (
                            <div className="form__image__container">
                              <img
                                className="form__image"
                                src={formData.detailsPhoto}
                                alt="зураг"
                              />
                            </div>
                          )}
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
                  {services?.map((item, index) => (
                    <tr key={index}>
                      <td key={item.id}><b>{item.serviceTitle}</b></td>
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

export default CreateService;
