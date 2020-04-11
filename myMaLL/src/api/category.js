import MyAxios from './myAxios'

let baseURL = 'http://106.54.54.237:8000/api/h3'

// // 请求detail组件的数据
// export const reqCategory = () => MyAxios('/category')

// export const reqSubcategory = maitKey => MyAxios('/subcategory', { maitKey })

// export const reqCategoryDetail = (miniWallkey, type) => MyAxios('/subcategory/detail', { miniWallkey, type })




// 请求detail组件的数据
export const reqCategory = () => MyAxios(`${baseURL}/category`)

export const reqSubcategory = maitKey => MyAxios(`${baseURL}/subcategory`, { maitKey })

export const reqCategoryDetail = (miniWallkey, type) => MyAxios(`${baseURL}/subcategory/detail`, { miniWallkey, type })