import initDB from '../../helpers/initDB'
import Order from '../../models/Order'

initDB()

export default (req,res)=>{
    
    const { name, phone, address, products, orderDate } =  req.body

    const order = new Order({
        name,
        phone,
        address,
        products,
        orderDate
    }).save()
    res.status(201).json(order)
}