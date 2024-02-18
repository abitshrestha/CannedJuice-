import Order from "../models/Order.js";
import OrderingUser from "../models/OrderingUser.js";

export const createOrder=async(req,res,next)=>{
    const {name,email,address,city,phone}=req.body;
    const {fruitJuices}=req.body;

    try {
        const order=new Order({products:fruitJuices});
        await order.save();
        const orderId=order._id;
        const orderingUser=new OrderingUser({name,email,address,city,phone,orderId});
        await orderingUser.save();
        res.status(201).json({success:true,message:'Order placed successfully!'});
    } catch (error) {
        console.log(error);
    }
}