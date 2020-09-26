const {Success,Error}=require("../config/api_result_format.js")
const {
    create_profile_failed,
    record_not_exist,
    system_error,
}=require("../config/error_info.js")
const ProfileModel=require("../model/profile_model.js")
const profile_model = require("../model/profile_model.js")
const fetch = require("node-fetch");
const {githubClientId,githubSecret}=require("../config/constant.js")

class ProfileController{
    add_or_edit_profile_info=async(ctx,next)=>{

        let {company,website,location,
            status,skills,bio,github_user_name,
            wechat,QQ,facebook,line}=ctx.request.body

        //如果前端不传值进来，那么这些变量都会是undefind。
        //如果skills 是选填项那么，那么就要这样写 skills: skills ? skills.split(","):null
        //因为对undefind后面跟任何方法都会报错。
        const new_profile={
            userId:ctx.state.user._id,
            company,
            website,
            location,
            status,
            skills: skills.split(","),
            bio,
            github_user_name,
            social:{wechat,QQ,facebook,line}
        }
        try{
            let find_result=await ProfileModel.find_one_by_userId(ctx.state.user._id);
            if(find_result){
                //find_resule 不为空就更新
                let result=await ProfileModel.update_profile(new_profile);
                ctx.body=new Success(result);
            }else{
                //find_resule 为空就创建记录
                let result=await ProfileModel.create_profile(new_profile);
                ctx.body=new Success(result);
            }

        }catch(e){
            console.error(e)
            ctx.body=new Error(create_profile_failed)
        }

    }

    get_profile_info=async(ctx,next)=>{
        try{
            let userId=ctx.params.userId;
            let result=await ProfileModel.find_one_by_userId(userId);
            if(result){
                ctx.body=new Success(result)
            }else{
                //如果没有找到数据
                ctx.body=new Error(record_not_exist)
            }
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }
    get_all_profile=async(ctx,next)=>{
        try{
            let result=await ProfileModel.find_all_profiles();
            if(result){
                ctx.body=new Success(result)
            }else{
                //如果没有找到数据
                ctx.body=new Error(record_not_exist)
            }
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }

    experience_handle=async(ctx,next)=>{
        try{
            //找到，profile记录，然后项profile的记录里添加experience
            let {title,company,location,from,to,description,current}=ctx.request.body;
            
            let new_exp={title,company,location,from,to,description,current}
            let current_userId=ctx.state.user._id

            let find_result=await ProfileModel.find_one_by_userId(current_userId);
            find_result.experience.push(new_exp);

            //居然还能这样将数据直接保存到数据库。
            //保存的时候会自动给experience数组里的元素添加 _id;
            let update_result=await find_result.save();
            ctx.body=new Success(update_result)  //返回 {errnum:0,{}}
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }

    education_handle=async(ctx,next)=>{
        try{

            let {school,degree,field_of_study,from,to,description,current}=ctx.request.body;
            
            let new_edu= {school,degree,field_of_study,from,to,description,current}
            let current_userId=ctx.state.user._id

            let find_result=await ProfileModel.find_one_by_userId(current_userId);
            find_result.education.push(new_edu);

            let update_result=await find_result.save();
            ctx.body=new Success(update_result)  //返回 {errnum:0,{}}
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }

    delete_experience=async(ctx,next)=>{
        try{
            let current_userId=ctx.state.user._id
            let expId=ctx.params.expId;
    
            let profile=await ProfileModel.find_one_by_userId(current_userId);

            //找到要删除的experience数组里的元素的位置。
            let removeIndex=profile.experience.map(item=>item._id).indexOf(expId);
            profile.experience.splice(removeIndex,1);
            await profile.save();
            ctx.body=new Success(profile)
            
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }

    }
    delete_education=async(ctx,next)=>{
        try{
            let current_userId=ctx.state.user._id
            let eduId=ctx.params.eduId;
    
            let profile=await ProfileModel.find_one_by_userId(current_userId);

            //找到要删除的experience数组里的元素的位置。
            let removeIndex=profile.education.map(item=>item.id).indexOf(eduId);

            // console.log(eduId);
            // console.log(removeIndex);
            
            profile.education.splice(removeIndex,1);
            await profile.save();
            ctx.body=new Success(profile)

        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }

    delete_account=async(ctx,next)=>{
        try{
            let current_userId=ctx.state.user._id
            await ProfileModel.delete_account(current_userId)
            ctx.body=new Success()    ////返回 {errnum:0,{}} 删除数据成功
        }catch(e){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }

    get_github_repos=async(ctx,boty)=>{
        try{
            console.log("hahah");
            const response=await fetch(`https://api.github.com/users/${ctx.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${githubClientId}&client_secret=${githubSecret}`)
            const result=await response.json();
            ctx.body=new Success(result)
        }catch(err){
            console.error(e);
            ctx.body=new Error(system_error)
        }
    }

}

module.exports=new ProfileController();