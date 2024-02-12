import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import About from '../components/About'
import OurVision from '../components/OurVision'
import Newsletter from '../components/Newsletter'


const AboutUsPage = () => {
    
    return (
        <Layout>
            <Breadcrumbs title="Бидний Тухай" />
            <About />
            <OurVision />
            <Newsletter />
        </Layout>
    )
}

export default AboutUsPage