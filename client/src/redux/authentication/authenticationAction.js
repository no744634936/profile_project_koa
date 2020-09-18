import axios from "axios"
import {LOGIN_REQUEST,LOGIN_SUCCESSED,LOGIN_FAILED,LOGOUT,USER_LOADED,USER_LOAD_FAILED} from "./authenticationTypes.js"
import setAlert from "../alert/alertAction.js"
import setAuthToken from "../../utils/setAuthToken.js"


const loginRequest=()=>{
    return {
        type:LOGIN_REQUEST
    }
}
const loginSuccessed=(result)=>{
    return {
        type:LOGIN_SUCCESSED,
        payload:result
    }
}

const loginFailed=()=>{
    return{
        type:LOGIN_FAILED,
    }
}

const loadUser=(userData)=>{
    return{
        type:USER_LOADED,
        payload:userData
    }
}

const logout=()=>{
    return {
        type:LOGOUT,
    }
}



export const loginAction=({email,password})=>{
    let user={email,password}
    return async(dispatch)=>{
        try{
            dispatch(loginRequest())
            let config={
                header:{
                    'Content-Type':'applicaiton/json'
                }
            }
            let result= await axios.post("/api/user/login",user,config);
            console.log(result);
            console.log(result.data.data.token);
            if(result.data.errnum===0){
                dispatch(loginSuccessed(result.data.data))
            }else{
                result.data.messages.forEach(msg=>{
                    dispatch(setAlert(msg,"danger"))
                })
                dispatch(loginFailed())
            }
        }catch(error){
            dispatch(loginFailed())
        }
    }
}

export const loadUserAction=()=>{
    return async(dispatch)=>{
        if(localStorage.token){
            setAuthToken(localStorage.token);
            try{
                const response=await axios.get("/api/user/current")
                dispatch(loadUser(response.data))
            }catch(err){
                dispatch(loadUser(USER_LOAD_FAILED))
            }
        }

    }
}

export const logoutAction=()=>{
    return async(dispatch)=>{
        dispatch(logout(LOGOUT))
    }
}