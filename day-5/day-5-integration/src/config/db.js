let mongoose = require("mongoose")

let connectDB = async()=>{
   try {
   await mongoose.connect(process.env.MONGO_URL)
   console.log("mongo db connected")
   
    
   } catch (error) {
    console.log("erro in connection,",error)
   } 
}

module.exports = connectDB