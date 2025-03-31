import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const[email,setEmail]=useState("")
    const[newPassword,setNewPassword]=useState("")
    const[question,setQuestion]=useState("")
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault()
    try {
      const resp = await axios.post(`http://localhost:5000/api/v1/auth/forgot-password`,{
        email,newPassword,question
      }) ;
      if(resp && resp.data.success){
        toast.success(resp.data && resp.data.message);
        navigate("/login");
      }else{
        toast.error(resp.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
      
    }
  
    }
  return (
    <Layout title="SMT- Forgot-password">
    <div className='register'>
      <div className='register1'>
      <h2>Reset Password</h2>
      <form onSubmit={handleLogin}>

<div className="mb-3">
  <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
</div>
<div className="mb-3">
  <input type="password" className="form-control" id="exampleInputPassword3" placeholder='Enter Your Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
</div>
<div className="mb-3">
  <input type="text" className="form-control" id="exampleInputPassword3" placeholder='What is Your Best Friend Name ?' value={question} onChange={(e)=>setQuestion(e.target.value)} required/>
</div>


<button type="submit" className="btn btn-primary">Reset</button>
</form>
</div>
      </div> 
  </Layout>
  )
}

export default ForgotPassword
