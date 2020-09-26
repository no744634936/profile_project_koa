
这一节写了这两个路由

<Route exact path="/profiles" component={Profiles}></Route>
<Route exact path="/user/profile/:userId" component={Profile}></Route>


这一节里有两个bug。

1、https://www.udemy.com/course/mern-stack-front-to-back/learn/lecture/17075594#overview

这个问题还不知道什么意思

2，我登陆进去看了一个人的profile之后，退出来再看另一个人的profile
  因为state没有更新所以，github repo的内容是一样的，除非我手动刷新页面。

  http://localhost:5500/user/profile/5f6b032c378c21209027ead8

  http://localhost:5500/user/profile/5f4b78a261ec7d3248e4a725