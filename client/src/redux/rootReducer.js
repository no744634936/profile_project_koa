import {combineReducers} from "redux"
import registerReducer from "./register/registerReducer.js"
import alertReducer from "./alert/alertReducer.js"
import authenticationReducer from "./authentication/authenticationReducer.js"
import profileReducer from "./profile/profileReducer.js"

const rootReducer=combineReducers({
    register:registerReducer,
    alert:alertReducer,
    loginData:authenticationReducer,
    profileData:profileReducer,

})


export default rootReducer