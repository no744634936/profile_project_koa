import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Moment from "react-moment"
import {deleteEducation} from "../../redux/profile/profileAction.js"


const Education = (props) => {
    const education_items =props.education.map(e=>{
        return(
            <tr key={e._id}>
                <td>{e.school}</td>
                <td>{e.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{e.from}</Moment>--{
                        e.to==="" ? "now" :(<Moment format="YYYY/MM/DD">{e.to}</Moment>)
                    }
                </td>
                <td>
                    <button onClick={()=>props.deleteEducation(e._id)}className="btn btn-danger">delete</button>
                </td>
            </tr>
        )
    })
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">degree</th>
                        <th className="hide-sm">Years</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {education_items}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(Education)
