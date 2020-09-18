import {SET_ALERT,REMOVE_ALERT,} from "./alertTypes.js"
import { v4 as uuidv4 } from 'uuid';


const setAlertSuccessed=(message,alertType)=>{
    const id=uuidv4();
    return{
        type:SET_ALERT,
        payload:{id:id,message:message,alertType:alertType}//alertType 不同css就会不同
    }
}

const removeAlert=()=>{
    return{
        type:REMOVE_ALERT,
        payload:"删除成功"
    }
}
const setAlert=(message,alertType)=>{
    return async(dispatch)=>{
        dispatch(setAlertSuccessed(message,alertType))

        setTimeout(()=>{
            return dispatch(removeAlert())
        },5000)
    }


}

export default setAlert