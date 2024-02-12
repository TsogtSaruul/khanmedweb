import React from "react";
import Layout from "../../components/Layout/Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoGridSharp } from "react-icons/io5";
import { MdOutlineReceiptLong } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { MdOutlineRoomService } from "react-icons/md";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiHandbagLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { LuPhoneCall } from "react-icons/lu";
import { FaRegHandshake } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import useAbout from '../../hooks/useAbout'
import useAppointment from '../../hooks/useAppointment'
import useCallaction from '../../hooks/useCallaction'
import useClient from '../../hooks/useClient'
import useDepartment from '../../hooks/useDepartment';
import useDoctor from '../../hooks/useDoctor';
import useFaq from '../../hooks/useFaq';
import useFeature from '../../hooks/useFeature';
import useFunfact from '../../hooks/useFunfact';
import usePortfolio from '../../hooks/usePortfolio';
import useSchedule from '../../hooks/useSchedule';
import useService from '../../hooks/useService';
import useSlider from '../../hooks/useSlider';
import useTestimonial from '../../hooks/useTestimonial';
import useUser from '../../hooks/useUser';
import usePricing from '../../hooks/usePricing';
import useVision from '../../hooks/useVision';
import useSocial from '../../hooks/useSocial';
import useEmail from '../../hooks/useEmail';
import '../../styles/CSS/AdminDashboard.css'


