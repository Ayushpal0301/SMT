import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/AdminMenu'

const Users = () => {
  return (
    <Layout title={"Dashboard - Users"}>
    <div className="container-fluid m-3 p-3">
        <div className="row ">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <div className="card">
                All Users
            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users
