const Profile=require("../db/profile.js")
const Users=require("../db/user.js")

class ProfileModel{

    create_profile=async ({userId,handle,company,website,location,status,skills,bio,github_user_name,social})=>{
        
        let new_record=new Profile({userId,handle,company,website,location,status,skills,bio,github_user_name,social})
        let response =await new_record.save();
        return response
    }

    update_profile=async({userId,handle,company,website,location,status,skills,bio,github_user_name,social})=>{
        let response=await Profile.updateOne(
            {userId:userId},
            {handle,company,website,location,status,skills,bio,github_user_name,social}
        )
        return response
    }

    find_one_by_userId=async(id)=>{
        //populate将user表里对应的记录放到find_result 中
        //userId 为db/profile.js文件中的字段
        let find_result=await Profile.findOne({userId:id}).populate("userId",["name","avatar"]);
        return find_result
    }

    find_all_profiles=async()=>{
        let find_result=await Profile.find({}).populate("userId",["name","avatar"]);
        return find_result
    }

    delete_account=async(userId)=>{
        await Profile.findOneAndRemove({userId:userId});
        await Users.findOneAndRemove({_id:userId})
    }
}


module.exports=new ProfileModel();