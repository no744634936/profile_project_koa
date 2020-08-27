const mongoose=require("./db.js")


let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,

    },
    avatar:{
        type:String,
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Number,
        default:0, //默认参数
    }
})

//4,定义数据库模型，将数据库中的users表 与 userSchema 对应起来
//如果数据库里不存在google_users 就新建一个。
let Users=mongoose.model("users",userSchema);

module.exports=Users;