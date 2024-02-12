import React, { useState, useEffect } from "react";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs';
import useFaq from '../../hooks/useFaq';
import useDepartment from '../../hooks/useDepartment';
import toast from "react-hot-toast";
import * as api from '../../api/index';



const { Option } = Select;

const initialState = {
  department: '',
  question: '',
  answer: '',
}

const CreateFaq = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const faq = useFaq();
  const [faqs, setFaqs] = useState();
  const departments = useDepartment();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setFaqs(faq);
  }, [faq]);


  useEffect(() => {
    if (selected) {
      setFormData(selected);
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateFaq(selected.id, formData);
      
        if (data?.success) {
          setFaqs(data.faq);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createFaq(formData);
      
        if (data?.success) {
          setFaqs(data.faq);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Faq илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteFaq(id);

      if (data.success) {
        setFaqs(data.faq);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Faq устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };


  return (
    <Layout>
      <Breadcrumbs title="Асуулт Хариулт" />

      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                  <div className="register-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="register-form">
                  <h2>{selected ? "Асуулт хариулт засах" : "Асуулт хариулт үүсгэх"}</h2>

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
                            name="question"
                            placeholder="Асуулт"
                            required
                            value={formData.question}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="answer"
                            placeholder="Хариулт"
                            required
                            value={formData.answer}
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
                    <th scope="col">Тасаг нэгж</th>
                    <th scope="col">Асуулт</th>
                    <th scope="col">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs?.map((item, index) => (
                    <tr key={index}>
                      <td key={item.id}><b>{departments?.map((d) => 
                        d.id === item.department ? d.title : null
                      )}</b></td>
                      <td key={item.id}><b>{item.question}</b></td>
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

export default CreateFaq;
