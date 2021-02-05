import Product from '../../../models/Product'
import initDB from '../../../helpers/initDB'

initDB()

export default async (req,res)=>{
    if(req.method === 'GET') {
        const {pid } =  req.query
        const product = await Product.findOne({_id:pid})
        res.status(200).json(product)  
    }
    else if(req.method === 'PUT') {
        const {pid} = req.query
        const {quantity} = req.body

        const product = await Product.findOne({_id: pid})
        product.quantity = (product.quantity - quantity)

        Product.findOneAndUpdate({ _id: product._id }, {$set: {quantity: product.quantity}}).exec();
    }
}

