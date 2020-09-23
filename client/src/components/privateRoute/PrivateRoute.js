//私有路由是固定的写法，记下来就可以了，不用弄懂
//只要看 isAuthenticated 就可以了

import React from 'react'
import PropTypes from 'prop-types'
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"

function PrivateRoute({component:Component,isAuthenticated,...rest}) {
    console.log("private route",isAuthenticated);
    return (
        <Route {...rest} render={props=> isAuthenticated ? (<Component {...props} />):(<Redirect to="/login"/>)}/>
    )
}

PrivateRoute.propTypes = {
    isAuthenticated:PropTypes.bool.isRequired,
}

const mapStatetoProps=(state)=>{
    return{
        isAuthenticated:state.loginData.isAuthenticated
    }
}


export default connect(mapStatetoProps)(PrivateRoute)

