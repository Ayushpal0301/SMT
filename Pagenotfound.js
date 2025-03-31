import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout title={"go back- page not found"}>
     <div className='pagenotfound text-center'>
        <h1 className='fw-bold '>Oops!</h1>
        <h2 className=''> 404 - PAGE NOT FOUND</h2>
        <p className='text-center'>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link to="/" className='btn btn-primary'>GO TO HOME</Link>
     </div>
    </Layout>
  )
}

export default Pagenotfound
