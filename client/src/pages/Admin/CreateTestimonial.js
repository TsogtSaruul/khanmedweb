import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs'
import FileBase from 'react-file-base64';
import useTestimonial from '../../hooks/useTestimonial';
import toast from "react-hot-toast";
import * as api from '../../api/index';


const initialState = {
  patientFirstName: '',
  patientLastName: '',
  patientTestimonial: '',
  patientPhoto: '',
}

const CreateTestimonial = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const [testimonials, setTestimonials] = useState();
  const testimonial = useTestimonial();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setTestimonials(testimonial);
  }, [testimonial]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateTestimonial(selected.id, formData);
      
        if (data?.success) {
          setTestimonials(data.testimonial);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createTestimonial(formData);
      
        if (data?.success) {
          setTestimonials(data.testimonial);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Testimonial илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteTestimonial(id);

      if (data.success) {
        setTestimonials(data.testimonial);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Testimonial устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };
  

  return (
    <Layout>
      <Breadcrumbs title="Сэтгэгдэл" />

      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                  <div className="register-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="register-form">
                  <h2>{selected ? "Сэтгэгдэл Засах" : "Сэтгэгдэл Үүсгэх"}</h2>

                  <form className="form" onSubmit={handleSubmit}>
                    <div className="col">

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="patientFirstName"
                            placeholder="Үйлчлүүлэгчийн Нэр"
                            required
                            value={formData.patientFirstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="patientLastName"
                            placeholder="Үйлчлүүлэгчийн Овог"
                            required
                            value={formData.patientLastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="patientTestimonial" 
                            id="patientTestimonial" 
                            cols="50" 
                            rows="10" 
                            placeholder="Үйлчлүүлэгчийн Сэтгэгдэл"
                            required
                            value={formData.patientTestimonial}
                            onChange={handleChange}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="detailsPhoto">
                            {formData.patientPhoto ? formData.patientPhoto.name : "Зураг Сонгох"}
                          </label>
                          <FileBase 
                            type="file"
                            id="patientPhoto"
                            required
                            multiple={false}
                            onDone={({ base64 }) => setFormData({...formData, patientPhoto: base64 })}
                          />
                        </div>
                      </div>


                      <div className="col-lg-12">
                        <div className="form-group">
                          {formData.patientPhoto && (
                            <div className="form__image__container">
                              <img
                                className="form__image"
                                src={formData.patientPhoto}
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
                  {testimonials?.map((item, index) => (
                    <tr key={index}>
                      <td key={item.id}><b>{item.patientName}</b></td>
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

export default CreateTestimonial;
