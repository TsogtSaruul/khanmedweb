import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import FAQ from '../components/FAQ'


const FAQPage = () => {

    return (
        <Layout>
            <Breadcrumbs title="Асуулт Хариулт" />
            <FAQ />
        </Layout>
    )
}

export default FAQPage