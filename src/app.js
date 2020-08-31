const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const render = require('koa-art-template')
const index = require('./routes/index')
const user_route=require("./routes/user_route.js")
const profile_route=require("./routes/profile.js")
const path=require('path')
const passport = require('koa-passport')
const session = require('koa-session')


app.keys = ['some secret hurr'];   /*cookie的签名 默认的不用改*/
const CONFIG = {
    key: 'koa:sess', /** 默认 */
    maxAge: 10000,  /*  cookie的过期时间        【需要修改】  */
    overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
    httpOnly: true, /**  true表示只有服务器端可以获取cookie */
    signed: true, /** 默认 签名 */
    rolling: false, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: true, /** (boolean) renew session when session is nearly expired      【需要修改】 renew跟rolling任意一个设为true。当有人在操作的时候即使到了设定的时间也不会断开*/
};
app.use(session(CONFIG, app));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

render(app, {
    root: path.join(__dirname, 'views'),   //视图的位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});



//koa-passport
app.use(passport.initialize())
app.use(passport.session())

//将passport 回调到 /myTool/passport.js文件中去.用来验证token
require("./myTool/passport.js")(passport)


// routes
app.use(index.routes(), index.allowedMethods())
app.use(user_route.routes(), user_route.allowedMethods())
app.use(profile_route.routes(), user_route.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
