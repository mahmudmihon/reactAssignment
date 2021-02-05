import Order from '../../../models/Order'
import initDB from '../../../helpers/initDB'

initDB()

export default async (req,res)=>{
    const {pid } =  req.query
    const product = await Order.findOne({_id:pid})
    res.status(200).json(product)  
}