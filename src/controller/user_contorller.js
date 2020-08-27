const user_model = require("../model/user_model");
const docrypto=require("../myTool/cryp.js")
const userModel=require("../model/user_model.js")
const {Success,Error}=require("../config/api_result_format.js")
const {
    email_exist,
    register_failed_info,
}=require("../config/error_info.js")

class UserContorller{

    register=async(ctx,next)=>{
        let {name,password,email}=ctx.request.body;
        let find_result=await userModel.find_one_by_email(email)
        if(find_result){   //不要写成 if(find_result.length>0) js中object没有length属性
            ctx.body=new Error(email_exist)
            return
        }
        try {
            let newUser=await userModel.create_user(name,docrypto(password),email)
            ctx.body=new Success()
        } catch (error) {
            console.error(error.message,error.stack);
            ctx.body=new Error(register_failed_info)
        }
    }
}

module.exports=new UserContorller();