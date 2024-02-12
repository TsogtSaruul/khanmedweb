import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import DoctorDetails from '../components/DoctorDetails'
import Layout from '../components/Layout/Layout'


const DoctorDetailsPage = () => {

  return (
    <Layout>
      <Breadcrumbs title="Эмчийн Булан" />
      <DoctorDetails />
    </Layout>
  )
}

export default DoctorDetailsPage