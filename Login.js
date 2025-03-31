import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../Context/auth'


const Login = () => {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [auth,setAuth]= useAuth();
  const navigate = useNavigate();
  const location=useLocation(); 

  const handleLogin = async (e) => {
    e.preventDefault()
  try {
    const resp = await axios.post(`http://localhost:5000/api/v1/auth/login`,{
      email,password
    }) ;
    if(resp && resp.data.success){
      toast.success(resp.data && resp.data.message);
      setAuth({
        ...auth,
        user:resp.data.user,
        token:resp.data.token,
      })
      localStorage.setItem('auth', JSON.stringify(resp.data))
      navigate(location.state || "/");
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
      <div className='register'>
        <div className='register1'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>

  <div className="mb-3">
    <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" id="exampleInputPassword3" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<p className='mt-3'> <Link to="/forgot-password">Forgot Password</Link></p>

<p className='mt-3'>Don't have an account? <Link to="/register">Register</Link></p>
</div>
        </div> 
    </Layout>
  )
}

export default Login