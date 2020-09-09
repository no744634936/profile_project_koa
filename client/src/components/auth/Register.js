import React ,{useState,useEffect}from 'react'
import axios from "axios"

import classnames from "classnames"

function Register() {

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        password2:"",
        errors:{}
    });

    const {name,email,password,password2,errors}=formData;

    const setValue= e =>setFormData({...formData,[e.target.name]:e.target.value})

    useEffect(() => {console.log(formData)},[formData.errors])
    
    const submitData=async (e) =>{
        e.preventDefault();
        if(password!==password2){
            console.log("passwords do not match ");
        }else{
            let new_user={name,email,password,}
            try{
                let config={
                    header:{
                        'Content-Type':'applicaiton/json'
                    }
                }
                let response= await axios.post("/api/user/register",new_user,config);

                console.log(response.data.message);
                if(response.data.errnum!==0){
                    setFormData(prevValue => ({...prevValue, errors:response.data}))

                    //setFormData 是个异步函数，不能赋值之后立刻打印，
                    // console.log(formData); 这样写是不对的
                    //要使用 useEffect 来查看
                    //像这样 useEffect(() => {console.log(formData)},[formData.errors])
                }

            }catch(error){
                console.error(error);
            }
        }
    }


    return (
        <div>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                
                {
                    errors.errnum && 
                    (<div className="test"><p>{errors.message}</p></div>)
                }
                
                <form className="form" onSubmit={e=>submitData(e)}>
                    <div className="form-group">
                        <input 
                        className={classnames("form-control testclassname",{"is-invalid":errors.errnum})}
                        type="text" 
                        placeholder="Name" 
                        name="name"
                        value={name}
                        onChange={e=>setValue(e)}
                         required />
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

export default Register


