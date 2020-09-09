import React,{useState}from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function Login() {
    const [formData,setFormData]=useState({
        email:"",
        password:"",

    });

    const {email,password}=formData;

    const setValue= e =>setFormData({...formData,[e.target.name]:e.target.value})
    const submitData=async (e) =>{
        e.preventDefault();
        console.log(formData);
        let new_user={
            email,
            password,
        }
        try{
            let config={
                header:{
                    'Content-Type':'applicaiton/json'
                }
            }

            let response= await axios.post("/api/user/login",new_user,config);
            console.log(response.data);
        }catch(e){
            console.error(e);
        }
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

export default Login
