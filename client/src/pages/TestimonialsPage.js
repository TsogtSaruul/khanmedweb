import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import OurService from '../components/OurService'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'


const TestimonialsPage = () => {

    return (
        <Layout>
            <Breadcrumbs title="Сэтгэгдэл" />
            <OurService />
            <Testimonials/>
            <Newsletter />
        </Layout>
    )
}

export default TestimonialsPage