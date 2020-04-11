import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 让components/common/index文件执行 
import './components/common/index'

// 全局引入awesome-swiper 轮播插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  // error:'./static/error.png',
  loading:require('assets/img/common/placeholder.png'), //配置占位图片 需要的是base64字符串位格式即可
  // attempt: 1
})


// base 64位字符串 是使用了webpack的loader打包了 webpack支持esModule/commmJS规范的导入导出
// console.log(require('assets/img/common/placeholder.png'))
// import xxx from 'assets/img/common/placeholder.png'
// console.log(xxx)

// 自己的插件
import ToastPlugin from  './plugins/toast/index'
Vue.use(ToastPlugin)


// 把vue实例放在Vue的显示原型中
Vue.prototype.$eventBus = new Vue()


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


/* 
* 文件夹的分配
* components
*   common  放置适用性很高的组件 不局限当前的项目
*   content 放置适用当前项目的组件
*
*
* 如果NavBar组件是全局组件  可以少做两件事情
*   1.不在Home组件中导入
*   2.不在Home组件中注册
*
* 
*
* */
