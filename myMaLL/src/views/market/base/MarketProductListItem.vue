<template>
<div class="market-product-list-item">
    <select-box @click.native="btnClick" :checked="product.checked" />
    <div class="item-img">
        <img :src="product.image" alt="商品图片" />
    </div>

    <div class="item-info">
        <h4 class="item-title">{{product.title}}</h4>
        <p class="item-desc">商品描述: {{product.desc}}</p>
        <div class="info-bottom">
            <span class="item-price left">¥{{product.price}}</span>
            <span class="item-count right">x{{product.count}}</span>
        </div>
    </div>
</div>
</template>

<script>
import SelectBox from './SelectBox'
export default {
    name: "MarketProductListItem",
    props: {
        product: {
            type: Object,
            required: true,
            default () {
                return {};
            }
        }
    },
    components:{
        SelectBox
    },
    methods:{
        btnClick(){
            //修改vuex中 products 数组中指定商品(iid)的数据
            this.$store.commit('updateCheck',this.product.iid)
        }
    }
    
};
/**
 * 给组件绑定原生点击事件需要加上native
 * 
 */
</script>

<style lang='less' scoped>
.market-product-list-item {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    .item-img {
        padding: 8px;
        img {
            display: block;
            width: 82px;
            height: 100px;
            border-radius: 5px;
        }
    }
    .item-info {
        position: relative;
        width: 100%;
        overflow: hidden; // 出现省略号
        padding: 8px 0px 5px 5px;
        .item-title,
        .item-desc {
            overflow: hidden;
            white-space: nowrap; 
            text-overflow: ellipsis;
        }
        .item-title {
            font-size: 17px;
        }
        .item-desc {
            margin-top: 15px;
            font-size: 14px;
            color: #666;
        }
        .info-bottom {
            margin-top: 10px;
            position: absolute;
            bottom: 10px;
            left: 10px;
            right: 10px;
            .item-price {
                color: orangered;
            }
            .left{
                float: left;
            }
            .right{
                float: right;
            }
        }
    }
}
// .market-product-list-item:last-child{
//     padding-bottom: 50px;
//     border-bottom: 0;
// }
</style>
