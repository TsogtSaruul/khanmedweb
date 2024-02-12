import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import Register from '../components/Register'


const RegisterPage = () => {

    return (
        <Layout>
            <Breadcrumbs title="Бүртгүүлэх" />
            <Register />
        </Layout>
    )
}

export default RegisterPage