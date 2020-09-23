import React,{Fragment}from 'react'
import loadingPic from "../../img/loading.gif"

function Loading() {
    return (
        <Fragment>
            <img src={loadingPic} alt="loading..." style={{width:'200px',margin:'auto',display:'block'}}/>
        </Fragment>
    )
}

export default Loading
