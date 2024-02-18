import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');

    const navigate=useNavigate();

    //form submit
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post(`http://localhost:8085/signup`,({username,email,password,phone,address}));
            if(data.success){
                toast.success(data.message);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            if(error.response && error.response.status===400){
                toast.error(error.response.data.error);
            }
            else if(error.response && error.response.status===409){
                toast.error(error.response.data.error);
            }
        }
    }
    return (
        <Layout>
            <form className="form mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username:
                    </label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="enter your username . . ."
                    />
                </div>
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
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input value={phone} onChange={(e)=>setPhone(e.target.value)}
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="enter your phone . . ."
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address:
                    </label>
                    <input
                        type="text" value={address} onChange={(e)=>setAddress(e.target.value)}
                        className="form-control"
                        id="address"
                        placeholder="enter your address . . ."
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
                    Submit
                </button>
            </form>
        </Layout>
    );
};

export default Register;
