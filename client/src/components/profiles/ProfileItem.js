import React from 'react'
import {Link} from "react-router-dom"


const ProfileItem = ({profile:{
    userId:{_id,name,avatar},
    status,
    company,
    location,
    skills
}}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span> } </p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/user/profile/${_id}`}> view profile</Link>
            </div>
            <ul>
                {
                    skills.slice(0,4).map((skill,index)=>{
                        return(
                            <li key={index} className="text-primary">
                                <i className="fas fa-check"></i>{skill}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


export default ProfileItem
