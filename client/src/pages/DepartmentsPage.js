import React from 'react'
import Layout from '../components/Layout/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import Departments from '../components/Departments'
import Newsletter from '../components/Newsletter'


const DepartmentsPage = () => {

    return (
        <Layout>
            <Breadcrumbs title="Тасаг Нэгж" />
            <Departments />
            <Newsletter />
        </Layout>
    )
}

export default DepartmentsPage