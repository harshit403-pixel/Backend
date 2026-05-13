let express = require("express")
let jwt = require("jsonwebtoken")
let UserModel = require("../models/user.model")

let router = express.Router()

//ab is api ke pass token nahi hai firbhi yeh access karpaeg aandr aapaega posts mai evene na login hai na sign in hai toh apan ab introduce kreneg middleware iske bbeech mai for echeking ek gateman ki tarah kaam karega ki kya token hai ya nahi hai agar token hai toh aapko access de do agar token nahi hai toh aapko access mat do


router.post("/",
    
    // this is the middleware function which will run before the actual controller functhis will check for the token and if the token is valid then it will allow the repass through to the controller function otherwise it will return an error response

    //iske andar 3 cheeze hoti hai req, res, next and agar apan yhi return res karde toh yeh middleware ke andar hi atak jayega aur aage nahi jayega toh apan next function ka use karenge jisse ki agar token valid hua toh yeh next function call hoga aur aage controller function execute hoga
    async (req, res, next)=>{ 


        // ab yaha check karenge token kyu cookies kaha hai server mai and usi mai token hai toh usko access karenge
        // 2nd step check karenge ki token valid hai ya nahi hai toh uske liye jwt ka use karenge decode karenge 
        // 3rd step token vailed hai toh kiska hai usme jo user id aarhi hai kiski hai woh find krlo user find krlo database mai aur usko req ke andar store krlo taki aage controller function mai use kar sako
        //4th step next function call krdo taki aage controller function execute ho jaye

        let token = req.cookies.token   
        if(!token){
            return res.status(401).json({
                message:"unauthorized"
            })
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        let user = await UserModel.findById(decoded.id)


    console.log("i am inside posts")
    next()
},


(req,res)=>{
    return res.status(200).json({
        message:"i am inside instagram"
    })
})

module.exports = router