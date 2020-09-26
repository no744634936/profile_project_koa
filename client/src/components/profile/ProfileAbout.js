import React, { Fragment } from 'react'

const ProfileAbout = props => {

    const {bio,skills,userId:{name}}=props.profile
    
    return (
        <div className="profile-about bg-light p-2">
            {
                bio&&(
                    <Fragment>
                        <h2 className="text-primary">{name}'s Bio</h2>
                        <p>
                            {bio}
                        </p>
                        <div className="line"></div>
                    </Fragment>
                )
            }
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
            {
                skills.map((skill,index)=>{
                    return(
                    <div key={index} className="p-1">
                        <i className="fa fa-check">{skill}</i> 
                    </div>
                    )
                })
            }
        </div>
        </div>
        
    )
}


export default ProfileAbout
