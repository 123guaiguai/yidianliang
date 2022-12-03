import axios from "axios"
let service=axios.create({
    baseURL:'/api',//后面填上后端根地址
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"//定义传输的是json文件
    }
})
service.interceptors.request.use((config)=>{
    config.headers=config.headers||{}
    if(localStorage.getItem('AccessToken')){
        config.headers.token=localStorage.getItem('AccessToken')||""//本地token存在，则携带在请求头
    }
    return config
})
// service.interceptors.response.use((res)=>{
//     const status=res.status
//     if(status!==200){//响应体中的status不是200，错误
//         return Promise.reject(res.data)
//     }
//     return res.data
// },(err)=>{
//     console.log(err);
// })
export default service