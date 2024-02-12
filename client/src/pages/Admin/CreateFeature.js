import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs'
import useFeature from '../../hooks/useFeature'
import toast from "react-hot-toast";
import * as api from '../../api/index';


const initialState = {
  icon: '',
  title: '',
  text: '',
}

const CreateFeature = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const feature = useFeature();
  const [features, setFeatures] = useState();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setFeatures(feature);
  }, [feature]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateFeature(selected.id, formData);
      
        if (data?.success) {
          setFeatures(data.feature);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createFeature(formData);
      
        if (data?.success) {
          setFeatures(data.feature);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Feature илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteFeature(id);

      if (data.success) {
        setFeatures(data.feature);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Feature устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };

  
  return (
    <Layout>
      <Breadcrumbs title="Онцлог Чанар" />

      <section className="login section">
        <div className="container">
            <div className="inner">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="login-left"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="login-form">
                            <h2>{selected ? "Онцлог Чанар Засах" : "Онцлог Чанар Үүсгэх"}</h2>

                            <form className="form" onSubmit={handleSubmit}>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        name="icon"
                                        placeholder="Айкон"
                                        required
                                        value={formData.icon}
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
                                      <input
                                        type="text"
                                        name="text"
                                        placeholder="Текст"
                                        required
                                        value={formData.text}
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
                  {features?.map((item, index) => (
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

export default CreateFeature;
