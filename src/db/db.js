const mongoose = require('mongoose');
const keys=require("../config/dev_config.js")

//使用mlab的连接方式
mongoose.connect(keys.mongoURI,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("mongodb connected...");
})
.catch(err=>{
    console.log(err);
});

module.exports=mongoose;