import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import ForgotPassword from '../components/ForgotPassword'
import Layout from '../components/Layout/Layout'


const ForgotPasswordPage = () => {
    return (
        <Layout>
            <Breadcrumbs title="Нууц Үгээ Солих" />
            <ForgotPassword />
        </Layout>
    )
}

export default ForgotPasswordPage