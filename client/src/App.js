import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common Routes
import AboutUsPage from "./pages/AboutUsPage";
import AppointmentPage from "./pages/AppointmentPage";
import ContactUsPage from './pages/ContactUsPage';
import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import DoctorPage from './pages/DoctorPage'
import DepartmentsPage from './pages/DepartmentsPage'
import ErrorPage from './pages/ErrorPage'
import FAQPage from "./pages/FAQPage";
import ForgotPassswordPage from "./pages/ForgotPasswordPage";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import MailSuccessPage from './pages/MailSuccessPage'
import OurPricingPage from "./pages/OurPricingPage";
import PortfolioDetailsPage from './pages/PortfolioDetailsPage'
import PortfolioPage from "./pages/PortfolioPage";
import RegisterPage from "./pages/RegisterPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ServicePage from './pages/ServicePage'
import TestimonialsPage from "./pages/TestimonialsPage";

// Admin Routes
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminRoute from './components/Routes/AdminRoute'
import Appointment from "./pages/AppointmentPage";
import CreateAbout from './pages/Admin/CreateAbout';
import CreateAppointment from "./pages/Admin/CreateAppointment";
import CreateCallaction from "./pages/Admin/CreateCallaction";
import CreateClient from "./pages/Admin/CreateClient";
import CreateDepartment from './pages/Admin/CreateDepartment'
import CreateDoctor from './pages/Admin/CreateDoctor'
import CreateFaq from "./pages/Admin/CreateFaq";
import CreateFeature from './pages/Admin/CreateFeature';
import CreateFunfact from './pages/Admin/CreateFunfact';
import CreatePortfolio from './pages/Admin/CreatePortfolio'
import CreatePricing from "./pages/Admin/CreatePricing";
import CreateSchedule from "./pages/Admin/CreateSchedule";
import CreateService from './pages/Admin/CreateService'
import CreateSlider from "./pages/Admin/CreateSlider";
import CreateTestimonial from './pages/Admin/CreateTestimonial'
import CreateUser from "./pages/Admin/CreateUser";
import CreateVision from "./pages/Admin/CreateVision";
import CreateSocial from "./pages/Admin/CreateSocial";
import CreateEmail from "./pages/Admin/CreateEmail";

// User Routes
import BookAppointment from './pages/User/BookAppointment';
import PrivateRoute from './components/Routes/PrivateRoute'
import Profile from './pages/User/Profile'

// Styles
import './styles/CSS/animate.min.css'
import './styles/CSS/bootstrap.min.css'
import './styles/CSS/datepicker.css'
import './styles/CSS/font-awesome.min.css'
import './styles/CSS/magnific-popup.css'
import './styles/CSS/nice-select.css'
import './styles/CSS/normalize.css'
import './styles/CSS/owl-carousel.css'
import './styles/CSS/responsive.css'
import './styles/CSS/slicknav.min.css'
import './styles/CSS/icofont.css'
import './App.css';


function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/doctor-details/:id" element={<DoctorDetailsPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/department" element={<DepartmentsPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/forgot-password" element={<ForgotPassswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mail-success" element={<MailSuccessPage />} />
        <Route path="/our-pricing" element={<OurPricingPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio-details/:id" element={<PortfolioDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-appointment" element={<CreateAppointment />} />
          <Route path="admin/create-doctor" element={<CreateDoctor />} />
          <Route path="admin/create-department" element={<CreateDepartment />} />
          <Route path="admin/create-service" element={<CreateService />} />
          <Route path="admin/create-testimonial" element={<CreateTestimonial />} />
          <Route path="admin/create-portfolio" element={<CreatePortfolio />} />
          <Route path="admin/create-slider" element={<CreateSlider />} />
          <Route path="admin/create-schedule" element={<CreateSchedule />} />
          <Route path="admin/create-feature" element={<CreateFeature />} />
          <Route path="admin/create-funfact" element={<CreateFunfact />} />
          <Route path="admin/create-about" element={<CreateAbout />} />
          <Route path="admin/create-callaction" element={<CreateCallaction />} />
          <Route path="admin/create-client" element={<CreateClient />} />
          <Route path="admin/create-faq" element={<CreateFaq />} />
          <Route path="admin/create-user" element={<CreateUser />} />
          <Route path="admin/create-pricing" element={<CreatePricing />} />
          <Route path="admin/create-vision" element={<CreateVision />} />
          <Route path="admin/create-social" element={<CreateSocial />} />
          <Route path="admin/create-email" element={<CreateEmail />} />
          <Route path="admin/profile" element={<Profile />} />
          <Route path="admin/appointment" element={<Appointment />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/appointment" element={<BookAppointment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
