import React from 'react'
import Layout from '../components/Layout/Layout'
import Slider from '../components/Slider'
import Schedule from '../components/Schedule'
import Features from '../components/Features'
import FunFacts from '../components/FunFacts'
import WhyChoose from '../components/WhyChoose'
import CallAction from '../components/CallAction'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import PricingTable from '../components/PricingTable'
// import Blog from '../components/Blog'
import Clients from '../components/Clients'
// import Appointment from '../components/Appointment'
import Newsletter from '../components/Newsletter'
import Departments from '../components/Departments'
import OurTeam from '../components/OurTeam'


const HomePage = () => {

  
  return (
    <Layout>
      <Slider />
      <Schedule />
      <Features />
      <FunFacts />
      <WhyChoose />
      <CallAction />
      <Portfolio/>
      <Testimonials />
      <Services />
      <OurTeam />
      <Departments />
      <Clients />
      <PricingTable />
      {/* <Blog /> */}
      {/* <Appointment /> */}
      <Newsletter />
    </Layout>
  )
}

export default HomePage