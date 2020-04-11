// import axios from 'axios'
import MyAxios from './myAxios'

// let baseURL = 'http://localhost:8592'

// 请求登录的接口函数
export const reqLogin = (userInfo)=>MyAxios(`/myapi/login`,userInfo,'post')
