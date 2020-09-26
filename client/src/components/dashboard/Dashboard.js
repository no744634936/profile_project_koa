import React, {useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {getCurrentUserProfile} from "../../redux//profile/profileAction"
import Loading from "../layout/Loading.js"
import {Link} from "react-router-dom"
import DashboardButton from "./DashboardButton.js"
import Experience from "./Experience";
import Education from "./Education";
import {deleteAccount} from "../../redux//authentication//authenticationAction.js"


function Dashboard({getCurrentUserProfile,profileData,userData:{username,userid},deleteAccount}) {

    // console.log("userData",userData);
    //有props 的时候不用直接在useEffect里面使用props，要解构之后iu将必要的元素放进useEffect函数里面
    useEffect(()=>{
        getCurrentUserProfile(userid);
    },[getCurrentUserProfile,userid])


    return profileData.loading && profileData.profile ===null ? <Loading/>:
    (
        <div className="content" style={{marginTop:"100px"}}>
            <h1>Dashboard</h1>
            {/* 如果username存在就显示username */}
            <p>welcome----{username && username}</p>
            {
                profileData.profile!==null ? (
                <Fragment>
                    <DashboardButton/>
                    <Experience experience={profileData.profile.experience}/>
                    <Education education={profileData.profile.education}/>
                    <div className="my-2">
                        <button onClick={()=>{deleteAccount()}} className="btn btn-danger">delete my account</button>
                    </div>
                </Fragment>
                ) : (
                <Fragment>
                    <p>you have not yet setup a profile, please add some info</p>
                    <Link to="create-profile">Create profile</Link>
                </Fragment>
                )
            }
        </div>
    )

}

Dashboard.propTypes = {
    getCurrentUserProfile:PropTypes.func.isRequired,
    isAuthencated: PropTypes.bool.isRequired,
    profileData:PropTypes.object.isRequired,
    userData:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired,
}

const mapStateToProps=(state)=>{
    return{
        isAuthencated:state.loginData.isAuthenticated,
        profileData:state.profileData,
        userData:state.loginData.user_data
    }
}

export default connect(mapStateToProps,{getCurrentUserProfile,deleteAccount})(Dashboard)