const AdminDashboard = () => {
    const abouts = useAbout()
    const appointmens = useAppointment()
    const callactions = useCallaction()
    const clients = useClient()
    const departments = useDepartment()
    const doctors = useDoctor()
    const faqs = useFaq()
    const features = useFeature() 
    const funfacts = useFunfact() 
    const portfolios = usePortfolio()
    const schedules = useSchedule()
    const services = useService() 
    const sliders = useSlider()
    const testimonials = useTestimonial()
    const users = useUser()
    const pricings = usePricing()
    const visions = useVision()
    const socials = useSocial()
    const emails = useEmail()

  
  return (
    <Layout>
        <Breadcrumbs title="Хянах Самбар" />
        
        <div className="admin-container">
            <aside className="admin-aside">
                <div className="admin-top">
                    <div className="admin-close" id="close-btn">
                        <span className="material-icons-sharp">close</span>
                        <IoIosCloseCircleOutline />
                    </div>
                </div>

                <div className="admin-sidebar">   
                    <a href="/dashboard/admin" className="admin-a admin-active">
                        <span><IoGridSharp /></span>
                        <span><h3 className="admin-h3">Хянах&nbsp;самбар</h3></span>
                    </a>

                    <a href="/dashboard/admin/create-user" className="admin-a">
                        <span><MdOutlinePerson /></span>
                        <h3 className="admin-h3">Хэрэглэгч</h3>
                    </a>
                    
                    <a href="/dashboard/admin/create-appointment" className="admin-a">
                        <span><MdOutlineReceiptLong /></span>
                        <h3 className="admin-h3">Үзлэгийн&nbsp;цаг</h3>
                    </a>

                    <a href="/dashboard/admin/create-doctor" className="admin-a">
                        <span><FaUserDoctor /></span>
                        <h3 className="admin-h3">Эмч&nbsp;нар</h3>
                    </a>

                    <a href="/dashboard/admin/create-department" className="admin-a">
                        <span><FcDepartment /></span>
                        <h3 className="admin-h3">Тасаг&nbsp;нэгж</h3>
                    </a>

                    <a href="/dashboard/admin/create-service" className="admin-a">
                        <span><MdOutlineRoomService /></span>
                        <h3 className="admin-h3">Үйлчилгээ</h3>
                    </a>

                    <a href="/dashboard/admin/create-about" className="admin-a">
                        <span><GrContactInfo /></span>
                        <h3 className="admin-h3">Бидний&nbsp;тухай</h3>
                    </a>
                    
                    <a href="/dashboard/admin/create-testimonial" className="admin-a">
                        <span><FaRegCommentAlt /></span>
                        <h3 className="admin-h3">Сэтгэгдэл</h3>
                    </a>

                    <a href="/dashboard/admin/create-portfolio" className="admin-a">
                        <span><RiHandbagLine /></span>
                        <h3 className="admin-h3">Портфолио</h3>
                    </a>

                    <a href="/dashboard/admin/create-slider" className="admin-a">
                        <span><FaImages /></span>
                        <h3 className="admin-h3">Слайдер</h3>
                    </a>

                    <a href="/dashboard/admin/create-schedule" className="admin-a">
                        <span><AiOutlineSchedule /></span>
                        <h3 className="admin-h3">Хуваарь</h3>
                    </a>

                    <a href="/dashboard/admin/create-feature" className="admin-a">
                        <span><MdOutlineFeaturedPlayList /></span>
                        <h3 className="admin-h3">Онцлог&nbsp;чанар</h3>
                    </a>

                    <a href="/dashboard/admin/create-funfact" className="admin-a">
                        <span><FaChartBar /></span>
                        <h3 className="admin-h3">Тоо&nbsp;баримт</h3>
                    </a>                    

                    <a href="/dashboard/admin/create-callaction" className="admin-a">
                        <span><LuPhoneCall /></span>
                        <h3 className="admin-h3">Дуудлага</h3>
                    </a>

                    <a href="/dashboard/admin/create-client" className="admin-a">
                        <span><FaRegHandshake /></span>
                        <h3 className="admin-h3">Хамтын&nbsp;ажиллагаа</h3>
                    </a>

                    <a href="/dashboard/admin/create-faq" className="admin-a">
                        <span><FaRegQuestionCircle /></span>
                        <h3 className="admin-h3">Асуулт&nbsp;хариулт</h3>
                    </a>

                    <a href="/dashboard/admin/create-pricing" className="admin-a">
                        <span><FaHandHoldingDollar /></span>
                        <h3 className="admin-h3">Үнийн&nbsp;санал</h3>
                    </a>

                    <a href="/dashboard/admin/create-vision" className="admin-a">
                        <span><FaEye /></span>
                        <h3 className="admin-h3">Алсын&nbsp;хараа</h3>
                    </a>

                    <a href="/dashboard/admin/create-social" className="admin-a">
                        <span><IoShareSocial /></span>
                        <h3 className="admin-h3">Сошиал&nbsp;холбоос</h3>
                    </a>

                    <a href="/dashboard/admin/create-email" className="admin-a">
                        <span><MdOutlineEmail /></span>
                        <h3 className="admin-h3">И-мэйл&nbsp;хаяг</h3>
                    </a>
                </div>
            </aside>

            <main className="admin-main">
                {/* <h1 className="admin-h1">Dashboard</h1> */}

                <div className="admin-insights">

                    
                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-user" className="admin-a">
                            <span><MdOutlinePerson /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Хэрэглэгч</h3>
                                    <h1 className="admin-h1">{users?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-appointment" className="admin-a">
                            <span><MdOutlineReceiptLong /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Үзлэгийн&nbsp;цаг</h3>
                                    <h1 className="admin-h1">{appointmens?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>
                    
                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-doctor" className="admin-a">
                            <span><FaUserDoctor /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Эмч&nbsp;нар</h3>
                                    <h1 className="admin-h1">{doctors?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-department" className="admin-a">
                            <span><FcDepartment /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Тасаг&nbsp;нэгж</h3>
                                    <h1 className="admin-h1">{departments?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-service" className="admin-a">
                            <span><MdOutlineRoomService /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Үйлчилгээ</h3>
                                    <h1 className="admin-h1">{services?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-about" className="admin-a">
                            <span><GrContactInfo /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Бидний&nbsp;тухай</h3>
                                    <h1 className="admin-h1">{abouts?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-slider" className="admin-a">
                            <span><FaImages /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Слайдер</h3>
                                    <h1 className="admin-h1">{sliders?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-portfolio" className="admin-a">
                            <span><RiHandbagLine /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Портфолио</h3>
                                    <h1 className="admin-h1">{portfolios?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-testimonial" className="admin-a">
                            <span><FaRegCommentAlt /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Сэтгэгдэл</h3>
                                    <h1 className="admin-h1">{testimonials?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-schedule" className="admin-a">
                            <span><AiOutlineSchedule /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Хуваарь</h3>
                                    <h1 className="admin-h1">{schedules?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-feature" className="admin-a">
                            <span><MdOutlineFeaturedPlayList /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Онцлог&nbsp;чанар</h3>
                                    <h1 className="admin-h1">{features?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-funfact" className="admin-a">
                            <span><FaChartBar /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Тоо&nbsp;баримт</h3>
                                    <h1 className="admin-h1">{funfacts?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-callaction" className="admin-a">
                            <span><LuPhoneCall /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Дуудлага</h3>
                                    <h1 className="admin-h1">{callactions?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-client" className="admin-a">
                            <span><FaRegHandshake /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Хамтын&nbsp;ажиллагаа</h3>
                                    <h1 className="admin-h1">{clients?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-faq" className="admin-a">
                            <span><FaRegQuestionCircle /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Асуулт&nbsp;хариулт</h3>
                                    <h1 className="admin-h1">{faqs?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>     

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-pricing" className="admin-a">
                            <span><FaHandHoldingDollar /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Үнийн&nbsp;санал</h3>
                                    <h1 className="admin-h1">{pricings?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>   

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-vision" className="admin-a">
                            <span><FaEye /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Алсын&nbsp;хараа</h3>
                                    <h1 className="admin-h1">{visions?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>   

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-social" className="admin-a">
                            <span><IoShareSocial /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">Сошиал&nbsp;холбоос</h3>
                                    <h1 className="admin-h1">{socials?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>    

                    <div className="admin-sales">
                        <a href="/dashboard/admin/create-email" className="admin-a">
                            <span><MdOutlineEmail /></span>
                            <div className="admin-middle">
                                <div className="admin-left">
                                    <h3 className="admin-h3">И-мэйл&nbsp;хаяг</h3>
                                    <h1 className="admin-h1">{emails?.length}</h1>
                                </div>
                                <div className="admin-progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="admin-number">
                                        <p className="admin-p">81%</p>
                                    </div>
                                </div>
                            </div>
                            <small className="admin-small admin-text-muted">Сүүлийн 24 цагт</small>
                        </a>
                    </div>                
                </div>
            </main>

            <div className="admin-right">
                <div className="admin-top">
                    <button id="menu-btn">
                        <span className="material-icons-sharp">menu</span>
                    </button>
                </div>

                <div className="admin-recent-updates">
                    <h2 className="admin-h2">Шинэ Сэтгэгдэлүүд</h2>
                    <div className="admin-updates">
                        { testimonials?.map((item, index) => (
                            <div className="admin-update" key={index}>
                                <div className="admin-profile-photo">
                                    <img className="admin-img" src={item.patientPhoto} alt="Profile" />
                                </div>
                                <div className="admin-message">
                                    <p className="admin-p"><b className="admin-b">{item.patientName} </b>-н сэтгэгдэл: "{item.patientTestimonial.substr(0,40)}...".</p>
                                    <small className="admin-small admin-text-muted">2 Minutes Ago</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default AdminDashboard;
