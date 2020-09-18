import React ,{useState}from 'react'
import {connect} from "react-redux"
import { Redirect} from 'react-router-dom'
import setAlert from "../../redux/alert/alertAction.js"
import registerUser from "../../redux/register/registerAction.js" 
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

function Register(props) {

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        password2:"",
        errors:{}
    });

    const {name,email,password,password2}=formData;

    const setValue= e =>setFormData({...formData,[e.target.name]:e.target.value})
    
    const submitData=async (e) =>{
        e.preventDefault();
        if(password!==password2){
            props.setAlert("passwords do not match","danger");

        }else{
            console.log("good success");
            props.registerUser({name,email,password})
        }
    }

    //当上面的props.registerUser({name,email,password}) 方法触发
    //registered 属性被改为true，页面会重新刷新一次，然后就会执行这段代码。跳转页面
    if(props.registered){
        return <Redirect to="/login"></Redirect>
    }
    return (
        <div>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                
                
                <form className="form" onSubmit={e=>submitData(e)}>
                    <div className="form-group">
                        <input 
                        className="form-control testclassname"
                        placeholder="Name" 
                        name="name"
                        value={name}
                        onChange={e=>setValue(e)}
                         />
                    </div>

                    <div className="form-group">

                        <input 
                        type="email" 
                        placeholder="Email Address" 
                        onChange={e=>setValue(e)}
                        value={email}
                        name="email" />
                        <small className="form-text">This site uses Gravatar so if you want a profile image, use aGravatar email</small>
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e=>setValue(e)}
                        value={password}
                        name="password"
                        minLength="6"
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={e=>setValue(e)}
                        value={password2}
                        name="password2"
                        minLength="6"
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <a href="login.html">Sign In</a>
                </p>
            </section>
        </div>
    )
}

Register.propTypes={
    setAlert: PropTypes.func.isRequired,// props.setAlert 必须是函数,而且必须要传递setAlert这个函数到props
    registerUser: PropTypes.func.isRequired,
    registered:PropTypes.bool.isRequired,
}

const mapStatetoProps=(state)=>{
    return{
        registered:state.register.registered
    }
}

export default withRouter(connect(mapStatetoProps,{setAlert,registerUser})(Register))


