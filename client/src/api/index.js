import axios from 'axios';


// const API = axios.create({ baseURL: 'https://khanmed-clinic-server.vercel.app' });
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')) {
        req.headers.Authorization = `${JSON.parse(localStorage.getItem('auth')).token}`
    }
    return req;
});

// Authorization
export const getAdminAuth = () =>                       API.get(`/auth/admin-auth`);
export const getUserAuth = () =>                        API.get(`/auth/user-auth`);
export const register = (formData) =>                   API.post(`/auth/register`, formData);
export const login = (formData) =>                      API.post(`/auth/login`, formData);
export const forgotPassword = (formData) =>             API.post(`/auth/forgot-password`, formData);
export const updateProfile = (formData) =>              API.patch(`/auth/profile`, formData);

// Users
export const getAllUsers = () =>                        API.get(`/user/get-all-users`);
export const getUser = (id) =>                          API.get(`/user/get-user/${id}`);
export const createUser = (formData) =>                 API.post(`/user/create-user`, formData);
export const updateUser = (id, formData) =>             API.patch(`/user/update-user/${id}`, formData);
export const deleteUser = (id) =>                       API.delete(`/user/delete-user/${id}`)

// Doctors
export const getAllDoctors = () =>                      API.get(`/doctor/get-all-doctors`);
export const getDoctor = (id) =>                        API.get(`/doctor/get-doctor/${id}`);
export const createDoctor = (formData) =>               API.post(`/doctor/create-doctor`, formData);
export const updateDoctor = (id, {formData}) =>         API.patch(`/doctor/update-doctor/${id}`, {formData});
export const deleteDoctor = (id) =>                     API.delete(`/doctor/delete-doctor/${id}`)

// Services
export const getAllServices = () =>                     API.get(`/service/get-all-services`);
export const getService = (id) =>                       API.get(`/service/get-service/${id}`);
export const createService = (formData) =>              API.post(`/service/create-service`, formData);
export const updateService = (id, {formData}) =>        API.patch(`/service/update-service/${id}`, {formData});
export const deleteService = (id) =>                    API.delete(`/service/delete-service/${id}`)

// Testimonials
export const getAllTestimonials = () =>                 API.get(`/testimonial/get-all-testimonials`);
export const getTestimonial = (id) =>                   API.get(`/testimonial/get-testimonial/${id}`);
export const createTestimonial = (formData) =>          API.post(`/testimonial/create-testimonial`, formData);
export const updateTestimonial = (id, {formData}) =>    API.patch(`/testimonial/update-testimonial/${id}`, {formData});
export const deleteTestimonial = (id) =>                API.delete(`/testimonial/delete-testimonial/${id}`)

// Portfolios
export const getAllPortfolios = () =>                   API.get(`/portfolio/get-all-portfolios`);
export const getPortfolio = (id) =>                     API.get(`/portfolio/get-portfolio/${id}`);
export const createPortfolio = (formData) =>            API.post(`/portfolio/create-portfolio`, formData);
export const updatePortfolio = (id, {formData}) =>      API.patch(`/portfolio/update-portfolio/${id}`, {formData});
export const deletePortfolio = (id) =>                  API.delete(`/portfolio/delete-portfolio/${id}`)

// Departments
export const getAllDepartments = () =>                  API.get(`/department/get-all-departments`);
export const getDepartment = (id) =>                    API.get(`/department/get-department/${id}`);
export const createDepartment = (formData) =>           API.post(`/department/create-department`, formData);
export const updateDepartment = (id, formData) =>       API.patch(`/department/update-department/${id}`, formData);
export const deleteDepartment = (id) =>                 API.delete(`/department/delete-department/${id}`)

// Appointments
export const getAllAppointments = () =>                 API.get(`/appointment/get-all-appointments`);
export const getSomeAppointments = (page) =>            API.get(`/appointment/get-some-appointments?page=${page}`);
export const getAppointment = (id) =>                   API.get(`/appointment/get-appointment/${id}`);
export const createAppointment = (formData) =>          API.post(`/appointment/create-appointment`, formData);
export const updateAppointment = (id, {formData}) =>    API.patch(`/appointment/update-appointment/${id}`, {formData});
export const deleteAppointment = (id) =>                API.delete(`/appointment/delete-appointment/${id}`)

// Sliders
export const getAllSliders = () =>                      API.get(`/slider/get-all-sliders`);
export const getSlider = (id) =>                        API.get(`/slider/get-slider/${id}`);
export const createSlider = (formData) =>               API.post(`/slider/create-slider`, formData);
export const updateSlider = (id, formData) =>           API.patch(`/slider/update-slider/${id}`, formData);
export const deleteSlider = (id) =>                     API.delete(`/slider/delete-slider/${id}`)

