const UserModel = require("../models/user.model")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")
let registerController = async(req,res)=>{
    try {

        
        
        // data lia sabse pehle 1st step authentication
        let {name,email,mobile,password} = req.body

        
        //data validate kia 2`nd step authentication
        if(!mobile || !email || !password){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
            
        }
        
        //data validate kia 2`nd step authentication check kia ki email pehle se registered to nahi hai
        let existingUser = await UserModel.findOne({email})
            if(existingUser){
                return res.status(409).json({
                    success:false,
                    message:"user already registered with this email"
                })
            }



            //password hashing
            let hashPass = await bcrypt.hash(password, 10)    

            //user ko register kar diya 
            let newUser = await UserModel.create({
                name,
                email,
                mobile,
                password : hashPass
            })
            // ab data mai user banado and authorization kar do 3rd step authentication {token banado and user ko token do}

            let token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {
                expiresIn:"1h"
            })


            console.log("token :" ,token)
            res.cookie("token", token)

            return res.status(201).json({
                message:"user created successfully",
                user:newUser
            })
           

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in register controller",
            error:error.message
        })
        
    }
}

module.exports = {registerController}