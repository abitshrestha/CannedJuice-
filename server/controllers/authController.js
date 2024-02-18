import {User} from '../models/User.js'
import {hashPassword,compareHash} from '../utils/authUtils.js';
import jwt from 'jsonwebtoken';
const signupController=async(req,res,next)=>{
    const {username,email,password,address,phone}=req.body;

    //validation
    if(!username) return res.status(400).json({error:'Username is required!'});
    if(!email) return res.status(400).json({error:'Email is required!'});
    if(!password) return res.status(400).json({error:'Password is required!'});
    if(!address) return res.status(400).json({error:'Address is required!'});
    if(!phone) return res.status(400).json({error:'Phone is required!'});

    try {
        //check email exists already
        const checkEmail=await User.findOne({email});
        if(checkEmail){
            return res.status(409).json({error:'Email is already taken!'});
        }
        const hashedPassword=await hashPassword(password);
        const user=new User({username,email,password:hashedPassword,address,phone});
        await user.save();
        res.status(200).json({
            success:true,
            messasge:'Signup Complete!',
            user,
        });
    } catch (error) {
        next(error);
    }
}

const loginController=async(req,res,next)=>{
    const {email,password}=req.body;

    //validation
    if(!email || !password) return res.status(400).json({error:'Either email or password is invalid!'});

    try {
        //check email
        const checkEmail=await User.findOne({email});
        if(!checkEmail){
            return res.status(404).json({error:'Email not found!'});
        }
        //compare passowrds
        const valid=await compareHash(password,checkEmail.password);
        if(!valid){
            return res.status(401).json({error:'Password is not valid!'});
        }
        const token=jwt.sign({_id:checkEmail._id},process.env.JWT_SECRET,{
            expiresIn:'1hr',
        });
        res.status(200).json({success:true,message:'Login successful!',user:{
            username:checkEmail.username,
            email:checkEmail.email,
            phone:checkEmail.phone,
            address:checkEmail.address,
            role:checkEmail.role,
        },token});
    } catch (error) {
        next(error);
    }
}

export {signupController,loginController};