import React from 'react'
import Layout from '../Components/Layout/Layout'
import Contact from '../Images/Contact.jpg'
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Contactpage = () => {
  return (
    <Layout title={"SMT- Contact us"}>
        <div className='maincontact row contactus'>
            <div className='col-md-6'>
                <img src={Contact} alt=""  style={{width:'100%', height:'500px'}}/>
            </div>
            <div className='contactdetail col-md-4'>
                <h1>Contact us</h1>
                <p className='mt-4'>Any query and info about product feel free to call anytime we 24 x 7
                    available
                </p>
                <p className='contact'>
                <BiMailSend /> : smt@gmail.com
                </p>
                <p className='contact'>
                <BiPhoneCall /> : +91 99999-99999
                </p>
            </div>
        </div>
    </Layout>
  )
}

export default Contactpage
