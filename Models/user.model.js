const mongoose= require('mongoose')

// Name
// User Id
// Password
// Email Id
// User Type
const userschema= new mongoose.Schema
({
    name:{
        type:String,
        required:true

    },
    UserId:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        minlength:8
    },
    EmailId:{
        type:String,
        required:true,
        lowercase:true,
        // minlength:20,
        unique:true
    },
    usertype:{
        type:String,
        required: true,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"]

    }

},{timestamps: true, versionKey:false})
module.exports=mongoose.model("User",userschema)