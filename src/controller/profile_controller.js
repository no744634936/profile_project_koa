const {Success,Error}=require("../config/api_result_format.js")
const {
    email_exist,
    register_failed_info,
    password_wrong,
}=require("../config/error_info.js")

class ProfileController{
    get_profile_info=async(ctx,next)=>{
        ctx.body=ctx.state.user;
    }
}

module.exports=new ProfileController();