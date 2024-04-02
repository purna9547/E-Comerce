//create a mw t check the body is proper and correct
const jwt= require("jsonwebtoken")
const secret_tok=require("../configuration/auth.config")
const user_model=require("../Models/user.model")
const verifySignUpBody= async(req,res,next)=>{
    try {
        //check for name
        if(!req.body.name){
            return res.status(400).send({
                messege:"Name is not provided"
            })
        }
        //check for Email
        if(!req.body.email){
            return res.status(400).send({
                messege:"Email is not provided"
            })
        }
        //check for UserId
        if(!req.body.UserId)
        {
            return res.status(400).send({
                messege:"Not provided user id"
            })
        }
        //check for same userId
        const user= await user_model.findOne({UserId:req.body.UserId})
        if(user){
            return res.status(400).send({
                messege:"Same user Id found"
            })
        }
        next()
    } catch (err) {
        console.log("Error while validation")
        res.status(500).send({
            messege:"Error while validation"
        })
        
    }
}
const verifySigninBody=(req,res,next)=>{
    if(!req.body.UserId){
        return res.status(400).send({
            messege:"UserId is not Provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            messege:"Password is not provide"
        })
    }
    next()
}
const verifyToken=(req,res,next)=>{
    //Token is present in the header
    const token=req.headers['x-access-token']
    if(!token){
        return res.status(400).send({
            messege:"No token found:Unauthorize"
        })
    }
    //Token is valid or not
    jwt.verify(token,secret_tok.secret,async(err,decoded)=>{
        if(err){
            return res.status(400).send({
                message:"Unauthorize"
            })
        }

        const user= await user_model.findOne({UserId:decoded.id})
        if(!user){
            return res.status(400).send({
                messege:"This is an unauthorized user"
            })
        }
        req.user=user
        next()
    })
    //go to next step
    
}
const isAdmin=(req,res,next)=>{
    const user =req.user
    if(user && user.usertype=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            messege:"Only Admin can login it"
        })
    }
}
module.exports={
    verifySignUpBody:verifySignUpBody,
    verifySigninBody:verifySigninBody,
    verifyToken:verifyToken,
    isAdmin:isAdmin
}
