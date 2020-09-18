import {REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESSED,
    REGISTER_USER_FAILED} from "./registerTypes.js"

const initialState={
    registered:false,
}

//因为是register 所以不管是否注册成功，都不需要再redux的store里存数据，所以返回{}就好了
const registerReducer=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return { registered: false };
        case REGISTER_USER_SUCCESSED:
            return{
                registered:true,
            }
        case REGISTER_USER_FAILED: 
            return{
                registered:false,
            }
        default: 
            return state
    }
}

export default registerReducer