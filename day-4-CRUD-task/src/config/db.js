let mongoose = require("mongoose")

let connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://harshit:harshit1234@cluster0.kkqnrel.mongodb.net/kodex-task-products")
        console.log("connected")
    } catch (error) {
        console.log("server error", error)
    }
}

module.exports = connectDB
