import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载 异步
const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')
const Market = () => import('views/market/Market.vue')
const Detail = () => import('views/detail/Detail.vue')
const Login = () => import('views/profile/base/ProfileLogin.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { index: 0 }
  },
  {
    path: '/category',
    component: Category,
    meta: { index: 1 }
  },
  {
    path: '/market',
    component: Market,
    meta: { index: 2 , requireAuth:true }
    //  通过添加requireAuth:true来表示market组件需要进行权限验证
    //  验证规则是 如果购物车中有数据 那就可以访问market组件 即通过验证
    //  如果购物车中没有数据 那就不可以访问market组件 即没通过验证
  },
  {
    path: '/profile',
    component: Profile,
    meta: { index: 3 },
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: { index: 4 }  // 控制detail的方向 比home大就行了
  },
  {
    path:'/login',
    component:Login,
    meta: { index: 5 }
  }
]

// 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，
// 此时导航在所有守卫 resolve 完之前一直处于 等待中。


const router = new VueRouter({
  mode: 'history',
  routes
})



router.beforeEach((to, from, next)=>{
  // console.log(to,from)
  if(to.meta.requireAuth){ // 如果访问的路由中requireAuth:true，那么就需要验证  
    if(localStorage.getItem('products')){
      next()
    }else{
      next('/home') // 跳到首页
      alert('先去购物吧~')
    }
  }else{  // 否则放行
    next()
  }
})




export default router
