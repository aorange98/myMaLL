<template>
    <div class='list-view'>
        <ul>
            <li v-for="(item,index) in listData" :key="index">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ListView',
    props: {
        listData: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {

    },
    methods: {

    }
}
</script>

<style lang='less' scoped>
.list-view {
    margin-top: 12px;
    font-size: 15px;
    ul{
        li{
            line-height: 45px;
            padding-left:25px;
            width: 100%;
            background-color: #fff;
            border-bottom: 1px solid#f2f2f2;
            box-sizing: border-box;
        } 
    }
}

</style>
