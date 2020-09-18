import {LOGIN_REQUEST,LOGIN_SUCCESSED,LOGIN_FAILED,LOGOUT,USER_LOADED} from "./authenticationTypes.js"
import jwt_decode from "jwt-decode"
let token =localStorage.getItem('token')
let user=token ? jwt_decode(token): ""; //token解析出来的用户信息


const initialState=user ?
    {
        isAuthenticated:true,
        loading:false,
        user_data:user,
    }:{};

//因为state=initialState，而 initialState里面有数据，所以假如网页被刷新，isAuthenticated，loading，user_data这些值也不会被重置。
const authenticationReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state
            }
        case LOGIN_SUCCESSED:
            let user=jwt_decode(action.payload.token) //token解析出来的用户信息
            return{
                ...state,
                user_data: user, 
            }

        case LOGIN_FAILED: 
            localStorage.removeItem("token")
            return{
                isAuthenticated:false, 
                loading:false,
                user_data:{}
            }

        case LOGOUT:
            localStorage.removeItem("token")
            return{
                isAuthenticated:false, 
                loading:false,
                user_data:{}
            }
        default: return state
    }
}

export default authenticationReducer