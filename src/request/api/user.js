import service from "../index.js"

export function login(data){//提交登陆表单，返回是否成功的code,AccessToken，以及用户的标识
    return service({
        url:"user/login",
        data:data,
        method:'POST'
    })
}

export function register(data){//提交注册表单
    return service({
        url:'user/register',
        data:data,
        method:'POST'
    })
}