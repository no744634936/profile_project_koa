
const validate_data=require("../validator/_validate.js")
const {Success,Error}=require("../config/api_result_format.js")
const {data_validataion_failed}=require("../config/error_info.js")


 // 校验规则 json schema。可以google查看json schema的更多规则
const SCHEMA = {
    type: 'object',
    properties: {
        status: {
            type: 'string',
            maxLength: 255,
            minLength: 1
        },
        skills: { 
            type: "string", 
            minLength: 1,  //必须要有值的话就最小长度设为1吧
        },
        website:{
            type: "string", 
            format:"uri"
        }
    },
}


//执行校验
/**
 * @description 校验用户数据
 * 
 */

//中间件 中间件一定是async函数
validate_profile_info=async(ctx,next)=>{

    //data为用户通过路由传递的数据
    let data=ctx.request.body
    let errs=validate_data(SCHEMA,data)
    console.log(errs);
    if(errs){
        let err_messages=errs.map(err=>err.message);
        ctx.body={errnum:100020,messages:err_messages}
        return // 不再执行后面的程序
    }

    //验证通过进行下一步，使用controller里的方法进行逻辑处理
    await next()
}
module.exports=validate_profile_info
