import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import * as api from '../../api/index';
import Breadcrumbs from "../../components/Breadcrumbs";


const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name] : e.target.value });
  };

  //get user data
  useEffect(() => {
    const { name, email, phone } = auth?.user;
    setFormData({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email: email,
      phone: phone,
    }
    );
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.updateProfile(formData);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Хувийн мэдээлэл амжилттай шинэчлэгдлээ!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Хувийн мэдээлэл шинэчлэх үед алдаа гарлаа!");
    }
  };

  
  return (
    <Layout title={"Your Profile"}>
      <Breadcrumbs title="Профайл" />

      <section className="register section">
        <div className="container">
          <div className="inner">
            <div className="row">
                <div className="col-lg-6">
                    <div className="register-left"></div>
                </div>
                <div className="col-lg-6">
                    <div className="register-form">
                        <h2>Профайл Засах</h2>
                        {/* <p>
                            Already have an account ? <a href="/login">Login Here</a>
                        </p> */}

                        <form className="form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Нэр:</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="Нэр"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="lastName">Овог:</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            placeholder="Овог"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="phone">Утас:</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            placeholder="Утас"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="email">И-мэйл:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="И-мэйл"
                                            required
                                            disabled
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="password">Нууц үг:</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Нууц үг"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Нууц үг давтах:</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="Нууц үг давтах"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group login-btn">
                                        <button className="btn" type="submit">ИЛГЭЭХ</button>
                                    </div>
                                    {/* <div className="checkbox">
                                        <label className="checkbox-inline" for="2">
                                            <input name="news" id="2" type="checkbox" />
                                            Yes, I agree with all
                                        </label>
                                    </div>
                                    <a href="#" className="terms">Terms &amp; Conditions</a> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
