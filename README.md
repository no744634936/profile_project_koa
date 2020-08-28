//jwt 登录验证

npm install jsonwebtoken --save  //生成登录时的token，和验证token

看 app.js

npm install basic-auth --save   //

npm install koa-passport passport-jwt --save //来验证token

----------------------------------------------------------------------
app.js 里面导入 
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

开始监听整个系统

-----
然后将passport 回调到 /myTool/passport.js文件中去.用来验证token
require("./myTool/passport.js")(passport)
为什么用回调，因为这样可以减少app.js文件中的代码量


-----
用postman
当有人登录使用了 /api/user/login路由 
就会返回 一个token，
详见login方法
使用了const jwt = require('jsonwebtoken');

-------
然后拿着这个token post 到/api/user/current路由。
将token传到 "api/user/current" 这个路由时
passport.authenticate('jwt', { session: false })中间件会将token解析成用户数据。
然后放入 myTool/passport.js 文件中的 jwt_payload 变量。
然后同过jwt_payload.userid 在数据库中查找是否存在这个user，如果存在，就将这个user的信息交给ctx.state，然后就可以在userController.get_current_user 方法中使用 ctx.state.user
获得当前user的信息


postman 里使用header 来post token
输入下面这个键值对
Authorization :   bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.