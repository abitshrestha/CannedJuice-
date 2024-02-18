import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    total:Number,
});

const OrderSchema=new mongoose.Schema({
    products: [ProductSchema], 
},{
    timestamps:true,
});

export default mongoose.model('orders',OrderSchema);