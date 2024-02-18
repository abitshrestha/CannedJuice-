import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';


export const requiresSignIn=async(req,res,next)=>{
    try {
        //verifying from header response token
        const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
}

export const isAdmin=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);
        if(user?.role!==1){
            return res.status(401).json({
                success:false,
                message:'Unauthorized access',
            });
        }else{
            next();
        }
    } catch (error){
        next(error);
    }
}