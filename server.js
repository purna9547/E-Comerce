const express=require("express")
const mongoose= require("mongoose")
const app= express()
const server_config=require("./configuration/server.config")
const mon_connect=require("./configuration/db.config")
const user_model= require("./Models/user.model")
const bcrypt= require("bcryptjs")
app.use(express.json())// middlewave


// connect with mongodb
mongoose.connect(mon_connect.DB_URL)
const db = mongoose.connection
db.on('error',()=>{
    console.log("Error to connect to Mongodb Databases")
})
db.once('open',()=>{
    console.log("Connect to mongo")
    init()
})
async function init()
{
    let user=await user_model.findOne({UserId:'admin'})
    if(user){
        console.log("Admin is already fouond")
        return
    }
    try{
        user= await user_model.create({
            name:"Purna",
            UserId:"admin",
            password:bcrypt.hashSync("purna@12",8),
            EmailId:"pradhan.purna@gmail.com",
            usertype:"ADMIN"
        })
        console.log("Admin is created followed by ",user)
    }catch(err){
        console.log("Error creating while creating ", err)
    }
}
// stich with the route
require("./Routes/auth.route")(app)
require("./Routes/category.route")(app)
// start the app
app.listen(server_config.PORT,()=>
{
    console.log("server is started at",server_config.PORT)
})