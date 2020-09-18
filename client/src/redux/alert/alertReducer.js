

import {SET_ALERT,REMOVE_ALERT} from "./alertTypes.js"

const initialState=[];

const AlertReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_ALERT:
            return [...state,action.payload];
        case REMOVE_ALERT:
            console.log(state);
            state.shift();  //在这里用state.shift()来删除数组中的元素，而不是state.alerts.shift()
            return[...state]
        default:
            return state;
    }
}


export default AlertReducer