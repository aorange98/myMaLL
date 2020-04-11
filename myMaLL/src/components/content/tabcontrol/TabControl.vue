<template>
<ul class="tab-control">
    <li 
        @click="handleClick(index)" 
        v-for="(item,index) in titles" :key="index" 
        :class="{active:currentIndex===index}">
        <span>{{item}}</span>
    </li>
</ul>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        // prop验证要求 对象或数组作为默认值必须是函数的形式
        // typeList: {
        //     type: Array,
        //     default: function() {
        //         return []; // 如果没有传递那么就返回一个数组
        //     }
        // },
        titles: {   
            type: Array,
            default(){
                return []; 
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        };
    },
    methods: {
        handleClick(index) {
            // 把点前点击的index赋值给currentIndex 用来设置类名
            this.currentIndex = index

            // 告诉父组件 点击了哪个li 子组件把数据传给父组件(home组件)
            this.$emit('tabClick',index)
        }
    }
};
/** 
 * 根据传递过来的['pop','new','sell'] 来遍历的
 * 
 * 重点
 * 1.类名绑定：currentIndex===index 若判断为true，那么就绑定 
 * 
 * 2.当我随便点击pop/new/sell的时候，那么就会显示不同的数据 在这使用事件车 发射一个事件
 * 
 * 3. 多个组件中使用这个东西，但是文字却不一样 那么可以使用数组的方式遍历 至于值那么就是在使用该组件
 *    的时候传递的.       不嫌麻烦也可以使用插槽   
 */
</script>

<style lang='less' scoped>
// 引入主题颜色
@import "~assets/css/varible.less";
.tab-control {
    position: relative; 
    z-index: 1;
    background-color: #fff; 
    // 以上解决再次使用这个组件层级关系
    display: flex;
    text-align: center;
    line-height: 40px;
    li {
        flex: 1;
    }
    .active {
        span {
            padding: 5px;
            color: @hightTextColor;
            border-bottom: 3px solid @hightTextColor;
        }
    }
}
</style>
