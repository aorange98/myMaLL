import Toast from './Toast.vue'

// 把Toast组件注册到Vue的原型上  让每一个组件都可以使用Toast上的属性和方法
// 因为任何一个组件都继承了vue的原型
// console.log(Toast)
const ToastPlugin = {
    install(Vue){
        // 生成组件构造器
        const ToastConstructor = Vue.extend(Toast)
        // console.log(ToastConstructor)  // 大写开头是构造函数
        // 生成组件的实例化对象
        const toast = new ToastConstructor()
        // console.log(toast)  // 和真正组件有点区别，没有$el
        // 把组件的实例化对象和一个dom节点关联
        toast.$mount(document.createElement('div'))
        //把Toast组件的根节点挂载到body上
        document.body.appendChild(toast.$el)
        // 把Toast注册到vue的原型上
        Vue.prototype.$toast = toast 
    }
}

export default ToastPlugin