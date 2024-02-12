import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as api from '../api';


const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const ForgotPassword = () => {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.register(formData);

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Бүртгэлийн хэсэгт алдаа гарсан байна!");
        }
    };


    return (
        <section className="register section">
            <div className="container">
                <div className="inner">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="register-left"></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="register-form">
                                <h2>Нууц үгээ солих</h2>
                                <p>
                                    Нууц үгээ олчихсон уу? <a href="/login">Энд нэвтрэх</a>
                                </p>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
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
                                                    placeholder="New Password"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    placeholder="Confirm New Password"
                                                    required
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group login-btn">
                                                <button className="btn" type="submit">Илгээх</button>
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
    )
}

export default ForgotPassword