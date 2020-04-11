import MyAxios from './myAxios'

let baseURL = 'http://106.54.54.237:8000/api/h3'

// // 请求home组件的轮播数据
// export const reqHomeMultidata = ()=>MyAxios('/home/multidata')

// // 请求home组件的goods数据  该接口接收的type的值  pop /  new / sell
// export const reqHomeGoods = (type,page)=>MyAxios('/home/data',{type,page})


// 请求home组件的轮播数据
export const reqHomeMultidata = ()=>MyAxios(`${baseURL}/home/multidata`)

// 请求home组件的goods数据  该接口接收的type的值  pop /  new / sell
export const reqHomeGoods = (type,page)=>MyAxios(`${baseURL}/home/data`,{type,page})


