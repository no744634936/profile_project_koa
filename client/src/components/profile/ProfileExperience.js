import React,{Fragment}from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment"

const ProfileExperience = ({profile}) => {

    return (
        
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {
                profile.experience.length>0 ? (
                    <Fragment>
                        {
                            profile.experience.map(e=>{
                                return(
                                    <div key={e._id}>
                                        <h3>{e.company}</h3>
                                        <p><Moment format="YYYY/MM/DD">{e.from}</Moment>-{!e.to ? "Now":(<Moment format="YYYY/MM/DD">{e.to}</Moment>)}</p>
                                        <p><strong>Postion:</strong>{e.title}</p>
                                        <p><strong>Description:</strong>{e.description}</p>
                                    </div>

                                )
                            })
                        }
                    </Fragment>
                ):(<h4>No experience credential</h4>)
            }
        </div>
    )
}

ProfileExperience.propTypes = {

}

export default ProfileExperience
