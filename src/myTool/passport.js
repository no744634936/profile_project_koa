const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {JWT_SECRET_KEY}=require("../config/constant.js");
const userModel=require("../model/user_model.js")


//只能这样回调吗？
module.exports=(passport)=>{
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = JWT_SECRET_KEY;

    passport.use(new JwtStrategy(opts, async(jwt_payload, done)=>{
        // console.log(jwt_payload);
        let user=await userModel.find_one_by_id(jwt_payload.userid)
        if(user){
            return done(null,user) 
            //将user传递到router.get("/api/user/current",passport.authenticate('jwt', { session: false }),userController.get_current_user)
            //路由里面去。然后使用ctx.state.user 就可以取得user的信息了。
        }else{
            return done(null,false)
        }
    }));
}
