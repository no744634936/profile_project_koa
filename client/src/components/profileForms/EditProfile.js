import React,{Fragment, useState,useEffect} from 'react'
import {Link,withRouter} from "react-router-dom"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {createProfile,getCurrentUserProfile} from "../../redux/profile/profileAction.js"

//history 包含在withRouter里面
const EditProfile = ({
    createProfile,
    getCurrentUserProfile,
    history,
    profileData:{profile,loading},
    userData:{userid}
}) => {
    const [formData,serFormData]=useState({
        company:"",
        website:"",
        location:"",
        status:"",
        skills:"",
        github_user_name:"",
        bio:"",
        twitter:"",
        facebook:"",
        linkedin:"",
        youtube:"",
        instagram:"",
    })
    const {
        company,
        website,
        location,
        status,
        skills,
        github_user_name,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData

    ////为了实现这个功能 onClick={()=>toggleSocialInputs(!displaySocialInputs)},点击按钮才可以显示socialinput
    const [displaySocialInputs,toggleSocialInputs]=useState(false) 

    useEffect(()=>{
        //从dashboard页面跳到编辑页面，state里面的profile数据会丢失，所以要重新获取一次。
        getCurrentUserProfile(userid);

        serFormData({
            company: loading||!profile.company ? '' : profile.company,
            website: loading||!profile.website ? '' : profile.website,
            location: loading||!profile.location ? '' : profile.location,
            status: loading||!profile.status ? '' : profile.status,
            skills: loading||!profile.skills ? '' : profile.skills.join(","),
            github_user_name: loading||!profile.github_user_name ? '' : profile.github_user_name,
            bio: loading||!profile.bio ? '' : profile.bio,
            twitter: loading||!profile.social.twitter ? '' : profile.social.twitter,
            facebook: loading||!profile.social.facebook ? '' : profile.social.facebook,
            linkedin: loading||!profile.social.linkedin ? '' : profile.social.linkedin,
            youtube: loading||!profile.social.youtube ? '' : profile.social.youtube,
            instagram: loading||!profile.social.instagram ? '' : profile.social.instagram,
            
        })

    },[loading,userid])

    const changeValue=(e)=>serFormData({...formData,[e.target.name]:e.target.value})


    const submitData=e=>{
        console.log(formData);
        e.preventDefault();
        createProfile(formData,history,true)
    }
    return (
        <div style={{marginTop:"100px"}}>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=>submitData(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e=>changeValue(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e=>changeValue(e)}/>
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e=>changeValue(e)}/>
                    <small className="form-text"
                        >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e=>changeValue(e)}/>
                    <small className="form-text"
                        >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e=>changeValue(e)}/>
                    <small className="form-text"
                        >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="github_user_name"     
                        value={github_user_name}
                        onChange={e=>changeValue(e)}
                    />
                    <small className="form-text"
                        >If you want your latest repos and a Github link, include your
                        username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>changeValue(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                    <button  onClick={()=>toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                    
                    {/* displaySocialInputs ? <Fragment>...</Fragment> :null */}
                    {/* 上面的代码就等同于下面这段代码 */}
                    {
                        displaySocialInputs &&
                        <Fragment>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>changeValue(e)}/>
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e=>changeValue(e)}/>
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e=>changeValue(e)}/>
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e=>changeValue(e)}/>
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e=>changeValue(e)}/>
                            </div>
                        </Fragment>
                    }
                
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </div>
    )
}

EditProfile.propTypes = {
    createProfile:PropTypes.func.isRequired,
    getCurrentUserProfile:PropTypes.func.isRequired,
    profileData:PropTypes.object.isRequired,
    userData:PropTypes.object.isRequired,
}

const mapStateToProps=(state)=>{
    return{
        profileData:state.profileData,
        userData:state.loginData.user_data
    }
}


export default connect(mapStateToProps,{createProfile,getCurrentUserProfile})(withRouter(EditProfile))
