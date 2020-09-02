
const server=require("./server.js")

//用户民信息
let name=`u_test_${Date.now()}`
let password=`p_test${Date.now()}`
let email=`${Date.now()}@gmail.com`
let testUser={
    name,
    password,
    email,
}



//测试注册功能，
test("注册一个用户应该成功",async ()=>{
    let response=await server.post("/api/user/register").send(testUser);
    expect(response.body.errnum).toBe(0);
})

//测试重复注册功能，即email时不能注册
test("重复注册用户因该失败",async()=>{
    let response=await server.post("/api/user/register").send(testUser)
    expect(response.body.errnum).not.toBe(0)
})


//注册数据格式验证
test("json schema 检测，非法的格式，注册因该失败",async()=>{
    let response=await server
        .post("/api/user/register")
        .send({
            name:"123",   //用户名不是以字母或下划线开头
            password:"a",     //最小长度不是3
            email:"male"    //不是email
        })
    expect(response.body.errnum).not.toBe(0)
})