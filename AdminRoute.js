import {useState, useEffect} from 'react';
import { useAuth } from '../../../Context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

export default function AdminRoute(){
    const [ok , setOk]=useState(false)
    const [auth, setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async ()=>{
            const resp = await axios.get('http://localhost:5000/api/v1/auth/admin-auth')
            if(resp.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token])
    return ok ? <Outlet/> : <Spinner path="" />;
}