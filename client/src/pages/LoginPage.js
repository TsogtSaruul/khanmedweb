import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import Login from '../components/Login'
import Layout from '../components/Layout/Layout'


const LoginPage = () => {
    return (
        <Layout>
            <Breadcrumbs title="Нэвтрэх" />
            <Login />
        </Layout>
    )
}

export default LoginPage