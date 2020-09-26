import React,{Fragment,useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Loading from "../layout/Loading.js"
import {getAllProfiles} from "../../redux/profile/profileAction.js"
import ProfileItem from "./ProfileItem.js"


const Profiles = ({getAllProfiles,profileData}) => {
    const {profiles,loading} =profileData
    useEffect(()=>{
        getAllProfiles();
    },[getAllProfiles]);  //不加[getAllProfiles] 就会显示缺乏dependency

    return (

        <div style={{marginTop:"100px"}}>
            {
                loading ? (<Loading></Loading>) :(
                    <Fragment>
                        <h1 className="large text-primary">Developers</h1>
                        <p className="lead">browse and connect with developer</p>
                        <div className="profiles">
                            {
                                profiles.length>0 ? (
                                    profiles.map(profile=>
                                        <ProfileItem key={profile._id} profile={profile}/>
                                    )
                                ):(<h4>No profiles found...</h4>)
                            }
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}

Profiles.propTypes = {
    getAllProfiles:PropTypes.func.isRequired,
    profileData:PropTypes.object.isRequired,
}

const mapStateToProps=(state)=>{
    return{
        profileData:state.profileData,
    }
}
export default connect(mapStateToProps,{getAllProfiles})(Profiles)
