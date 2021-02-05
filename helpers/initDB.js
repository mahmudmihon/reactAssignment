import mongoose from 'mongoose'

export default function initDB(){
    if(mongoose.connections[0].readyState){
        console.log("alredy connected")
        return
    }
    mongoose.connect('mongodb+srv://mahmudzahir:dB99J9j8Ret2RenZ@cluster0.gt0tu.mongodb.net/appDB?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error connecting",err)
    })
}