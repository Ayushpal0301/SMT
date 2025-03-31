import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [phone, setPhone]=useState('')
  const [address, setAddress]=useState('')
  const [question, setQuestion]=useState('')
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault()
  try {
    const resp = await axios.post(`http://localhost:5000/api/v1/auth/register`,{
      name,email,password,phone,address,question
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
    <Layout title="SMT- Register">
      <div className='register mt-4'>
        <div className='register1'>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
  <div className="mb-3 mt-3">
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" id="exampleInputPassword3" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail4" placeholder='Enter Your Phone No.' value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail5" placeholder='Enter Your Address' value={address} onChange={(e)=>setAddress(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail6" placeholder='What is Your Best Friend Name ?' value={question} onChange={(e)=>setQuestion(e.target.value)} required/>
  </div>

  <button type="submit" className="btn btn-primary">Register</button>
</form>
<p className='mt-3'>Already have an account? <Link to="/login">Log in</Link></p>
</div>
        </div> 
    </Layout>
  )
}

export default Register
