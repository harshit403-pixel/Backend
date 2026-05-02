let express = require("express")
const connectDB = require("./config/db")



connectDB()
let app = express()
app.use(express.json())
let users = []
app.post("/get-user",(req,res)=>{
    users.push(req.body) 
    console.log(users)

    return res.status(201).json({
        message:"created"
    })
})


app.get("/users",(req,res)=>{

    return res.status(200).json({
        message:"users fetched",
        users
    })
})

app.patch("/users/update/:index",(req,res)=>{

    let {index} = req.params
    let {age} = req.body
    users[index].age = age
  return res.send("ok")


})

app.delete("/user/delete/:index",(req,res)=>{
    let {index}= req.params
    users.splice(index,1)
    return res.status(200).json({
        message:"delted"
    })
})
module.exports = app