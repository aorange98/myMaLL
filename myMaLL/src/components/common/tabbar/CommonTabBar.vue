<template>
    <div class="tab-bar">

        <!-- 复用tab-bar-item同一个组件4次 但是他有插槽却内容又不一样 -->

        <common-tab-bar-item path='/home'>

            <!-- 使用插槽 v-slot:xxx  简写为#xxx 不点击显示这张图片 -->
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/home.svg" alt="">
            </template>
            <!-- 点击显示这张图片 -->
            <template v-slot:item-active-icon>
                <img src="~assets/img/tabbar/home_active.svg" alt="">
            </template>

            <template v-slot:item-msg>
                <p>首页</p>
            </template>
            
        </common-tab-bar-item>


        <common-tab-bar-item path='/category'>
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/category.svg" alt="">
            </template>

            <template v-slot:item-active-icon>
                <img src="~assets/img/tabbar/category_active.svg" alt="">
            </template>
            
            <template v-slot:item-msg>
                <p>分类</p>
            </template>
        </common-tab-bar-item>


        <common-tab-bar-item path='/market'>
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/shopcart.svg" alt="">
            </template>

            <template v-slot:item-active-icon>
                <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
            </template>

            <template v-slot:item-msg>
                <p>购物车</p>
            </template>
        </common-tab-bar-item>


        <common-tab-bar-item path='/profile'>
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/profile.svg" alt="">
            </template>

            <template v-slot:item-active-icon>
                <img src="~assets/img/tabbar/profile_active.svg" alt="">
            </template>

            <template v-slot:item-msg>
                <p>我的</p>
            </template>
        </common-tab-bar-item>

    </div>
</template>

<script>

// 引入底部的小方块组件
import CommonTabBarItem from './CommonTabBarItem'

export default {
    name: 'CommonTabBar',
    data: function() {	
        return {
            number:'我是tabbar的数据'
        }
    },
    components:{
        CommonTabBarItem
    }
}

/**
 * 将path传递给子组件用于跳转
 * tabBar 就是底部的组件  
 */

</script>

<style scoped lang="less">
    .tab-bar{
        display: flex;
        position:fixed;
        z-index: 1;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.3)
    }
</style>