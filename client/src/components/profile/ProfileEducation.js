import React,{Fragment}from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment"

const ProfileEducation = ({profile}) => {

    return (
        
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {
                profile.education.length>0 ? (
                    <Fragment>
                        {
                            profile.education.map(e=>{
                                return(
                                    <div key={e._id}>
                                        <h3>{e.school}</h3>
                                        <p><Moment format="YYYY/MM/DD">{e.from}</Moment>-{!e.to ? "Now":(<Moment format="YYYY/MM/DD">{e.to}</Moment>)}</p>
                                        <p><strong>Degree:</strong>{e.title}</p>
                                        <p><strong>field of study:</strong>{e.field_of_study}</p>
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

ProfileEducation.propTypes = {

}

export default ProfileEducation
