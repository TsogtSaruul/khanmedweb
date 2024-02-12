import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import Team from '../components/Team'
import Newsletter from '../components/Newsletter'


const DoctorPage = () => {
    
    return (
        <Layout>
            <Breadcrumbs title="Эмч нарын баг" />
            <Team />
            <Newsletter />
        </Layout>
    )
}

export default DoctorPage