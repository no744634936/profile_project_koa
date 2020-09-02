const router=require("koa-router")();
const passport = require('koa-passport')
const postController=require("../controller/post_controller.js")
const validate_post=require("../validator/validate_post.js")

router.post("/api/add_post",passport.authenticate('jwt', { session: false }),validate_post,postController.add_post)
router.get("/api/post_all",postController.get_all_posts)

//获取单个post
router.get("/api/post/:id",postController.get_post_by_id)
router.get("/api/post/:id",postController.get_post_by_id)
router.delete("/api/delete_post/:id",passport.authenticate('jwt', { session: false }),postController.delete_post_by_id)

router.put("/api/like/:id",passport.authenticate('jwt', { session: false }),postController.click_like)
router.delete("/api/remove_like/:id",passport.authenticate('jwt', { session: false }),postController.remove_like)

router.put("/api/comment/:id",passport.authenticate('jwt', { session: false }),postController.write_comment)
router.delete("/api/remove_comment/:id/:commentId",passport.authenticate('jwt', { session: false }),postController.remove_comment)

router
module.exports = router