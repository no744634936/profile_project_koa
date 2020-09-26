import React,{Fragment,useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {getGithubRepos} from "../../redux/profile/profileAction.js"
import Loading from "../layout/Loading.js"  //因为要获取数据所以要使用 转圈圈这个图像。

const ProfileGithub = ({profile,getGithubRepos,repos}) => {
    useEffect(()=>{
        console.log("github userName",profile.github_user_name);
        getGithubRepos(profile.github_user_name)
    },[getGithubRepos,profile.github_user_name])   //数组里的dependency不能写成一个方法 getGithubRepos(profile.github_user_name)

    return (
        
        <div className="profile-github">
            <h2 className="text-primary my-1">github repos</h2>
            {
                repos.length>0 && profile.laoding?(<Loading></Loading>) :(
                    repos.map(e=>{
                        return(
                            <div key={e.id} className="repo bg-white p-1 my-1">
                                {/* 外部链接要用a tag */}
                                <div>
                                    <h4><a href={e.html_url} target="_blank">{e.name}</a></h4>
                                    <p>{e.description}</p>
                                </div>
                                <div>
                                    <ul>
                                        <li className="badge badge-primary">
                                            Stars:{e.stargazers_count}
                                        </li>
                                        <li className="badge badge-dark">
                                            Watchers:{e.watchers_count}
                                        </li>
                                        <li className="badge badge-light">
                                            Forks:{e.forks}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

ProfileGithub.propTypes = {
    repos:PropTypes.array.isRequired,  //ptar
    getGithubRepos:PropTypes.func.isRequired,//ptfr
    profile:PropTypes.object.isRequired,  //ptor
}

const mapStateToProps=(state)=>{
    return{
        repos:state.profileData.repos
    }
}

export default connect(mapStateToProps,{getGithubRepos})(ProfileGithub)
