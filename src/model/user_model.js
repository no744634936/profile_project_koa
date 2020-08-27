const Users=require("../db/user.js")
const {DEFAULT_USER_AVATAR}=require("../config/constant.js")

class UserModel{
    //增
    create_user=async(name,password,email)=>{
        let newRecord=new Users({
            name,
            password,
            email,
            avatar:DEFAULT_USER_AVATAR,
        })
        let response=await newRecord.save();
        return response;
    }
    //查
    find_one=async(Id)=>{
        let response=await Users.findOne({Id:Id})  
        return response;
    }
    find_one_by_email=async(email)=>{
        let response=await Users.findOne({email:email})  
        return response;
    }

    find_one_by_id=async(id)=>{
        let response=await Users.findById(id)  
        return response;
    }


    find_all=async()=>{
        let response=await Users.find({})
        console.log(response);
        return response;
    }
}

// let test=new UserModel();
// test.find_one("108676154476958777741");

module.exports=new UserModel();