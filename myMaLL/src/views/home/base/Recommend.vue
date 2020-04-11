<template>
    <ul class="recommend">
        <li v-for="item in recommend" :key="item.acm">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Recommend",
    props: {
        recommend: {
            type: Array,
            default: function() {
                return []; // 如果没有传递那么就返回一个数组
            }
        }
    }
};
</script>

<style lang='less' scoped>
    .recommend{
        display: flex;
        font-size: 12px;
        padding: 15px 0 30%;
        height: 0px;
        text-align: center;
        border-bottom: 8px solid #eee;
        li{
            flex: 1;    // 自动铺满
        }
        img{
            width: 80%
        }
        p{
            padding-top:10px;
        }
    }
</style>
