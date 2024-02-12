import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import Appointment2 from '../components/Appointment2'
import Layout from '../components/Layout/Layout'


const AppointmentPage = () => {

  return (
    <Layout>
      <Breadcrumbs title="Үзлэгийн Цаг" />
      <Appointment2 />
    </Layout>
  )
}

export default AppointmentPage