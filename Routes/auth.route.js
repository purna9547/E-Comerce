// POST localhost:8080/E-Comerce/api/v1/auth/signup
// I need to intercept this
const auth_controller= require("../Controllers/auth.controller")
const authmw=require("../middleware/auth.mw")
module.exports=(app)=>
{
    app.post("/E-Comerce/api/v1/auth/signup",[authmw.verifySignUpBody],auth_controller.signup)
    //for sign in
    app.post("/E-Comerce/api/v1/auth/signin",[authmw.verifySigninBody],auth_controller.signin)
}