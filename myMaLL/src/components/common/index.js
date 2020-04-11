import Vue from 'vue'

// 其组件目录的相对路径 是否递归查询其子目录 匹配基础组件文件名的正则表达式
const requireComponent = require.context('./',true,/\.vue$/)

requireComponent.keys().forEach(fileName=>{
    const componentConfig = requireComponent(fileName)
    // 得到的结果就是vue组件 因为是使用webpack构建的
    // console.log(componentConfig)

    // 全局注册组件 组件名和组件default对象
    Vue.component(componentConfig.default.name,componentConfig.default)
})




/**
 * require.context 该函数可以循环递归指定目录里面的指定后缀名的文件
 * 基础组件的自动化全局注册 注册这些非常通用的基础组件
 * 在main.js中引入
 */