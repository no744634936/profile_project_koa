const router=require("koa-router")();
const passport = require('koa-passport')
const profileController=require("../controller/profile_controller")


router.get("/api/profile",passport.authenticate('jwt', { session: false }),profileController.get_profile_info)

module.exports = router