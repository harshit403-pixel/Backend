const { default: mongoose } = require("mongoose")
let UserModel = require("../models/user.model")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")

let registerController = async(req, res) =>{
    try {

        let {name, mobile,password, email} = req.body

        if(!mobile || !email || !password){
            return res.status(400).json({
                message:"All Fields Required"
            })

        }

        let existingUser = await UserModel.findOne({email})

        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        let newUser = UserModel.create({
            name,
            mobile,
            email,
            password:hashedPassword
        })

        let token = jwt.sign({id:newUser._id},process.env.JWT_SECRET , {expiresIn:"1h"} )

        console.log(token)
        res.cookie("token",token)

        return res.status(201).json({
            message:"user craeted succecfully",
            user:newUser
        })


        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
        
    }
}


let loginController = async(req, res)=>{
    try {
        //sabse pehle data lia username and pass
        let{email, password} = req.body
        
        // null check alwys 
        if(!email || !password){
            return res.status(400).json({
                message:"email and password are required"
            })
        }

        // check kia ki woh user hai ya nahi exist compare on the basisi of email key humne batay db ko ki email ke basis pr comapre karo and agar milgya toh is existed mia store kardo
        let isExisted = await UserModel.findOne({email})

        // nahi hai toh not found nad register kro pehel
        if(!isExisted){
            return res.status(404).json({
                message:"user not found"
            })
        }
        
        // aagar hai toh fir bcrypt se password jo aya hai and jo password already exited user ka hai unko compare karwao
        let comparePass = await bcrypt.compare(password, isExisted.password)
        
        // agar compare false hua toh worng pass
        if(!comparePass){
            return res.status(401).json({
                message:"invalid credentials"
            })
        }
        
        // agar sahi hua toh ek token generate karo and user ko cookies mai bhejdo
        let token = jwt.sign({id:isExisted._id}, process.env.JWT_SECRET, {expiresIn:"1h"})
        
        res.cookie("token", token)

        return res.status(200).json({
            message:"login successfull",
            user:isExisted
        })


        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

module.exports ={ registerController, loginController}