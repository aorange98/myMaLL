/*
 * 封装axios请求的格式，统一 get 和post的请求格式
 * 
 * baseURL:'http://123.207.32.32:8000/api/h3',  
 * baseURL:'http://106.54.54.237:8000/api/h3',
 * baseURL:'http://152.136.185.210:8000/api/h3',
 * 
 */


import axios from 'axios'
// axios.defaults.baseURL = 'http://106.54.54.237:8000/api/h3'

// 设置axios响应数据的统一格式
axios.interceptors.response.use(res=>res.data)

//暴露一个名字是MyAxios的函数
export default function MyAxios(url, data = {}, method = 'get') {   //默认值get，{}
    //url请求的地址
    //data 请求时发送的数据
    //method 请求的方式

    // return 一个让外部使用
    return new Promise(resolve=>{
        let p = null    // 定义一个p来接收返回的结果

        if (method === 'get') { //如果请求是get方式
            p = axios.get(url, {
                params:data
            })
        } else {
            p = axios.post(url, data)
        }

        //得到数据就会触发p的then函数
        p.then(res=>{
            resolve(res)
        })
    })

}


