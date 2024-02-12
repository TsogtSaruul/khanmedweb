import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import ServiceDetails from '../components/ServiceDetails'


const ServiceDetailsPage = () => {
    
    return (
        <Layout>
            <Breadcrumbs title="Үйлчилгээний Булан" />
            <ServiceDetails />
        </Layout>
    )
}

export default ServiceDetailsPage