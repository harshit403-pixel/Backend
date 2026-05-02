let mongoose = require("mongoose")

let connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/kodex")
        console.log("mongodb connected")
        
    } catch (error) {
        console.log("error in db", error)
    }
}

module.exports = connectDB