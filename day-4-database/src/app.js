let express = require("express")
const userModel = require("./models/user.model")


let app = express()
app.use(express.json())
// let user = []

app.post("/create-user", async (req, res) => {

    try {
        let { name, email, mobile, password } = req.body

        if (!name || !password || !mobile || !email) {
            return res.status(400).json({
                message: "give full data"
            })
        }

        let newUser = await userModel.create({
            name,
            email,
            password,
            mobile
        })
        return res.status(201).json({
            message: "user created successfully",
            user: newUser
        })

    } catch (error) {
        console.log("server error", error)
        return res.status(500).json({
            message: "server error"
        })


    }

})


app.get("/users/:id", async (req, res) => {
    let { id } = req.params
    let users = await userModel.findById(id)

    return res.status(200).json({
        message: "user fetched",
        users
    })
})
app.get("/users", async (req, res) => {
    let users = await userModel.findOne({
        name: "divyanka"
    })

    return res.status(200).json({
        message: "user fetched",
        users
    })
})


app.put("/update-user/:id", async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body

        if (!name || !password || !mobile || !email) {
            return res.status(400).json({
                message: "give full data"
            })
        }

        let { id } = req.params
        let updateUser = await userModel.findByIdAndUpdate(id, {
            name, email, mobile, password
        },{
            new:true
        })

        return res.status(200).json({
            message: "updates User",
            updateUser
        })
    } catch (error) {
        console.log("error of update server", error)
        return res.status(500).json({
            message: "server error"
        })

    }
})


app.delete("/delete-user/:id",async(req,res)=>{
    try {
        
        let {id} = req.params
        await userModel.findByIdAndDelete(id)

        return res.status(200).json({
            message:"user deletd"
        })

    } catch (error) {
           console.log("error of update server", error)
        return res.status(500).json({
            message: "server error"
        })
        
    }
})



module.exports = app