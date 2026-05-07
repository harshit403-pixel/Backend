require("dotenv").config()

let connectDB = require("./src/config/db")
connectDB()

let app = require("./src/app")

app.listen(3000,()=>{
    console.log("server is running on 3000")
})