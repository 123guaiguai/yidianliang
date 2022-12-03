export function setLocalStorage(key,token,id,type){//设置能过期的localStorage,里面有用户的id和token
    const storageData={
        token:token,
        id:id,
        type:type,
        date:new Date().getTime()
    }
    localStorage.setItem(key,JSON.stringify(storageData))
}
export function getLocalStorage(key){//取出localStore,如未过期，返回id和token,否则返回null
    if(!localStorage.getItem(key)){
        return null;
    }
    const data=JSON.parse(localStorage.getItem(key))
    const now=(new Date().getTime())/1000//现在的时间戳，单位为秒
    if((data.date)/1000+7*24*3600<now){//token设置七天过期
        localStorage.removeItem(key)//清除过期token
        return null;
    }
    else{
        return {
            token:data.token,
            userId:data.id,
            userType:data.type,
        }
    }
}