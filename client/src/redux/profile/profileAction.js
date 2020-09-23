import axios from "axios"
import setAlert from "../alert/alertAction.js"
import {GET_PROFILE,
        GET_PROFILE_FAILED,
        Add_EXPERIENCE,
        Add_Education,
        DELETE_EXPERIENCE,
        DELETE_EDUCATION,
        CLEAR_PROFILE_DATA,
        DELETE_ACCOUNT} from "./profileTypes.js"


//get current user profile
const getUserProfile=(data)=>{
    return {
        type:GET_PROFILE,
        payload:data,
    }
}

const getUserProfileFailed=(err)=>{
    return {
        type:GET_PROFILE_FAILED,
        payload:err
    }
}


//其实addExperienceActionTpye，addEducationActionType
//deleteExperienceActionTpye，delteEducationActionType
//这四个方法可以用 updateProfile 一个方法表示。 
const addExperienceActionTpye=(data)=>{
    return{
        type:Add_EXPERIENCE,
        payload:data
    }
}

const addEducationActionType=(data)=>{
    return{
        type:Add_Education,
        payload:data
    }
}
const deleteExperienceActionTpye=(data)=>{
    return{
        type:DELETE_EXPERIENCE,
        payload:data
    }
}

const deleteEducationActionType=(data)=>{
    return{
        type:DELETE_EDUCATION,
        payload:data
    }
}

const deleteAccountActionType=()=>{
    return{
        type:DELETE_ACCOUNT,
    }
}

const clearProfile=()=>{
    return{
        type:CLEAR_PROFILE_DATA,
    }
}


export const getCurrentUserProfile=(userId)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get(`/api/profile/user/${userId}`)
            console.log(response);
            if(response.data.errnum===0){
                dispatch(getUserProfile(response.data.data))
            }else{
                dispatch(getUserProfileFailed(response.data.messages))
            }

        }catch(err){
            dispatch(getUserProfileFailed(err))
        }

    }
}

//create  or update a profile
//注意这里在更新profile的时候没有type，这是因为更新方法跟添加方法是同一个，使用添加type就可以了

export const createProfile=(formData,history,edit=false)=>{
    return async(dispatch)=>{
        try{
            const config={
                'Content-Type':'application/json'
            }
            const response=await axios.post("/api/add/profile",formData,config)
            console.log(response);
            if(response.data.errnum===0){
                dispatch(getUserProfile(response.data.data))
                dispatch(setAlert(edit ? "profile updated" : "profile created",'success'))
            }else{
                dispatch(setAlert(response.data.messages))
            }

            if(!edit){
                //在action里面不能用 <Redirect to="">
                history.push("/dashboard")
            }
        }catch(err){
            dispatch(getUserProfileFailed(err))
        }
    }

}


//add experience to profile
export const addExperience =(formData,history)=>{
    return async(dispatch)=>{
        try{
            const config={
                'Content-Type':'application/json'
            }
            const response=await axios.put("/api/profile/experience",formData,config)
            console.log("experience data",response);
            if(response.data.errnum===0){
                dispatch(addExperienceActionTpye(response.data.data))
                dispatch(setAlert('experience added','success'))
                history.push("/dashboard")
            }else{
                dispatch(setAlert(response.data.messages))
            }
 
        }catch(err){
            dispatch(getUserProfileFailed(err))
        }
    }
}

//add education
export const addEducation =(formData,history)=>{
    return async(dispatch)=>{
        try{
            const config={
                'Content-Type':'application/json'
            }
            const response=await axios.put("/api/profile/education",formData,config)
            console.log("experience data",response);
            if(response.data.errnum===0){
                dispatch(addEducationActionType(response.data.data))
                dispatch(setAlert('education added','success'))
                history.push("/dashboard")
            }else{
                dispatch(setAlert(response.data.messages))
            }
 
        }catch(err){
            dispatch(getUserProfileFailed(err))
        }
    }
}

//delete experience

export const deleteExperience=(id)=>{
    return async(dispatch)=>{
        try {
            const response=await axios.delete(`/api/profile/experience/${id}`);
            if(response.data.errnum===0){
                dispatch(deleteExperienceActionTpye(response.data.data))
                dispatch(setAlert('experience deleted','success'))
            }else{
                dispatch(setAlert(response.data.messages))
            }
        } catch (err) {
            dispatch(getUserProfileFailed(err))
        }
    }
}


//delete education

export const deleteEducation=(id)=>{
    return async(dispatch)=>{
        try {
            const response=await axios.delete(`/api/profile/education/${id}`);
            if(response.data.errnum===0){
                dispatch(deleteEducationActionType(response.data.data))
                dispatch(setAlert('education deleted','success'))
            }else{
                dispatch(setAlert(response.data.messages))
            }
        } catch (err) {
            dispatch(getUserProfileFailed(err))
        }
    }
}


//delete account and profile
export const deleteAccount=(id)=>{
    if(window.confirm("are you sure? this can not be undone!!")){
        return async(dispatch)=>{
            try {
                const response=await axios.delete("/api/delete_account");
                if(response.data.errnum===0){
                    dispatch(clearProfile())
                    dispatch(deleteAccountActionType(response.data.data))
                    dispatch(setAlert('account has been deleted'))
                }else{
                    dispatch(setAlert(response.data.messages))
                }
            } catch (err) {
                dispatch(getUserProfileFailed(err))
            }
        }
    }
}