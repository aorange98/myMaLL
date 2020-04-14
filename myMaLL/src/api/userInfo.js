// import axios from 'axios'
import MyAxios from './myAxios'

// 请求登录的接口函数
export const reqLogin = (userInfo)=>MyAxios(`/myapi/login`,userInfo,'post')
