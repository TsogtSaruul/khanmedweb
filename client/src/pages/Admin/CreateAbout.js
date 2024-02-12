import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import * as api from '../../api/index';
import FileBase from 'react-file-base64';
import Breadcrumbs from '../../components/Breadcrumbs'
import useAbout from '../../hooks/useAbout';


const initialState = {
  title: '',
  text: '',
  list: '',
  photo: '',
  link: '',
}

const CreateAbout = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const about = useAbout();
  const [abouts, setAbouts] = useState();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setAbouts(about);
  }, [about]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateAbout(selected.id, formData);
      
        if (data?.success) {
          setAbouts(data.about);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createAbout(formData);
      
        if (data?.success) {
          setAbouts(data.about);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("About илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteAbout(id);

      if (data.success) {
        setAbouts(data.about);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("About устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };

  
  return (
    <Layout>
      <Breadcrumbs title="Бидний Тухай" />

      <section className="login section">
        <div className="container">
            <div className="inner">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="login-left"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="login-form">
                            <h2>{selected ? "Засварлах" : "Шинээр үүсгэх"}</h2>

                            <form className="form" onSubmit={handleSubmit}>
                                <div className="row">  
                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        name="title"
                                        placeholder="Гарчиг..."
                                        required
                                        value={formData.title}
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
                                        placeholder="Текст..."
                                        required
                                        value={formData.text}
                                        onChange={handleChange}
                                        >
                                      </textarea>
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <textarea 
                                        name="list" 
                                        id="list" 
                                        cols="50" 
                                        rows="10" 
                                        placeholder="Жагсаалт..."
                                        required
                                        value={formData.list}
                                        onChange={handleChange}
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
                                        name="link"
                                        placeholder="Холбоос..."
                                        required
                                        value={formData.link}
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
                  {abouts?.map((item, index) => (
                    <tr key={index}>
                      <td key={item.id}><b>{item.title}</b></td>
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

export default CreateAbout;
