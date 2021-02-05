import mongoose, { models } from 'mongoose'

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    mediaUrl:{
        type:String,
        required:true
    }
})

export default mongoose.models.product || mongoose.model('product',productsSchema)