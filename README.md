
写了与post相关的各种路由
查看routes/post.js 文件

-----------------------------------------------------------------------

ctx.params.userId; 因为有koa-router 可以这样使用来获取url中的userId参数

ctx.request.body   因为有koa-bodypaser 所以可以获取前端post 过来的数据

ctx.query.expId    是获取这样的路由  localhost:3000/api/profile/experience?expId=89hgaigha

--------------------------------------------------------------------------

mongoose还可以这样来排列数据
await Post.find({}).sort({date:-1}); //逆序排列

---------------------------------------------------------------------------------

其实，使用mongoose的时候就相当于使用了model了，所以我没有必要再去定义一个model层。建立model文件夹了。

-----------------------------------------------------------------------------------
// find_result.userId 跟 ctx.state.user._id 都是object 所以变成字符串来比较
if(find_result.userId.toString()===ctx.state.user._id.toString()){

}


----------------------------------------------------------------------------------
//写删除接口得时候要检查是否为本人，如果不是本人就要提示，没有权限。

//写查询接口的时候记得考虑如果没有查询到数据要返回，没有数据。
-------------------
注意大括号里面要写return

let comment=post.comments.find(comment=>{return comment._id.toString()===commentId});

这里没有大括号，不用写return
let comment=post.comments.find(comment=> comment._id.toString()===commentId);
