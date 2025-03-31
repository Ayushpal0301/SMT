import React from 'react'
import Layout from '../Components/Layout/Layout'
import About from '../Images/About.jpg'

const Aboutpage = () => {
  return (
    <Layout title={"SMT- About us"}>
       <div className='mainAbout row contactus'>
            <div className='col-md-6'>
                <img src={About} alt=""  style={{width:'100%', height:'550px'}}/>
            </div>
            <div className='contactdetail col-md-4'>
                <h1>About us</h1>
                <p className='about mt-4 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae est suscipit mollitia sequi, harum fugiat corrupti assumenda aspernatur commodi optio sed libero laboriosam eius adipisci ut nisi corporis, impedit velit.</p>
                
            </div>
        </div>
    </Layout>
  )
}

export default Aboutpage
