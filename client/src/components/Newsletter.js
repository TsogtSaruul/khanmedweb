import React, { useState } from 'react'


const Newsletter = () => {
    const [formData, setFormData] = useState('');

    
    return (
        <section className="newsletter section">
            <div className="container">
                <div className="row ">
                    <div className="col-lg-6  col-12">
                        <div className="subscribe-text ">
                            <h6>И-мэйлээр мэдээлэл хүлээж авдаг болох</h6>
                            <p className="">И-мэйл хаягаа илгээснээр та манайхаас зарлагдсан мэдээ мэдээллийг<br /> цаг алдалгүй авдаг болно.</p>
                        </div>
                    </div>
                    <div className="col-lg-6  col-12">
                        <div className="subscribe-form ">
                            <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
                                <input 
                                    name="EMAIL" 
                                    placeholder="И-мэйл хаягаа энд оруулах..." 
                                    className="common-input" 
                                    required="" 
                                    type="email" />
                                <button type='submit' className="btn">Илгээх</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter