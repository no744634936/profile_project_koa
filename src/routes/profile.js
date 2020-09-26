const router=require("koa-router")();
const passport = require('koa-passport')
const profileController=require("../controller/profile_controller")
const validate_profile_info=require("../validator/validate_profile.js")
const validate_experience_info =require("../validator/validate_experience.js")
const validate_education_info =require("../validator/validate_education.js")


router.post("/api/add/profile",passport.authenticate('jwt', { session: false }),validate_profile_info,profileController.add_or_edit_profile_info)
router.get("/api/profile/user/:userId",profileController.get_profile_info)
router.get("/api/all_profiles",passport.authenticate('jwt', { session: false }),profileController.get_all_profile)
router.put("/api/profile/experience",passport.authenticate('jwt', { session: false }),validate_experience_info,profileController.experience_handle)
router.put("/api/profile/education",passport.authenticate('jwt', { session: false }),validate_education_info,profileController.education_handle)

router.delete("/api/profile/experience/:expId",passport.authenticate('jwt', { session: false }),profileController.delete_experience)
router.delete("/api/profile/education/:eduId",passport.authenticate('jwt', { session: false }),profileController.delete_education)
router.delete("/api/delete_account",passport.authenticate('jwt', { session: false }),profileController.delete_account)

//get repos from github
router.get("/api/profile/github/:username",profileController.get_github_repos)
module.exports = router