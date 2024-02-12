import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from '../../components/Breadcrumbs';
import useUser from '../../hooks/useUser';
import toast from "react-hot-toast";
import * as api from '../../api/index';
import { Select } from "antd";


const { Option } = Select;

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 0,
}

const CreateUser = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(null);
  const user = useUser();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [records, setRecords] = useState([]);
  const numberOfPages = Math.ceil(users?.length / recordsPerPage);  
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  useEffect(() => {
    if (search === ""){
      setUsers(user);
    }
    setRecords(() => users?.slice(firstIndex, lastIndex));
  }, [search, currentPage, users])


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
    setUsers(user);
  }, [user]);


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
        const { data } = await api.updateUser(selected._id, formData);
      
        if (data?.success) {
          setUsers(data?.user);
          setSelected(null);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();

      } else {
        const { data } = await api.createUser(formData);
      
        if (data?.success) {
          setUsers(data.user);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        clear();
      }
    
    } catch (error) {
      console.log(error);
      toast.error("User илгээх үед алдаа гарлаа!");
    }
  };


  const handleDelete = async (id) => {
    try {
      const { data } = await api.deleteUser(id);

      if (data.success) {
        setUsers(data.user);
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("User устгах хүсэлт илгээх үед алдаа гарлаа!");
    }
  };


  const handleSearch = () => {
    if (search != "") {
      const searchItem = users?.filter((item) => item.name.includes(String(search)) ? item : null);      
      setUsers(searchItem);
    }    
  }

  useEffect(() => {
    if (search === "") setUsers(user);
  }, [user, search]);
  


  return (
    <Layout>
      <Breadcrumbs title="Хэрэглэгч" />

      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                  <div className="register-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="register-form">
                  <h2>{selected ? "Хэрэглэгч Засах" : "Хэрэглэгч Үүсгэх"}</h2>
                  {selected ? <p>"Нууц үг" дахин оруулна. "И-мэйл" өөрчилж болохгүй!</p> : null}

                  <form className="form" onSubmit={handleSubmit}>
                    <div className="col">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Нэр"
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
                            type="tel"
                            name="phone"
                            placeholder="Утас"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                          />
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
                          <input
                              type="password"
                              name="password"
                              placeholder="Нүүц үг"
                              required
                              value={formData.password}
                              onChange={handleChange}
                          />
                          <a className="button" href="#"><i className="fa fa-eye-slash"></i></a>
                          {/* {"password" ==="password" ? (
                              <button
                                  className='form-input-button' 
                                  type='button' 
                                  onClick={handleShowPassword}>
                                  {showPassword ? <BsEyeSlash size={20}/> : <BsEye size={20}/>}
                              </button>
                          ):null} */}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Нүүц үг давтах"
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
                            <Option value="2">Doctor</Option>
                            <Option value="1">Admin</Option>
                            <Option value="0">User</Option>
                          </Select>
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
                  <input type="email" placeholder="Хэрэглэгчийн нэрээр хайх..." name="search" onChange={(e) => setSearch(e.target.value)} />
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
                    <th scope="col">ГАРЧИГ</th>
                    <th scope="col">ҮЙЛДЭЛ</th>
                  </tr>
                </thead>
                <tbody>
                  {records?.map((item, index) => (
                    <tr key={index}>
                      <td key={item._id}><b>{item.name}</b></td>
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
                          onClick={() => handleDelete(item._id)}
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

export default CreateUser;
