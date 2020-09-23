import axios from "axios"
import {LOGIN_REQUEST,LOGIN_SUCCESSED,LOGIN_FAILED,LOGOUT,USER_LOADED,USER_LOAD_FAILED,DELETE_ACCOUNT,DELETE_ACCOUNT_FAILED} from "./authenticationTypes.js"
import {CLEAR_PROFILE_DATA} from "../profile/profileTypes.js"
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

const clearProfile=()=>{
    return{
        type:CLEAR_PROFILE_DATA,
    }
}

const deleteAccountActionType=()=>{
    return{
        type:DELETE_ACCOUNT,
    }
}

const deleteAccountFailed=(err)=>{
    return {
        type:DELETE_ACCOUNT_FAILED,

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
        dispatch(logout())
        dispatch(clearProfile())
    }
}

//delete account and profile
export const deleteAccount=(id)=>{
    if(window.confirm("are you sure? this can not be undone!!")){
        return async(dispatch)=>{
            try {
                const response=await axios.delete("/api/delete_account");
                //删除account的时候也得把post 也删除，我后端没有写根据userid来删除post的api 所以，就先留着不写这个功能。
                if(response.data.errnum===0){
                    dispatch(clearProfile())
                    dispatch(deleteAccountActionType(response.data.data))
                    dispatch(setAlert('account has been deleted'))
                }else{
                    dispatch(setAlert(response.data.messages))
                }
            } catch (err) {
                dispatch(deleteAccountFailed(err))
            }
        }
    }
}