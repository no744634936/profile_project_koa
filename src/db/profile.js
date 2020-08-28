const mongoose=require("./db.js")


let profileSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"users",
        required:true,

    },
    handle:{//有什么用？
        type:String,
        required:true,
        max:40,
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{//职位
        type:String,
        required:true,
    },
    skills:{ //注意skills后面跟的是数组.数组要这样设定
        type:[String],
        required:true
    },
    bio:{  //个人介绍
        type:String,
    },
    github_user_name:{
        type:String,
    },
    experience:[ //这是一个数组，数组里面有一个或者多个object
        {
            current:{type:Boolean,default:true},
            title:{type:String,require:true},
            company:{type:String,require:true},
            location:{type:String},
            from:{type:String,require:true},
            to:{type:String},
            description:{type:String}
        }
    ],
    education:[ //education是一个数组，数组里面有一个或者多个object
        {
            current:{type:Boolean,default:true},
            school:{type:String,require:true},
            degree:{type:String,require:true},
            field_of_study:{type:String,require:true},
            from:{type:String,require:true},
            to:{type:String},
            description:{type:String}
        }
    ],
    social:{  //social 是一个object 里面是元素
        wechat:{type:String},
        QQ:{type:String},
        facebook:{type:String},
        line:{type:String},
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    is_deleted:{
        type:Number,
        default:0, //默认参数
    }
})

//4,定义数据库模型，将数据库中的users表 与 profileSchema 对应起来
//如果数据库里不存在google_users 就新建一个。
let Profiles=mongoose.model("profiles",profileSchema);

module.exports=Profiles;