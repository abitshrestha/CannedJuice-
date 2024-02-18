import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();

    //form submit
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post(`http://localhost:8085/login`,({email,password}));
            if(data.success){
                toast.success(data.message);
                setAuth({
                    ...auth,user:data.user,token:data.token,
                });
                localStorage.setItem('auth',JSON.stringify(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.status){
                toast.error(error.response.data.error);
            }
        }
    }
    return (
        <Layout>
            <form className="form mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="enter your email . . ."
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        className="form-control"
                        id="password"
                        placeholder="enter your password . . ."
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </Layout>
    );
};

export default Login;
