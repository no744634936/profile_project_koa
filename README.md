首先想好表的格式、然后根据表的格式来写api接口


{
    "_id": {
        "$oid": "5f4b3239993cee0a9c114b6a"
    },
    "skills": [
        "123",
        "mmm",
        "bbbb"
    ],
    "Date": {
        "$date": {
            "$numberLong": "1598763558869"
        }
    },
    "is_deleted": {
        "$numberInt": "0"
    },
    "userId": "5f47be73a3d2e9418cd3a81f",
    "handle": "12",
    "company": "google",
    "website": "htttps://www.baidu.com",
    "location": "wewewew",
    "status": "working,GOOD,KKKKKK",
    "bio": "",
    "github_user_name": "",
    "social": {
        "wechat": "s1610231",
        "QQ": "744634936",
        "facebook": "facebol",
        "line": "rrrrrrr,llllll"
    },
    "experience": [
        {
            "current": true,
            "_id": {
                "$oid": "5f4b3243993cee0a9c114b6b"
            },
            "title": "SE",
            "company": "rentracks",
            "location": "tokyo",
            "from": "2019",
            "to": "",
            "description": "test"
        },
        {
            "current": true,
            "_id": {
                "$oid": "5f4b38abf666e010c8df3dff"
            },
            "title": "SE",
            "location": "tokyo",
            "from": "2019",
            "to": "",
            "description": "test"
        }
    ],
    "education": [
        {
            "current": true,
            "_id": {
                "$oid": "5f4b41a36a58cf054c2ac8fe"
            },
            "school": "jaist",
            "degree": "123",
            "field_of_study": "english",
            "from": "2112",
            "to": "",
            "description": "daeadadadad"
        },
        {
            "current": true,
            "_id": {
                "$oid": "5f4b43796a58cf054c2ac8ff"
            },
            "school": "jaist",
            "degree": "123",
            "field_of_study": "english",
            "from": "2112",
            "to": "",
            "description": "daeadadadad"
        }
    ],
    "__v": {
        "$numberInt": "14"
    }
}




增加和修改，显示profile

写了这几个个路由跟验证。没有写测试

router.post("/api/add/profile",passport.authenticate('jwt', { session: false }),validate_profile_info,profileController.add_or_edit_profile_info)
router.get("/api/profile/user/:userId",passport.authenticate('jwt', { session: false }),profileController.get_profile_info)
router.get("/api/all_profiles",passport.authenticate('jwt', { session: false }),profileController.get_all_profile)




添加工作经历，教育经历

router.put("/api/profile/experience",passport.authenticate('jwt', { session: false }),profileController.experience_handle)

router.put("/api/profile/education",passport.authenticate('jwt', { session: false }),profileController.education_handle)

删除
router.delete("/api/profile/experience/:expId",passport.authenticate('jwt', { session: false }),profileController.delete_experience)

router.delete("/api/profile/education/:eduId",passport.authenticate('jwt', { session: false }),profileController.delete_education)

router.delete("/api/delete_account",passport.authenticate('jwt', { session: false }),profileController.delete_account)




-------------------------------------------------------------------------------------------







------------------------------------------------------------------------------------------
ctx.params.userId; 因为有koa-router 可以这样使用来获取url中的userId参数

ctx.request.body   因为有koa-bodypaser 所以可以获取前端post 过来的数据

ctx.query.expId    是获取这样的路由  localhost:3000/api/profile/experience?expId=89hgaigha