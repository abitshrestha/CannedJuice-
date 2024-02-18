import {useState,useEffect} from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute(){
    const [ok,setOk]=useState(false);
    const [auth]=useAuth();
    useEffect(()=>{
        const authCheck=async()=>{
            try {
                const res=await axios.get('http://localhost:8085/admin-auth');      
                if(res.data && res.data.ok){
                    setOk(true);
                }else{
                    setOk(false);
                }
            } catch (error) {
                console.log(error);
            }
        }       
        if(auth?.token) authCheck();
    }, [auth?.token]);
    return ok?<Outlet/>:<Spinner path=''/>;
}