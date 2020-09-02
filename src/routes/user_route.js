const router=require("koa-router")();
const userController=require("../controller/user_contorller.js")
const validate_user_register =require("../validator/validate_user_register.js")
const passport = require('koa-passport')

router.get("/user",async(ctx,next)=>{
    ctx.body="hahahah"
})

router.post("/api/user/register",validate_user_register,userController.register)

router.post("/api/user/login",userController.login)   //没有写登录验证


/**
 * @description 返回当前用户的信息
 * @access 私密登录后才能用
 * 将token传到 "api/user/current" 这个路由时
 * passport.authenticate('jwt', { session: false })会将将token解析成用户的数据。
 * 然后放入 passort.js 文件中的 jwt_payload 变量。
 */
router.get("/api/user/current",passport.authenticate('jwt', { session: false }),userController.get_current_user)
module.exports=router