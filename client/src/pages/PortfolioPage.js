import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import Portfolio from '../components/Portfolio'
import Newsletter from '../components/Newsletter'


const TestimonialsPage = () => {

    return (
        <Layout>
            <Breadcrumbs title="Портфолио" />
            <Portfolio />
            <Newsletter />
        </Layout>
    )
}

export default TestimonialsPage