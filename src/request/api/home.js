import service from "../index.js"

export function login(data){//提交登陆表单，返回是否成功的code,AccessToken，以及用户的标识
    return service({
        url:"/test03/users/login",
        data:data,
        method:'POST'
    })
}
export function register(data){//提交注册表单
    return service({
        url:'/test03/users/register',
        data:data,
        method:'POST'
    })
}
export function getHeartRate(data){//根据id得到心率数据
    return service({
        url:'test03/physiologys/getAll',
        data:data,
        method:'POST'
    })
}
export function getLast(data){//根据id得到运动数据和最近一次的生理数据
    return service({
        url:'test03/physiologys/getLast',
        data:data,
        method:'POST'
    })
}