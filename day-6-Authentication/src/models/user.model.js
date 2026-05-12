const { default: mongoose } = require("mongoose");

let userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:[true, "email is required"]
    },
    mobile:{
        type:String,
        minLength:10,
        maxLength:10,
        trim:true,
        required:[true, "mobile is required"]
    },
    password:{
        type:String,
        trim:true,
        required:[true, "password is required"]
    },
},
{
    timestamps:true
})

let UserModel = mongoose.model("users", userSchema)

module.exports = UserModel