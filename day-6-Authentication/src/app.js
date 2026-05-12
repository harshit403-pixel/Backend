let express = require("express")
let authRoutes = require("./routes/auth.routes")
let cookieParser = require("cookie-parser")
let app = express()

app.use(cookieParser())
app.use(express.json()) // to parse the incoming request body as JSON

app.use("/api/auth",authRoutes)

module.exports = app