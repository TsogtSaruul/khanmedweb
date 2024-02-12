import React, { useState } from 'react'
import useAbout from '../../hooks/useAbout';
import useSchedule from '../../hooks/useSchedule';
import useSocial from '../../hooks/useSocial';
import * as api from '../../api'
import toast from "react-hot-toast";


const initialState = {
    email: '',
  }

const Footer = () => {
    const abouts = useAbout();
    const about = abouts[0];
    const schedules = useSchedule();
    const schedule = schedules[0];
    const socials = useSocial();
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const clear = () => {
        setFormData(initialState);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { data } = await api.createEmail(formData);
    
            if (data?.success) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
            clear();

        } catch (error) {
            console.log(error);
            toast.error("И-мэйд илгээх үед алдаа гарлаа!");
        }
    };

    
    return (
        <footer id="footer" className="footer ">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-footer">
                                <h2>Бидний&nbsp;тухай</h2>
                                <p>{about?.text?.substr(0,100)}</p>
                                <ul className="social">
                                    {socials?.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.link} target='_blank'>
                                                <i className={item.icon}></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-footer f-link">
                                <h2>Холбоосууд</h2>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <ul>
                                            <li><a href="/"><i className="fa fa-caret-right" aria-hidden="true"></i>Нүүр&nbsp;хуудас</a></li>
                                            <li><a href="/about-us"><i className="fa fa-caret-right" aria-hidden="true"></i>Бидний&nbsp;тухай</a></li>
                                            <li><a href="/service"><i className="fa fa-caret-right" aria-hidden="true"></i>Үйлчилгээ</a></li>
                                            <li><a href="/appointment"><i className="fa fa-caret-right" aria-hidden="true"></i>Үзлэгийн&nbsp;цаг</a></li>
                                            <li><a href="/portfolio"><i className="fa fa-caret-right" aria-hidden="true"></i>Портфолио</a></li>	
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <ul>
                                            <li><a href="/doctor"><i className="fa fa-caret-right" aria-hidden="true"></i>Эмч&nbsp;нар</a></li>
                                            <li><a href="/our-pricing"><i className="fa fa-caret-right" aria-hidden="true"></i>Үнийн&nbsp;санал</a></li>
                                            <li><a href="/testimonials"><i className="fa fa-caret-right" aria-hidden="true"></i>Сэтгэгдэл</a></li>
                                            <li><a href="/faq"><i className="fa fa-caret-right" aria-hidden="true"></i>Асуулт&nbsp;хариулт</a></li>
                                            <li><a href="/contact-us"><i className="fa fa-caret-right" aria-hidden="true"></i>Холбоо&nbsp;барих</a></li>	
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-footer">
                                <h2>{schedule?.title}</h2>
                                <ul className="time-sidual">
                                    <li className="day">{schedule?.text1?.substr(0,15)}<span>{schedule?.text1.substr(15,21)}</span></li>
                                    <li className="day">{schedule?.text2?.substr(0,16)}<span>{schedule?.text2.substr(16,21)}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-footer">
                                <h2>Мэдээ мэдээлэл</h2>
                                <p>И-мэйл хаягаа илгээснээр та манайхаас зарлагдсан мэдээ мэдээллийг цаг алдалгүй авдаг болно.</p>
                                <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="И-мэйлээ энд оруулах..." 
                                        className="common-input"  
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <button type='submit' className="button" onClick={handleSubmit}><i className="icofont icofont-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="copyright-content">
                                <p>© Зохиогчийн эрх 2023  | Бүх эрх хуулиар хамгаалагдсан болно. <a href="" target="_blank">Хан Мед Эмнэлэг</a> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer