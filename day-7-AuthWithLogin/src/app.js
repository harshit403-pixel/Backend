let express = require("express")
let authRoutes = require("./routes/auth.route")
let postRoutes = require("./routes/post.route")
let cookieParser = require("cookie-parser")
let connectDB = require("./config/database")
let app = express()

connectDB()
app.use(cookieParser())
app.use(express.json()) // to parse the incoming request body as JSON

app.use("/api/auth",authRoutes)

app.use("/api/posts", postRoutes)

module.exports = app  