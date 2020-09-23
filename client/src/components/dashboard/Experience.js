import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Moment from "react-moment"
import {deleteExperience} from "../../redux/profile/profileAction.js"


const Experience = (props) => {
    console.log(props);
    const experience_items =props.experience.map(e=>{
        return(
            <tr key={e._id}>
                <td>{e.company}</td>
                <td>{e.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{e.from}</Moment>--{
                        e.to==="" ? "now" :(<Moment format="YYYY/MM/DD">{e.to}</Moment>)
                    }
                </td>
                <td>
                    <button onClick={()=>props.deleteExperience(e._id)} className="btn btn-danger">delete</button>
                </td>
            </tr>
        )
    })
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {experience_items}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,
}

export default connect(null,{deleteExperience})(Experience)