// Schedules
export const getAllSchedules = () =>                    API.get(`/schedule/get-all-schedules`);
export const getSchedule = (id) =>                      API.get(`/schedule/get-schedule/${id}`);
export const createSchedule = (formData) =>             API.post(`/schedule/create-schedule`, formData);
export const updateSchedule = (id, formData) =>         API.patch(`/schedule/update-schedule/${id}`, formData);
export const deleteSchedule = (id) =>                   API.delete(`/schedule/delete-schedule/${id}`)

// Features
export const getAllFeatures = () =>                     API.get(`/feature/get-all-features`);
export const getFeature = (id) =>                       API.get(`/feature/get-feature/${id}`);
export const createFeature = (formData) =>              API.post(`/feature/create-feature`, formData);
export const updateFeature = (id, formData) =>          API.patch(`/feature/update-feature/${id}`, formData);
export const deleteFeature = (id) =>                    API.delete(`/feature/delete-feature/${id}`)

// FunFact
export const getAllFunfacts = () =>                     API.get(`/funfact/get-all-funfacts`);
export const getFunfact = (id) =>                       API.get(`/funfact/get-funfact/${id}`);
export const createFunfact = (formData) =>              API.post(`/funfact/create-funfact`, formData);
export const updateFunfact = (id, formData) =>          API.patch(`/funfact/update-funfact/${id}`, formData);
export const deleteFunfact = (id) =>                    API.delete(`/funfact/delete-funfact/${id}`)

// About
export const getAllAbouts = () =>                       API.get(`/about/get-all-abouts`);
export const getAbout = (id) =>                         API.get(`/about/get-about/${id}`);
export const createAbout = (formData) =>                API.post(`/about/create-about`, formData);
export const updateAbout = (id, formData) =>            API.patch(`/about/update-about/${id}`, formData);
export const deleteAbout = (id) =>                      API.delete(`/about/delete-about/${id}`)

// Callaction
export const getAllCallactions = () =>                  API.get(`/callaction/get-all-callactions`);
export const getCallaction = (id) =>                    API.get(`/callaction/get-callaction/${id}`);
export const createCallaction = (formData) =>           API.post(`/callaction/create-callaction`, formData);
export const updateCallaction = (id, formData) =>       API.patch(`/callaction/update-callaction/${id}`, formData);
export const deleteCallaction = (id) =>                 API.delete(`/callaction/delete-callaction/${id}`)

// Client
export const getAllClients = () =>                      API.get(`/client/get-all-clients`);
export const getClient = (id) =>                        API.get(`/client/get-client/${id}`);
export const createClient = (formData) =>               API.post(`/client/create-client`, formData);
export const updateClient = (id, formData) =>           API.patch(`/client/update-client/${id}`, formData);
export const deleteClient = (id) =>                     API.delete(`/client/delete-client/${id}`)

// FAQ  
export const getAllFaqs = () =>                         API.get(`/faq/get-all-faqs`);
export const getFaq = (id) =>                           API.get(`/faq/get-faq/${id}`);
export const createFaq = (formData) =>                  API.post(`/faq/create-faq`, formData);
export const updateFaq = (id, formData) =>              API.patch(`/faq/update-faq/${id}`, formData);
export const deleteFaq = (id) =>                        API.delete(`/faq/delete-faq/${id}`)

// Pricing
export const getAllPricings = () =>                     API.get(`/pricing/get-all-pricings`);
export const getPricing = (id) =>                       API.get(`/pricing/get-pricing/${id}`);
export const createPricing = (formData) =>              API.post(`/pricing/create-pricing`, formData);
export const updatePricing = (id, formData) =>          API.patch(`/pricing/update-pricing/${id}`, formData);
export const deletePricing = (id) =>                    API.delete(`/pricing/delete-pricing/${id}`)

// Vision
export const getAllVisions = () =>                      API.get(`/vision/get-all-visions`);
export const getVision = (id) =>                        API.get(`/vision/get-vision/${id}`);
export const createVision = (formData) =>               API.post(`/vision/create-vision`, formData);
export const updateVision = (id, formData) =>           API.patch(`/vision/update-vision/${id}`, formData);
export const deleteVision = (id) =>                     API.delete(`/vision/delete-vision/${id}`)

// Social
export const getAllSocials = () =>                      API.get(`/social/get-all-socials`);
export const getSocial = (id) =>                        API.get(`/social/get-social/${id}`);
export const createSocial = (formData) =>               API.post(`/social/create-social`, formData);
export const updateSocial = (id, formData) =>           API.patch(`/social/update-social/${id}`, formData);
export const deleteSocial = (id) =>                     API.delete(`/social/delete-social/${id}`)


// Social
export const getAllEmails = () =>                      API.get(`/email/get-all-emails`);
export const getEmail = (id) =>                        API.get(`/email/get-email/${id}`);
export const createEmail = (formData) =>               API.post(`/email/create-email`, formData);
export const updateEmail = (id, formData) =>           API.patch(`/email/update-email/${id}`, formData);
export const deleteEmail = (id) =>                     API.delete(`/email/delete-email/${id}`)