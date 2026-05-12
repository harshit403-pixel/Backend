const { default: mongoose } = require("mongoose")

let connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongo db connected")
    } catch (error) {
        console.log("error in connection ", error)
        
    }
}

module.exports = connectDB