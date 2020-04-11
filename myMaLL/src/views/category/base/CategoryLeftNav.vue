<template>
    <div class="category-left-nav">
        <ul class="menu-list">
            <li v-for="(item,index) in categorys" class="menu-list-item" 
                :key="index" @click="handleClick(index)"
                :class="{'active':currentIndex===index}"
                >
                {{item.title}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CategoryLeftNav",
    data() {
        return {
            currentIndex:0  //初始的时候  索引0的li被选中
        };
    },
    props: {
        categorys:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods: {
        handleClick(index){
            // console.log(index,6666666666)
            // 点击添加对应的类名
            this.currentIndex = index
            // 并且发射一个事件 传递点击的索引值
            this.$emit('itemClick',index)
        }
    }
};
/**
 * 接收父组件传递的数组来遍历左边的列表渲染
 * 点击li那么就会加上对应的类名   
 * 步骤1: :class="{'active':currentIndex===index}"  
 * 步骤2： this.currentIndex = index
 * 
 * 
 */
</script>


<style lang='less' scoped>
@import '~assets/css/varible.less';
.category-left-nav {
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    .menu-list-item{
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
    }
    .active{
        background-color: #fff;
        font-weight: 700;
        color: @hightTextColor;
        border-left: 3px solid @hightTextColor;
    }
}
</style>
