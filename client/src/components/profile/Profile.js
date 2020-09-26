import React,{Fragment,useEffect}from 'react'
import PropTypes from 'prop-types'
import Loading from "../layout/Loading.js"
import {connect} from "react-redux"
import {getProfileById} from "../../redux/profile/profileAction.js"
import { Link } from 'react-router-dom'

import ProfileTop from "./ProfileTop.js"
import ProfileAbout from "./ProfileAbout.js"
import ProfileExperience from "./ProfileExperience.js"
import ProfileEducation from "./ProfileEducation.js"
import ProfileGithub from "./ProfileGithub.js"

const Profile = ({getProfileById,match,profileData,loginData}) => {
    const {loading,profile}=profileData
    console.log(profile);
   // console.log(profile.company);  这样写会报错，可以访问profile 但是不能访问profile company。必须加一个判断
    if(profile !==null){
        console.log(profile.company);
    }


    useEffect(()=>{
        // console.log(match);
        // console.log(match.params.userId); 
        //react 获取url中的参数 match.params.id
        getProfileById(match.params.userId)
    },[getProfileById,match.params.userId])
    return (
        <div style={{marginTop:"100px"}}>
            {
                profile ===null||loading? (<Loading/>):
                (<Fragment>
                    <Link to="/profiles" className="btn btn-light"> Back to profiles</Link>
                    {
                        
                        //如果查看的profile是自己的profile就额外显示一个edit profile 这个按钮
                        (loginData.isAuthenticated && loginData.loading===false&&loginData.user_data.userid===match.params.userId) ? 
                        (<Link to="/edit-profile" className="btn btn-dark">Edit profile</Link>):null
                    }
                    <div className="profile-grid my-1">
                <p>{profile.github_user_name}</p>
                        <ProfileTop profile={profile}></ProfileTop>
                        <ProfileAbout profile={profile}></ProfileAbout>
                        <ProfileExperience profile={profile}></ProfileExperience>
                        <ProfileEducation profile={profile}></ProfileEducation>
                        <ProfileGithub profile={profile}></ProfileGithub>
                        {
                            profile.github_user_name===""? null:<ProfileGithub profile={profile}></ProfileGithub>
                        }

                    </div>
                </Fragment>)
            }
        </div>
    )
}

Profile.propTypes = {
    profileData:PropTypes.object.isRequired,
}

const mapStateToProps=(state)=>{
    return{
        profileData:state.profileData,
        loginData:state.loginData
    }
}

export default connect(mapStateToProps,{getProfileById})(Profile)
