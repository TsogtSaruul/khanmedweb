import React, { useState, useEffect } from "react";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
import FileBase from 'react-file-base64';
import Breadcrumbs from '../../components/Breadcrumbs'
import usePortfolio from '../../hooks/usePortfolio';
import useDepartment from '../../hooks/useDepartment';
import toast from "react-hot-toast";
import * as api from '../../api/index';



const { Option } = Select;

const initialState = {
  department: '',
  title: '',
  smallImage: '',
  largeImage: '',
  clientName: '',
  procedure: '',
  text1: '',
  text2: '',
  date: Date,
}

const CreatePortfolio = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const portfolio = usePortfolio();
  const [portfolios, setPortfolios] = useState();
  const departments = useDepartment();
  console.log('portfolios================> ', portfolios);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setPortfolios(portfolio);
  }, [portfolio]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updatePortfolio(selected.id, formData);
      
        if (data?.success) {
          setPortfolios(data.portfolio);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createPortfolio(formData);
      
        if (data?.success) {
          setPortfolios(data.portfolio);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Portfolio илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deletePortfolio(id);

      if (data.success) {
        setPortfolios(data.portfolio);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Portfolio устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };



  return (
    <Layout>
      <Breadcrumbs title="Портфолио" />
      
      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                  <div className="register-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="register-form">
                  <h2>{selected ? "Портфолио Засах" : "Портфолио Үүсгэх"}</h2>

                  <form className="form" onSubmit={handleSubmit}>
                    <div className="col">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <Select
                            className="form__select"
                            id="select"
                            bordered={true}
                            showSearch
                            required
                            size="large"
                            placeholder="Тасаг нэгж"
                            style={{ width: "100%" }}
                            onChange={(value) => setFormData({ ...formData, department: value })}>
                            {departments?.map((item) => (
                              <Option key={item._id} value={item._id}>
                                {item.title}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="smallImage">
                            {formData.smallImage ? formData.title : "Жижиг зураг сонгох"}
                          </label>
                          <FileBase 
                            type="file"
                            id="smallImage"
                            required
                            multiple={false}
                            onDone={({ base64 }) => setFormData({...formData, smallImage: base64 })}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          {formData.smallImage && (
                            <div className="form__image__container">
                              <img
                                className="form__image"
                                src={formData.smallImage}
                                alt="Small image"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="largeImage">
                            {formData.largeImage ? formData.largeImage.name : "Том зураг сонгох"}
                          </label>
                          <FileBase 
                            type="file"
                            id="largeImage"
                            required
                            multiple={false}
                            onDone={({ base64 }) => setFormData({...formData, largeImage: base64 })}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          {formData.largeImage && (
                            <div className="form__image__container">
                              <img
                                className="form__image"
                                src={formData.largeImage}
                                alt="Small image"
                              />
                            </div>
                          )}
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
                            name="clientName"
                            placeholder="Үйлчлүүлэгчийн нэр"
                            required
                            value={formData.clientName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="procedure"
                            placeholder="Процедур"
                            required
                            value={formData.procedure}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="text1" 
                            id="text1" 
                            cols="50" 
                            rows="10" 
                            placeholder="Текст 1"
                            required
                            value={formData.text1}
                            onChange={handleChange}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea 
                            name="text2" 
                            id="text2" 
                            cols="50" 
                            rows="10" 
                            placeholder="Текст 2"
                            required
                            value={formData.text2}
                            onChange={handleChange}
                            >
                          </textarea>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="date"
                            name="date"
                            placeholder="Огноо"
                            required
                            value={formData.date}
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
                  {portfolios?.map((item, index) => (
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

export default CreatePortfolio;
