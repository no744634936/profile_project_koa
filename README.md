//私有路由是固定的写法，记下来就可以了，不用弄懂
//只要看 isAuthencated 就可以了
//私有路径不能直接在浏览器的输入框里输入路径后跳转，
  而必须登录后通过点击链接的方式跳转


app.js 文件里有使用 PrivateRoute
查看privateRoute/ProviateRoute.js

-----------------------------------------------


1,没有取得profile的数据的时候要显示正在加载的图片，就是那个转圈的图片，

2，点击logout的时候要清除profile的数据。


在http://localhost:5500/dashboard 页面实现
3,添加profile 功能

4,修改profile 功能

5，添加教育,经历 功能

6，删除教育，经历
7，注销用户，删除账号，删除post(删除post这个功能没写)