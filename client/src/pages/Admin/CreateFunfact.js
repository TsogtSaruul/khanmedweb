import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs'
import useFunfact from '../../hooks/useFunfact'
import toast from "react-hot-toast";
import * as api from '../../api/index';


const initialState = {
  icon: '',
  number: 0,
  title: '',
}

const CreateFunfact = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const funfact = useFunfact();
  const [funfacts, setFunfacts] = useState();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setFunfacts(funfact);
  }, [funfact]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateFunfact(selected.id, formData);
      
        if (data?.success) {
          setFunfacts(data.funfact);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createFunfact(formData);
      
        if (data?.success) {
          setFunfacts(data.funfact);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Funfact илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteFunfact(id);

      if (data.success) {
        setFunfacts(data.funfact);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Funfact устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };

  
  return (
    <Layout>
      <Breadcrumbs title="Тоо Баримт" />

      <section className="login section">
        <div className="container">
            <div className="inner">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="login-left"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="login-form">
                            <h2>{selected ? "Тоо Баримт Засах" : "Тоо Баримт Үүсгэх"}</h2>

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
                                        type="number"
                                        name="number"
                                        placeholder="Тоо хэмжээ"
                                        required
                                        value={formData.number}
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
                  {funfacts?.map((item, index) => (
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

export default CreateFunfact;
