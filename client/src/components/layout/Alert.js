//使用rfcp 快捷键。

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"

function Alert(props) {
    return (
        <div>
            {
                props.alerts!==null && props.alerts.length>0? (
                    props.alerts.map(alert=>{
                        return (
                            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                                {alert.message}
                            </div>
                        )
                    })
                ):null
            }
        </div>
    )
}

Alert.propTypes = {
    alerts:PropTypes.array.isRequired
}

const mapStatetoProps=(state)=>{
    return{
        alerts:state.alert  //root reducer 里面的state.alert
    }
}
export default connect(mapStatetoProps)(Alert)

