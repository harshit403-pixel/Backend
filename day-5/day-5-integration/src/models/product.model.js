let mongoose = require("mongoose")


let productSchema = new mongoose.Schema({
   productName: {
    type:String,
    required : true
   },
   description: {
    type:String,
    default:"description"
   },
   category: {
    type: String,
    enum:["MEN","WOMEN","KIDS"],
    default:"MEN"
   },
   price:{
    amount:{
        type:Number,
    required:true
    },
    currency:{
        type:String,
        enum:["INR","USD"],
        default:"INR"
    }
   },
   stock:{
    type:Number,
    required:true
   }
},{
    timestamps:true
})

let productModel = mongoose.model("products", productSchema)

module.exports = productModel