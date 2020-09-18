import {LOGIN_REQUEST,LOGIN_SUCCESSED,LOGIN_FAILED,LOGOUT,USER_LOADED,USER_LOAD_FAILED} from "./authenticationTypes.js"
import setAuthToken from "../../utils/setAuthToken.js"
import jwt_decode from "jwt-decode"

//这种写法是错误的，假如login成功，然后刷新页面之后，state里面isAuthenticated ，loading，useruser_data就会被重置。
const initialState={

    isAuthenticated:false,
    loading:true,
    user_data:{},
}

const authenticationReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state
            }
        case LOGIN_SUCCESSED:
            localStorage.setItem("token",action.payload.token) //放到本地的token包含了用户的信息，需要从token里解析出用户信息
            setAuthToken(action.payload.token)  //设置全局的header 然后每一个页面就都可以使用这个header了
            let user=jwt_decode(action.payload.token) //token解析出来的用户信息
            return{
                isAuthenticated:true, 
                loading:false,
                user_data: user, 
            }
        case USER_LOADED:
            return{
                isAuthenticated:true,
                loading: false,
                user_data:action.payload,
            }
        case LOGIN_FAILED: 
        case USER_LOAD_FAILED:
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