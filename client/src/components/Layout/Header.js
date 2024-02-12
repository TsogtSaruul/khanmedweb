import React from 'react'
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import TopBar from '../TopBar'
import Logo from '../../assets/new_logo.jpeg'


const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Successfull Logout!");
    };
    

    return (
        <header className="header" >
            <TopBar />

            <div className="header-inner">
                <div className="container">
                    <div className="inner">
                        <div className="row">

                            <div className="col-lg-3 col-md-3 col-12">
                                <div className="logo">
                                    <a href="/">
                                        <img src={Logo} alt="Logo" />
                                    </a>
                                </div>
                                <div className="mobile-nav"></div>
                            </div>

                            <div className="col-lg-7 col-md-9 col-12">
                                <div className="main-menu">
                                    <nav className="navigation">
                                        <ul className="nav menu">
                                            <li className="active"><a href="/">Нүүр </a></li>
                                            <li><a>Хуудас <i className="icofont-rounded-down"></i></a>
                                                <ul className="dropdown">                                                   
                                                    {/* <li><a href="/blog-grid">Blogs </a></li> */}
                                                    <li><a href="/about-us">Бидний&nbsp;тухай</a></li>
                                                    <li><a href="/doctor">Эмч&nbsp;нар</a></li>
                                                    <li><a href="/department">Тасаг&nbsp;нэгж</a></li>
                                                    <li><a href="/portfolio">Портфолио</a></li>
                                                    <li><a href="/testimonials">Сэтгэгдэл</a></li>
                                                    <li><a href="/our-pricing">Үнийн&nbsp;санал</a></li>
                                                    <li><a href="/faq">Асуулт&nbsp;хариулт</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="/service">Үйлчилгээ</a></li>
                                            <li><a href="/contact-us">Холбоо&nbsp;барих</a></li>
                                            
                                            {!auth?.user ? (
                                                <li><a href="#">Нэвтрэх <i className="icofont-rounded-down"></i></a>
                                                    <ul className="dropdown">
                                                        <li><a href="/login">Нэвтрэх</a></li>
                                                        <li><a href="/register">Бүртгүүлэх</a></li>
                                                    </ul>
                                                </li>
                                            ) : (
                                                <li>
                                                    <a href="#">
                                                        {auth?.user?.name.split(" ")[0]}
                                                        <i className="icofont-rounded-down"></i>
                                                    </a>
                                                    <ul className="dropdown">
                                                        {auth?.user?.role === 1 ? 
                                                            <div>
                                                                <li><a href={`/dashboard/admin`}>Хянах&nbsp;самбар</a></li>
                                                                <li><a href={`/dashboard/admin/profile`}>Профайл</a></li>
                                                                <li><a href={`/dashboard/admin/appointment`}>Үзлэгийн&nbsp;цаг</a></li>                                                                
                                                            </div>
                                                            :
                                                            <div>
                                                                <li><a href={`/dashboard/user/profile`}>Профайл</a></li>
                                                                <li><a href={`/dashboard/user/appointment`}>Үзлэгийн&nbsp;цаг</a></li>
                                                            </div>
                                                        }                                                            
                                                        <li><a href="/login" onClick={handleLogout}>Гарах</a></li>
                                                    </ul>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                            <div className="col-lg-2 col-12">
                                <div className="get-quote">
                                    <a href="/appointment" className="btn">Үзлэгийн&nbsp;цаг&nbsp;авах</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header