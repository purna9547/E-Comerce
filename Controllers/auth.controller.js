const bcrypt=require("bcryptjs")
const user_model=require("../Models/user.model")
const jwt=require("jsonwebtoken")
const sec=require("../configuration/auth.config")
exports.signup=async(req,res)=>{
    // logic to create the User
    // 1.read the request body
        const request_body=req.body // here request_body is  a js object

    // 2.Insert the Data in the user collection in the mongo db
        const userobj={
            name:request_body.name,
            UserId: request_body.UserId,
            password:bcrypt.hashSync(request_body.password,8),
            EmailId:request_body.email,
            usertype:request_body.userType
        }
        try{
            const user_created= await user_model.create(userobj)

            // return this user
            const res_obj={
                name:user_created.name,
                UserId:user_created.UserId,
                EmailId:user_created.EmailId,
                usertype:user_created.usertype,
                createdAt:user_created.createdAt,
                updatedAt:user_created.updatedAt
            }
            res.status(201).send(res_obj)  //201 means user created successfully

        }catch(err){
            console.log("Error while create user ", err)
            res.status(500).send({
                messege:"some error while registering the user"
            })//505 means internal error hapens
        }
    // 3.Return the response back to the user
}

exports.signin=async(req,res)=>{
    //Check user Id is present in Database or not
    const user=await user_model.findOne({UserId:req.body.UserId})
    if(user==null)
    {
        return res.status(400).send({
            messege:"User Id is Wrong"
        })
    }
    //Check password is correct or not
    const ispass=bcrypt.compareSync(req.body.password,user.password)
    if(!ispass){
        return res.status(401).send({
            messege:"Password is Wrong"
        })
    }
    //using JWT we create the access token with a TTL and return
    const token=jwt.sign({id:user.UserId},sec.secret,{expiresIn:120})
    res.status(200).send({
        name:user.name,
        UserId:user.UserId,
        email:user.EmailId,
        usertype:user.usertype,
        accesstoken:token
    })
}