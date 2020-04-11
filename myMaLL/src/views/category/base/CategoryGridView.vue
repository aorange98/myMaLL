<template>
    <div class='category-grid-view'>
        <ul>
            <li v-for="(item,index) in subcategory" :key="index" :style="styleObj">
                <img :src="item.image" alt="" class="img">
                <div>{{item.title}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CategoryGridView',
    data() {
        return {}
    },
    props:{
        subcategory:{
            type:Array,
            default(){
                return []
            }
        },
        cols:{
            type:Number,
            default:2
        }
    },
    computed: {
        styleObj(){
            return {
                width:`${100/this.cols}%`
            }
        }
    }
}
</script>

<style lang='less' scoped>
.category-grid-view{
    ul{
        display: flex;
        flex-wrap: wrap;
        padding: 5px 5px 0 5px;
        text-align: center;
        li{
            width: 25%;
            height: 90px;
            font-size: 12px;
        }
    }
    .img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}



</style>
