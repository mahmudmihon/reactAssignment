import initDB from '../../helpers/initDB'
import Order from '../../models/Order'

initDB()

export default (req,res)=>{
    Order.find().then(orders => {
        res.status(200).json(orders)
    })
}