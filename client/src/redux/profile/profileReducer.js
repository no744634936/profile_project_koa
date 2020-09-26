import { GET_PROFILE,GET_PROFILE_FAILED,
         CLEAR_PROFILE_DATA,
         Add_EXPERIENCE,
         Add_Education,
         DELETE_EXPERIENCE,
         DELETE_EDUCATION,
         GET_ALL_PROFILES,
         GET_REPOS} from "./profileTypes";

const initialState={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{},
}


const profileReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_PROFILE:
            return{
                ...state,
                profile:action.payload,
                loading: false,

            }
        case GET_PROFILE_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        case Add_EXPERIENCE:
        case Add_Education:
        case DELETE_EXPERIENCE:
        case DELETE_EDUCATION:
            return{
                ...state,
                profile:action.payload,
                loading: false,
            }
        case CLEAR_PROFILE_DATA:
            return{
                profile:null,
                profiles:[],
                repos:[],
                loading:false,
                error:{},
            }
        case GET_ALL_PROFILES:
            return{
                ...state,
                profiles:action.payload,
                loading:false,
            }
        case GET_REPOS:
            return{
                ...state,
                repos:action.payload,
                loading:false,
            }
        default:
            return state 
    }
}

export default  profileReducer