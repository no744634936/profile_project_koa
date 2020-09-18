import React,{useState}from 'react'
import { Link,Redirect} from 'react-router-dom'
import {loginAction,logoutAction} from "../../redux/authentication/authenticationAction.js"
import {connect} from "react-redux"
import PropTypes from 'prop-types'


function Login(props) {
    const [formData,setFormData]=useState({
        email:"",
        password:"",

    });

    const {email,password}=formData;

    const setValue= e =>setFormData({...formData,[e.target.name]:e.target.value})
    const submitData=async (e) =>{
        e.preventDefault();
        props.loginAction({email,password})
    }

    if(props.isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
    return (
        <div>
            <section className="container">
                <h1 className="large text-primary">Sign in</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into your Account</p>

                <form className="form" onSubmit={e=>submitData(e)}>
                    <div className="form-group">
                        <input 
                        type="email" 
                        placeholder="Email Address" 
                        onChange={e=>setValue(e)}
                        value={email}
                        name="email" />
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
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </section>
        </div>
    )
}

Login.propTypes={
    loginAction:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}
const mapStatetoProps=(state)=>{
    return {
        isAuthenticated:state.loginData.isAuthenticated
    }
}

export default connect(mapStatetoProps,{loginAction})(Login)
