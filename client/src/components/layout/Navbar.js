import React,{Fragment}from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {logoutAction} from "../../redux/authentication/authenticationAction.js"


// 相当于props.loginData.isAuthenticated
//props.loginData.user_data
//props.loginData.loading
//props.logoutAction
const Navbar=({loginData:{isAuthenticated,user_data,loading},logoutAction})=> {

    const authLinks=(
        <ul>
            <li><Link to="/profiles">profiles</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><a href="#!" onClick={logoutAction}>logout</a></li>
        </ul>
    )

    const guestLinks=(
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    console.log(loading);
    console.log(isAuthenticated);
    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                {
                    (<Fragment>
                            {isAuthenticated ? authLinks : guestLinks}
                    </Fragment>)
                }
            </nav>
        </div>
    )
}
Navbar.propTypes={
    logoutAction: PropTypes.func.isRequired,
    loginData: PropTypes.object.isRequired,
}
const mapStatetoProps=(state)=>{
    return{
        loginData:state.loginData
    }
}

export default  connect(mapStatetoProps,{logoutAction})(Navbar)