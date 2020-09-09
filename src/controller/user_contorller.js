const user_model = require("../model/user_model");
const docrypto=require("../myTool/cryp.js")
const userModel=require("../model/user_model.js")
const {Success,Error}=require("../config/api_result_format.js")
const {JWT_SECRET_KEY}=require("../config/constant.js")
const {
    email_exist,
    register_failed_info,
    password_wrong,
}=require("../config/error_info.js")

const jwt = require('jsonwebtoken');

class UserContorller{

    register=async(ctx,next)=>{

        console.log(ctx.request.body);
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
            //应该要这样写，ctx.body=new Error(error.message) 将具体的错误信息传给前端。
        }
    }

    login=async(ctx,next)=>{

        // 查询email
        let {email,password}=ctx.request.body;
        console.log(email,password);
        let find_result=await userModel.find_one_by_email(email)
        //没查到email
        if(!find_result){
            ctx.body=new Error(email_exist)
            return
        }

        //查到email了,检查密码是否正确
        if(find_result.password===docrypto(password)){
            //返回token
            let payload={ userid: find_result._id,username:find_result.name,avatar:find_result.avatar}
            let token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn:60*60});//expiresIn的单位为秒
            // return token
            ctx.body={
                status:200,
                token:"bearer "+token,  //必须加bearer这个字符串,注意中间有个空格
            }
        }else{
            ctx.body=new Error(password_wrong)
            return
        }
    }

    get_current_user=async(ctx,next)=>{
        ctx.body={
            id:ctx.state.user._id,
            name:ctx.state.user.name,
            email:ctx.state.user.email,
            avatar:ctx.state.user.avatar,
        }
    }
}

module.exports=new UserContorller();