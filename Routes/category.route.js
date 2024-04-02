const category_controller=require("../Controllers/category.controller")
const auth_mw=require("../middleware/auth.mw")
module.exports=(app)=>{
    app.post("/E-Comerce/api/v1/categories",[auth_mw.verifyToken,auth_mw.isAdmin],category_controller.createNewCategory)
}