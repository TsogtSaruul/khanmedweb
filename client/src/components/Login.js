import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import * as api from '../api';


const initialState = {
    email: '',
    password: '',
}

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.login(formData);      

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Нэвтрэх хэсэгт алдаа гарлаа!");
        }
    };
    
    
    return (
        <section className="login section">
            <div className="container">
                <div className="inner">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login-left"></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login-form">
                                <h2>Нэвтрэх</h2>
                                <p>
                                    Өмнө нь бүртгүүлж байгаагүй бол
                                    <a href="/register">Энд бүртгүүлэх</a>
                                </p>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="И-мэйл..."
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Нүүц үг..."
                                                    required
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group login-btn">
                                                <button className="btn" type="submit">Нэвтрэх</button>
                                            </div>
                                            <br />
                                            <p>
                                                Нууц үгээ мартсан бол 
                                                <a href="/forgot-password">Энд солих</a>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login