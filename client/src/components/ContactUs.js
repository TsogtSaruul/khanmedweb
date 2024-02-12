import React from 'react'


const ContactUs = () => {

    return (
        <section className="contact-us section">
            <div className="container">
                <div className="inner">
                    <div className="row"> 
                        <div className="col-lg-6">
                            <div className="contact-us-left">
                                <div id="myMap">
                                    <div style={{width: "100%", height: "100%"  }}>
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1890.5845079982173!2d106.8115898793335!3d47.923030551135824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96ed3b1bb9dcf7%3A0x3af030ecc96c3f71!2z0JoybCBiaW8!5e0!3m2!1smn!2smn!4v1701081190386!5m2!1smn!2smn" 
                                            width="100%" 
                                            height="100%" 
                                            style={{ border: "0", width: "100%", height: "100%" }}
                                            allowfullscreen="true" 
                                            loading="lazy" 
                                            referrerpolicy="no-referrer-when-downgrade">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-us-form">
                                <h2>Холбоо Барих</h2>
                                <p>Бидэнтэй холбоо барихыг хүсвэл доорх маягтыг бөглөн бидэнрүү илгээнэ үү.</p>
                                <form className="form" method="post" action="mail/mail.php">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input type="text" name="name" placeholder="Нэр" required="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input type="email" name="email" placeholder="И-мэйл" required="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input type="text" name="phone" placeholder="Утас" required="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input type="text" name="subject" placeholder="Гарчиг" required="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <textarea name="message" placeholder="Мессеж" required=""></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group login-btn">
                                                <button className="btn" type="submit">Илгээх</button>
                                            </div>
                                            <div className="checkbox">
                                                <label className="checkbox-inline" for="2">
                                                <input name="news" id="2" type="checkbox" /> Та и-мэйл хаягаараа манайхаас нийтлэх мэдээ мэдээллийг авахыг хүсч байна уу? Тийм бол энд дарна уу.</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-info">
                    <div className="row">
                        <div className="col-lg-4 col-12 ">
                            <div className="single-info">
                                <i className="icofont icofont-ui-call"></i>
                                <div className="content">
                                    <h3>+(976) 9966 1904</h3>
                                    <p>khaan.inquiry@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12 ">
                            <div className="single-info">
                                <i className="icofont-google-map"></i>
                                <div className="content">
                                    <h3>Дүүрэг</h3>
                                    <p>Сонгинохайрхан</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12 ">
                            <div className="single-info">
                                <i className="icofont icofont-wall-clock"></i>
                                <div className="content">
                                    <h3>Даваа - Баасан:</h3>
                                    <p>8:00 - 17:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs