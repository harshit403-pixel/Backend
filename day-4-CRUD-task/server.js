let app = require("./src/app")
let connectDB = require("./src/config/db")

connectDB()

app.listen(3000, () => {
    console.log("app is running on 3000")
})
