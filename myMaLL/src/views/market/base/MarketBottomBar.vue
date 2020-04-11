<template>
    <div class='market-bottom-bar'>
        <select-box class="bottom-menu" @click.native="selectAll" :checked="isCheckAll"/>
        <span class="all">全选</span>
        <span class="total-price">合计：<span class="price">¥ {{total.toFixed(2)}}</span></span>
        <img src="~assets/img/market/delete.svg" alt="" class="del" @click="handelDel">
        <span class="buy-product" @click="payOut">去计算({{selectProductsLength}})</span>
        <!-- <toast ref="toast"/> -->
    </div>
</template>

<script>
import SelectBox from './SelectBox'
// import Toast from 'components/content/toast/Toast'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'MarketBottomBar',
    data() {
        return {

        }
    },
    components: {
        SelectBox,
        // Toast
    },
    methods:{
        ...mapMutations(['updateProductAllCheck','deleteProducts']),

        // 点击全选,把仓库中的Procut商品全都的checkd变成true 反之false
        selectAll(){
            this.updateProductAllCheck(!this.isCheckAll)
        },
        // 结算
        payOut(){
            // this.$refs.toast.show(`商品总合为${this.total.toFixed(2)}`)
            // 插件形式 
            this.$toast.show(`商品总和为${this.total.toFixed(2)}`)
        },
        // 清空购物车
        handelDel(){
            this.deleteProducts()
            // if(localStorage.getItem('products').length){
            //     this.$router.push('/home')
            // }
            
        }
    },
    computed:{
        ...mapGetters(['isCheckAll','selectProductsLength','total']),
    },
}

/*
    将从仓库中得到计算后的结果给select-box组件类名绑定
    给组件绑定原生点击事件需要加上native
*/
</script>



<style lang='less' scoped>
.market-bottom-bar {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 48px;
    line-height: 48px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 -1px 0px rgba(0, 0, 0, .2);
    padding-left: 10px;
    box-sizing: border-box;
    .bottom-menu{
        position: absolute;  // 相对于父级定位
        line-height: 0;
        left: 12px;
        top: 13px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        img{
            width: 20px;
        }
    }
    .all{
        margin-left: 34px;
    }
    .total-price{
        margin-left: 10px;
        .price{
            color: red;
        }
    }
    .buy-product{
        float: right;
        padding: 0 10px;
        text-align: center;
        color: #fff;
        background-color: #faa015;
    }
    .del{
        width: 20px;
        position: relative;
        top: 5px;
        margin-left: 15px;
    }

}
</style>
