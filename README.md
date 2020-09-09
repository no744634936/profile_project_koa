"client-install": "npm install --prefix client",  //加载client 里面的node_modules



rafc : react arrow function component
使用 rafce  来建立 function component 


----------------------------------------------------------------
npm install react-router-dom --save
import {BrowserRouter, Route,Switch} from "react-router-dom"
import { Link } from 'react-router-dom'


----------------------------------------------------------------
主要写了两个文件
client /src/components/auth/Register.js 
client /src/components/auth/Login.js 

前端注册，登录，使用axios 将数据传递到后端，然后后端返回结果数据。
注意这两个文件中的useState hook的用法，有点妙，

使用axios 将数据传递到后端，然后后端返回结果数据。这个步骤应该使用 redux来做。
这里为了看得懂，就没在这两个文件中使用redux。
下一小结使用redux。可以对比下一小节看看这两个文件的区别。
----------------------------------------------------------------------

如果后端返回了数据验证失败的错误信息，前端要显示出来，
npm install classnames --save
需要下载dependency
这个功能主要看下面这个文件
client /src/components/auth/Register.js 

如果发生错误文件里的这段代码可以给输入框打上红的边框

className={classnames("form-control testclassname",{"is-invalid":errors.errnum})}

但是因为css 有冲突，所以实际并没有显示红色边框，但是发生错误的时候，class 里面确
实多了一个is-invalid

is-invalid 是bootstrap里面的一个类名，它可以给html加上红色边框

<input class="form-control testclassname is-invalid" type="text" placeholder="Name" name="name" required="" value="TEST TEST">


---------------------------------------------------------------------

classnames 的主要用法，给react的html元素添加多个class名
主要用法如下


var liClasses = classNames({
    'main-class': true,
    'activeClass': self.state.focused === index
});

return (<li className={liClasses}>{data.name}</li>);


------------