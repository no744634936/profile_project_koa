建立alert component

在http://localhost:5500/register 页面
当后端将错误返回到前端的时候，要在前端显示错误提醒。
5秒后就会自动给移除这些错误提醒。

npm install redux react-redux redux-thunk redux-devtools-extension --save

npm install uuid --save



查看 app.js

component/Register.js   //这是一个实验性的组件，没有用到redux，知道classNames 怎么用就可以了

component/auth/Register_with_redux.js  //这个文件用到了redux，

layout/Alert.js     //提示错误信息的组件

redux/alert 文件夹里的文件

redux/register 文件夹里的所有文件



通过login页面将 token 放入localstorage里面
这样很多页面请求就可以携带这个token。
component/Login_with_redux.js

设置一个全局的header，查看 src/utils/setAuthToken.js 文件

//放到本地的token包含了用户的信息，需要从token里解析出用户信息
localStorage.setItem("token",action.payload.token) 

//设置全局的header 然后每一个页面就都可以使用这个header了
setAuthToken(action.payload.token)  



从token里解析出用户信息，cd client
npm install jwt-decode --save






用来参考的网址
https://stackblitz.com/edit/react-redux-registration-login-example?file=App%2FApp.js



ーーーーーーーーーーーーーーーーーーーーーーーーーー
首先注册功能，
1，输入信息，如果信息输入错误，启动alert 报错。输入正确跳转到登录页面

2，
输入邮箱密码
如果正确，就将后端返回的token放入localStorage，

app.js 查看localStorage 里的token是否存在，存在的话就启用loadUser 方法。
将user 的数据从后端取出。放进state里面。
react的页面被刷新的话state会被重置，为了保留用户的登录信息，
就要在每次页面刷新的时候，使用token向后端请求用户的数据并放入state


3，退出功能，删除token即可


4,登录前跟登录后 navbar 会变化。查看src/component/layout/Navbar.js 文件