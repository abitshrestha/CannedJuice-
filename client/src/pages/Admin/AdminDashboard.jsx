import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const AdminDashboard = () => {
    return (
        <div className='dashboard'>
            <Layout>
                <div className="container-fluid">
                    <div className="row">
                        <AdminMenu/>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 adminManage">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h2>Admin Dashboard</h2>
                            </div>
                        </main>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AdminDashboard