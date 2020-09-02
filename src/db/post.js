const mongoose=require("./db.js")


let postSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //可以是string 也可以是mongoose.Schema.Types.ObjectId
        ref:"users",
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    avatar:{
        type:String
    },
    likes:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            }
        }
    ],
    comments:[ // 评论，谁评论了我，说了什么，头像，日期
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            },
            text:{
                type:String,
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            avatar:{
                type:String
            },
            Date:{
                type:Date,
                default:Date.now()
            },
        }
    ],
    Date:{
        type:Date,
        default:Date.now()
    },
    is_deleted:{
        type:Number,
        default:0, //默认参数
    }
})

//4,定义数据库模型，将数据库中的users表 与 postSchema 对应起来
//如果数据库里不存在google_users 就新建一个。
let Posts=mongoose.model("posts",postSchema);

module.exports=Posts;