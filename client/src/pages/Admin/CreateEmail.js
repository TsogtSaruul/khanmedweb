import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs';
import useEmail from '../../hooks/useEmail';
import toast from "react-hot-toast";
import * as api from '../../api/index';
import { Select } from "antd";


const { Option } = Select;

const initialState = {
  email: '',
}

const CreateEmail = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const email = useEmail();
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [records, setRecords] = useState([]);
  const numberOfPages = Math.ceil(emails?.length / recordsPerPage);  
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  useEffect(() => {
    if (search === ""){
      setEmails(email);
    }
    setRecords(() => emails?.slice(firstIndex, lastIndex));
  }, [search, currentPage, emails])


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


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const clear = () => {
    setFormData(initialState);
    setSelected(null);
  }


  useEffect(() => {
    setEmails(email);
  }, [email]);


  useEffect(() => {
    if (selected) {
      setFormData({
        firstName: selected.firstName,
        lastName: selected.lastName,
        phone: selected.phone,
        email: selected.email,
        password: selected.password,
        confirmPassword: selected.password,
        role: selected.role,
      });
    }
  }, [selected]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        const { data } = await api.updateEmail(selected.id, formData);
      
        if (data?.success) {
          setEmails(data?.emails);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createEmail(formData);
      
        if (data?.success) {
          setEmails(data.emails);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Email илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteEmail(id);

      if (data.success) {
        setEmails(data.email);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Email устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };


  const handleSearch = () => {
    if (search != "") {
      const searchItem = emails?.filter((item) => item?.email?.includes(String(search)) ? item : null);      
      setEmails(searchItem);
    }    
  }

  useEffect(() => {
    if (search === "") setEmails(email);
  }, [email, search]);
  


  return (
    <Layout>
      <Breadcrumbs title="И-мэйл" />

      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                  <div className="register-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="register-form">
                  <h2>{selected ? "И-мэйл Засах" : "И-мэйл Үүсгэх"}</h2>

                  <form className="form" onSubmit={handleSubmit}>
                    <div className="col">
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

      <div className="container" style={{ marginBottom: "4rem" }}>
        <div className="row">
          <div className="col-12">
            <div className="main-sidebar">
              <div className="single-widget search">
                <div className="form">
                  <input type="email" placeholder="И-мэйл хаягаар хайх..." name="search" onChange={(e) => setSearch(e.target.value)} />
                  <a className="button" onClick={handleSearch}><i className="fa fa-search"></i></a>
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
                    <th scope="col">И-МЭЙЛ</th>
                    <th scope="col">ҮЙЛДЭЛ</th>
                  </tr>
                </thead>
                <tbody>
                  {records?.map((item, index) => (
                    <tr key={index}>
                      <td key={item.id}><b>{item.email}</b></td>
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

export default CreateEmail;
