import {REGISTER_USER_REQUEST,
        REGISTER_USER_SUCCESSED,
        REGISTER_USER_FAILED} from "./registerTypes.js"
import axios from "axios"
import setAlert from "../alert/alertAction.js"

const registerUserRequest=()=>{
    return{
        type:REGISTER_USER_REQUEST,
    }
}

const registerUserSuccessed=(registerResult)=>{
    return{
        type:REGISTER_USER_SUCCESSED,
        payload:registerResult
    }
}

const registerUserFailed=()=>{
    return{
        type:REGISTER_USER_FAILED,
    }
}

const registerUser=({name,email,password})=>{
    let new_user={name,email,password}
    return async(dispatch)=>{
        try{
            dispatch(registerUserRequest());
            let config={
                header:{
                    'Content-Type':'applicaiton/json'
                }
            }
            let registerResult= await axios.post("/api/user/register",new_user,config);
            console.log(registerResult);
            if(registerResult.data.errnum===0){
                dispatch(registerUserSuccessed(registerResult))
            }else{
                registerResult.data.messages.forEach(msg=>{
                    dispatch(setAlert(msg,"danger"))
                })
                dispatch(registerUserFailed())
            }
        }catch(error){
            dispatch(registerUserFailed())
        }
    }
}

export default registerUser