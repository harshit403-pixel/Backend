require("dotenv").config()
let app = require("./src/app")
let connectDB = require("./src/config/database")

connectDB()



let port = process.env.PORT || 4000



app.listen(port,()=>{
    console.log(`port running on ${port}`)
})

