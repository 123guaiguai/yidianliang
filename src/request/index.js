import axios from "axios"
import {getLocalStorage} from "../utils/localStorageExceed"
let service=axios.create({
    baseURL:'/api',//后面填上后端根地址
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"//定义传输的是json文件
    }
})
service.interceptors.request.use((config)=>{
    config.headers=config.headers||{};
    let token=getLocalStorage('AccessToken',true)||"";
    if(token){
        config.headers.token=token//本地token存在，则携带在请求头
    }
    return config
})
service.interceptors.response.use((res)=>{
    const code=res.data.code
    if(code!==1){//响应体中的code不是1，错误
        console.log("请求失败！");
        return Promise.reject(res.data)
    }
    return res.data.data
},(err)=>{
    console.log(err);
})
export default service