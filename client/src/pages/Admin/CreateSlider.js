import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import FileBase from 'react-file-base64';
import Breadcrumbs from '../../components/Breadcrumbs'
import useSlider from '../../hooks/useSlider'
import toast from "react-hot-toast";
import * as api from '../../api/index';


const initialState = {
  photo: '',
  title1: '',
  title2: '',
  title3: '',
  title4: '',
  text: '',
}

const CreateSlider = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const slider = useSlider();
  const [sliders, setSliders] = useState();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setSliders(slider);
  }, [slider]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateSlider(selected.id, formData);
      
        if (data?.success) {
          setSliders(data.slider);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createSlider(formData);
      
        if (data?.success) {
          setSliders(data.slider);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Slider илгээх үед алдаа гарлаа!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteSlider(id);

      if (data.success) {
        setSliders(data.slider);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Slider устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };
  
  return (
    <Layout>
      <Breadcrumbs title="Слайдер" />

      <section className="login section">
        <div className="container">
            <div className="inner">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="login-left"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="login-form">
                            <h2>{selected ? "Слайдер Засах" : "Слайдер Үүсгэх"}</h2>

                            <form className="form" onSubmit={handleSubmit}>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <label htmlFor="photo">
                                        {formData.photo ? formData.title1 : "Зураг Сонгох"}
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
                                            alt="зураг"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
  
                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        name="title1"
                                        placeholder="Гарчиг 1"
                                        required
                                        value={formData.title1}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        name="title2"
                                        placeholder="Гарчиг 2"
                                        required
                                        value={formData.title2}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        name="title3"
                                        placeholder="Гарчиг 3"
                                        required
                                        value={formData.title3}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        name="title4"
                                        placeholder="Гарчиг 4"
                                        required
                                        value={formData.title4}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <textarea 
                                        name="text" 
                                        id="text" 
                                        cols="50" 
                                        rows="10" 
                                        placeholder="Текст"
                                        required
                                        value={formData.text}
                                        onChange={handleChange}
                                        >
                                      </textarea>
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
                    <th scope="col">СЛАЙДЕР</th>
                    <th scope="col">ҮЙЛДЭЛ</th>
                  </tr>
                </thead>
                <tbody>
                  {sliders?.map((item, index) => (
                    <tr key={index}>
                      <td key={item.id}><img src={item.photo} alt={item.title1} /></td>
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

export default CreateSlider;
