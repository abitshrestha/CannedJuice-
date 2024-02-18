import mongoose from 'mongoose';

const OrderingUserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
    }
},{
    timestamps:true,
});

export default mongoose.model('orderingusers',OrderingUserSchema);