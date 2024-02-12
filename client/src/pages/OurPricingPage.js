import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import PricingTable from '../components/PricingTable'
import Newsletter from '../components/Newsletter'
import Layout from '../components/Layout/Layout'


const OurPricingPage = () => {
  return (
    <Layout>
        <Breadcrumbs title="Үнийн Санал" />
        <PricingTable />
        <Newsletter/>
    </Layout>
  )
}

export default OurPricingPage