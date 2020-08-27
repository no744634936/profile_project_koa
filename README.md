//注册接口，
使用koa-bodyparser 就可以使用 ctx.request.body 来获取前端post到后端的数据。

//使用postman来测试 http://localhost:3000/register 接口
注意要使用body 里的 x-www-form-urlencoded  然后输入键值对，所有键值都不需要引号


//这样写是不对的
find_result 是一个object javascript中object没有length属性。

if(find_result.length>0){
    ctx.body=new Error(email_exist)
    console.log(new Error(email_exist));
    return
}


数据库用的是mlab，
密码加密，
测试注册功能。