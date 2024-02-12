import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import PortfolioDetails from '../components/PortfolioDetails'


const PortfolioDetailsPage = () => {
    return (
        <Layout>
            <Breadcrumbs title="Портфолио Булан" />
            <PortfolioDetails />
        </Layout>
    )
}

export default PortfolioDetailsPage