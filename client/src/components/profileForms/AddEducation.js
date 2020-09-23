import React,{useState} from 'react'
import {Link,withRouter} from "react-router-dom"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {addEducation} from "../../redux/profile/profileAction.js"

const AddEducation =({addEducation,history,}) => {

    const[formData,setFormData]=useState({
        school:"",
        degree:"",
        field_of_study:"",
        from:"",
        to:"",
        current:false,
        description:"",
    })

    const [toDateDisabled,toggleDisabled]=useState(false);
    const {school,degree,field_of_study,from,to,current,description} =formData;

    const changeValue=e=>setFormData({...formData,[e.target.name]:e.target.value});

    const sumbitValues=e=>{
        e.preventDefault();
        addEducation(formData,history,)
    }
    return (
        <div style={{marginTop:"100px"}}>
             <h1 className="large text-primary">
                Add your education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended.
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=>sumbitValues(e)}>
                <div className="form-group">
                <input type="text" placeholder="school or bootcamp" name="school" value={school} onChange={e=>changeValue(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* degree or certificate" name="degree" value={degree} onChange={e=>changeValue(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="field of study" name="field_of_study" value={field_of_study} onChange={e=>changeValue(e)} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e=>changeValue(e)} />
                </div>
                <div className="form-group">
                <p>
                    <input type="checkbox" name="current" checked={current} value={current} 
                    onChange={e=>{
                        setFormData({...formData,current:!current});
                        toggleDisabled(!toDateDisabled);
                    }}/> 
                    Current State
                </p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input 
                    type="date" 
                    name="to" 
                    value={to} 
                    onChange={e=>changeValue(e)} 
                    disabled={toDateDisabled ? "disabled" : ""}
                />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="program Description"
                    value={description} onChange={e=>changeValue(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(withRouter(AddEducation))
