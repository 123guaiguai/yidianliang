import service from "../index.js"

export function getUserInfo(){//获取用户信息
    return service({
        url:'user/getUser',
        method:'GET'
    })
}

export function updateUserInfo(data){//修改用户信息
    return service({
        url:"user/update",
        method:'PUT',
        data
    })
}

export function updatePassword(oldVal,newVal){//修改用户密码
    return service({
        url:'user/updatePassword',
        method:'PUT',
        params:{
            oldPassword:oldVal,
            newPassword:newVal
        }
    })
}

export function getUserAvatar(name){//获取用户头像
    return service({
        url:'common/download',
        method:'GET',
        params:{
            name:name
        }
    })
}

export function uploadAvatar(data){//上传用户头像
    return service({
        url:'common/upload',
        method:'POST',
        headers:{
            'Content-Type':'multipart/form-data'
        },
        data
    })
}