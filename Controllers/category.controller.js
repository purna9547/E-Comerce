const cate_model=require("../Models/catagory.model")
exports.createNewCategory=async(req,res)=>{
    //read the request


    //create the category object
    const cat_obj={
        name :req.body.name,
        description:req.body.description
    }

    //insert the mongo
    try {
        const category=await cate_model.create(cat_obj)
        return res.status(201).send(category)
    } catch (err) {
        console.log("Error while create category ",err)
        return res.status(500).send({
            messege:"Error while creating the category"
        })
    }
    //return the response
}