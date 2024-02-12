import React from 'react'


const TopBar = () => {

    return (
        <div className="topbar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-12">
                        <ul className="top-link">
                            <li><a href="/about-us">Бидний&nbsp;тухай</a></li>
                            <li><a href="/doctor">Эмч&nbsp;нар</a></li>
                            <li><a href="/contact-us">Холбоо&nbsp;барих</a></li>
                            <li><a href="/faq">Асуулт&nbsp;хариулт</a></li>
                            <li><a href="/pricing">Үнийн&nbsp;санал</a></li>
                            <li><a href="/portfolio">Портфолио</a></li>
                            <li><a href="/testimonials">Сэтгэгдэлүүд</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                        <ul className="top-contact">
                            <li><i className="fa fa-phone"></i>+976 9966 1904</li>
                            <li><i className="fa fa-envelope"></i><a href="mailto:khaan.inquiry@gmail.com">khaan.inquiry@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar