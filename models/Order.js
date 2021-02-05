import mongoose from 'mongoose'

const orderSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    products:{
        type:Array,
        required:true
   },
   orderDate:{
       type:String,
       required:true
   }
})


export default mongoose.models.Order || mongoose.model("Order",orderSchema)