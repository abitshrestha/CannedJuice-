import express from 'express';
import { signupController,loginController } from '../controllers/authController.js';
import { isAdmin, requiresSignIn } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/signup',signupController);
router.post('/login',loginController);

//private user route
router.get('/user-auth',requiresSignIn,(req,res)=>{
    res.status(200).json({ok:true});
});

//admin routes
router.get('/admin-auth',requiresSignIn,isAdmin,(req,res)=>{
    res.status(200).json({ok:true});
})
export default router;
