<template>
    <div class="detail-params" v-if="Object.keys(paramsInfo).length">
        <!-- <p>{{paramsInfo.rule.key}}</p> -->
        <!-- tr 列    td 行(主要看这个) -->
        <table v-for="(table, index) in paramsInfo.rule.tables" :key="index">
            <tr v-for="(tr, indey) in table" :key="indey">
                <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
            </tr>
        </table>

        <table>
            <tr v-for="(info, index) in paramsInfo.info.set" :key="index">
                <td class="info-param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="images">
            <img :src="paramsInfo.info.images[0]" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailParams",
    props:{
        paramsInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        images(){
            // ''  转换为布尔值的时候是false
            return this.paramsInfo.info.images ? info.images[0] : '';
        }
        
    },
    methods: {}
};

/**
 * v-if="Object.keys(paramsInfo).length!==0" 解决数据还么获取到而渲染数据导致报错
 * 
 * 表格的尺寸数据是根据paramsInfo.rule.tables来呈现
 * 表格的商品信息数据是根据paramsInfo.info.set来呈现
 * 
 *  // 注: images可能没有值(某些商品有值, 某些没有值)
 *   paramsInfo.info.images ? info.images[0] : '';
 * 
 * info.images ? info.images[0] : '';
 * 
 */
</script>

<style lang='less' scoped>
.detail-params{
    padding: 15px 10px;
    table{
        width: 100%;
        border-collapse: collapse;  //设置表格的边框是否被合并为一个单一的边框
        tr{
            height: 42px;
        }
        tr,td{
            border-bottom: 1px solid rgba(100, 100, 100, .1);
        }
        .info-param-key {
            /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
            width: 95px;
        }
        .param-value{
            color:#f52988;
        }
        
    }
}
</style>
