import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import ContactUs from '../components/ContactUs'
import Layout from '../components/Layout/Layout'


const ContactPage = () => {

    return (
        <Layout>
            <Breadcrumbs title="Холбоо Барих" />
            <ContactUs />
        </Layout>
    )
}

export default ContactPage