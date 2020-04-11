<template>
    <div class='tab-bar-item' @click="handleClick">
        <!-- 图片的插槽 -->
        <div v-show="isShow">  
            <slot name="item-icon"></slot>
        </div>
        <!-- 点击后图片变化的插槽 -->
        <div v-show="!isShow">   
            <slot name="item-active-icon"></slot>
        </div>
        <div :style="color_active">
            <!-- 文字的插槽 -->
            <slot name="item-msg"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonTabBarItem',
    //props:['path'], // 使用props接收传递过来的数据 数据已经被挂载到实例化对象上
    props:{
        path:{
            type:String,
            required:true  // 必传
        },
        color:{
            type:String,
            default:'#faa015' // 不传递使用默认值
        }
    },
    methods:{
        handleClick(){
            // 使用js的方法跳转页面
            // this.$router.push(this.$props.path)  
            this.$router.push(this.path);
        },
    },
    computed:{     // 计算属性
        isShow(){   // 简写
            return this.$route.path !== this.path   // 不相等就返回false
        },
        color_active(){
            return !this.isShow?{color:this.color}:{}
        }
    }

}

/**
 * 1.给div绑定点击事件 是他点击的时候跳转到指定的页面 
 * 2.点击底部图片就会切换为另外一张图片 使用v-fi指令 根据的是$router.path与传递的props比较
 * 如果一致那么就切换图片，并使用计算属性计算
 * 
 * 3.点击文字颜色也要发生改变 注意：使用插槽他会把template中的内容直接替换掉<slot>标签 
 * 所以给slot标签绑定类名或者绑定事件是不生效的 他是会直接替换的 那么就没有类名了
 * 
 * 解决办法：给槽套上一个div 那么就给div绑定类名或者事件，那么替换的也是替换div里面的内容，不会影响到外层div,
 * 使用的是样式继承的方式来实现给插入到槽中的数据自动继承了div的样式，类名是会被继承的 样式生效  
 * 文字的颜色使用动态的方式  由tabBar以属性的方式传递过来的 不传默认值生效
 * 
 * 以后使用插槽建议外面使用div包裹着
 * 
 * 优化:将v-if 换成v-show  那么就可以不重复创建节点 提高性能
 * 
 * 由tabbaritem 和 tabbar组成的组件可以在任何的移动端使用 因为肯定是有导航栏的
 * 在模板中加上： 禁止用户缩放
 * <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
 */

</script>

<style scoped lang="less">
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 48px;
        img {
            width: 24px;
            height: 24px;
            margin-top: 3px;
            vertical-align: middle;
        }
    }

</style>