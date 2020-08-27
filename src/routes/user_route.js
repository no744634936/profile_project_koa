const router=require("koa-router")();
const userController=require("../controller/user_contorller.js")
const validate_user_register =require("../validator/validate_user_register.js")

router.get("/user",async(ctx,next)=>{
    ctx.body="hahahah"
})

router.post("/api/user/register",validate_user_register,userController.register)
router.post("/api/user/login")
module.exports=router