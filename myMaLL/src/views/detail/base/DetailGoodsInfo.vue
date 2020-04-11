<template>
    <div class="goods-info" v-if="Object.keys(goodsInfo).length">
        <p>{{goodsInfo.title}}</p>
        <div class="price">
            <span class="n-price">{{goodsInfo.newPrice}}</span>
            <span class="o-price">{{goodsInfo.oldPrice}}</span>
            <span class="discount">{{goodsInfo.discount}}</span>
        </div>

        <div class="other">
            <span>{{goodsInfo.columns[0]}}</span>
            <span>{{goodsInfo.columns[1]}}</span>
            <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
        </div>
        <div class="service">
            <span class="service-item" v-for="index in goodsInfo.services.length-1" :key="index">
                <img :src="goodsInfo.services[index-1].icon">
                <span>{{goodsInfo.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "GoodsInfo",
    props: {
        goodsInfo: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
};
/**
 * 当goodsInfo为空对象的时候, goodsInfo.columns[0] 找不到值是会报错的
 * 使用v-if判断 Object.keys(goodsInfo).length === 0 控制还没拉取到数据的时候节点就从goodinfo读取信息报错
 * 
 */
</script>

<style lang='less' scoped>
.goods-info {
    margin-top: 10px;
    padding: 0 8px;
    line-height: 21px;
    border-bottom: 5px solid #f2f5f8; // background-color: pink;
}

.price {
    margin-top: 10px;
    .n-price{
        color:#f52988;
        font-size: 22px;
    }
    .o-price{
        font-size: 12px;
        margin-left: 10px;
        color: #888;
        text-decoration: line-through;
    }
    .discount{
        position: relative;
        top: -5px;
        left: 8px;
        color:#fff;
        background-color: red;
        border-radius: 20px;
        padding: 0 5px;
        font-size:12px;
    }
}

.other {
    display: flex;
    font-size: 13px;
    margin-top: 15px;
    line-height: 30px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    .service-item{
        img {
            position: relative;
            top: 2px;
            width: 14px;
            height: 14px;
        }
        span {
            font-size: 13px;
            color: #333;
        }
    }
}
</style>
