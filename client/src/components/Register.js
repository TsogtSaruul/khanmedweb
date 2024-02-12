import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import * as api from '../api';
import { BsEyeSlash } from 'react-icons/bs'
import { BsEye } from 'react-icons/bs'


const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Register = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState();
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


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


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
                                <h2>Бүртгүүлэх</h2>
                                <p>Өмнө нь бүртгүүлсэн бол <a href="/login">Энд нэвтрэх</a></p>

                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="Нэр..."
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Овог..."
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Утас..."
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
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
                                                    placeholder="Нууц үг..."
                                                    required
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                {/* <a className="button" href="#"><i className="fa fa-eye-slash"></i></a> */}
                                                    <button
                                                        className='form-input-button' 
                                                        type='button' 
                                                        onClick={handleShowPassword}>
                                                        {showPassword ? <BsEyeSlash size={20}/> : <BsEye size={20}/>}
                                                    </button>
                                                
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
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    placeholder="Нууц үг давтах..."
                                                    required
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group login-btn">
                                                <button className="btn" type="submit">БҮРТГҮҮЛЭХ</button>
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

export default Register