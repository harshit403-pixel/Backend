let express = require("express")
const productModel = require("./models/product.model")
let cors = require("cors")

let app = express()

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())

app.post("/create-product",async(req,res)=>{

 try {
       let {name,description,amount,currency,category,stock} = req.body
    if(!name || !stock || !amount){
        return res.status(400).json({
            message:"all field are required"
        })
    }
    let newProduct = await productModel.create({
        productName:name,
        description,
        category,
        price:{
            amount,
            currency
        },
        stock
    })
    return res.status(201).json({
        message:"product created",
        product:newProduct
    })
 } catch (error) {
    return res.status(500).json({
        message:"INternal Server Error"
    })
 }
})


module.exports = app