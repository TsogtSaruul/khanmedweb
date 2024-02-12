import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import Services from '../components/Services'
import Newsletter from '../components/Newsletter'


const ServicePage = () => {
    return (
        <Layout>
            <Breadcrumbs title="Үйлчилгээ" />
            <Services />
            <Newsletter />
        </Layout>
    )
}

export default ServicePage