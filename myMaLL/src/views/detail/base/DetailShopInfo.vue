<template>
<div class="detail-shop-info">
  <div class="title">
    <img :src="shopInfo.logo" alt />
    <span>{{shopInfo.name}}</span>
  </div>

  <div class="content">

    <div class="content-left">
      <div class="info-sells">
        <div class="sells-count">{{shopInfo.sells}}</div>
        <div class="sells-text">总销量</div>
      </div>

      <div class="info-goods">
        <div class="goods-count">{{shopInfo.goodsCount}}</div>
        <div class="goods-text">全部宝贝</div>
      </div>
    </div>

    <div class="content-right">
      <table>
        <tr v-for="(item, index) in shopInfo.score" :key="index">
          <td>{{item.name}}</td>
          <!-- 控制第二列文字 -->
          <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
          <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
        </tr>
      </table>
    </div>

  </div>

  <div class="shop-bottom">
    <div class="enter-shop">进店逛逛</div>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
/**
 *  后台的数据格式  score 是一个数组    不高亮为绿色
 *  [
 *    {
 *        isBetter:false, // 根据这个false来显示是否高亮 添加类名就行 
 *        name:"描述相符",
 *        score:4.62
 *    }
 *  ]
 * 
 * 
 */
</script>

<style lang='less' scoped>
.detail-shop-info {
  height: 200px;
  padding: 15px 10px;

  // 电偶名字
  .title {
    display: flex;
    align-items: center;
    img {
      height: 45px;
      border-radius: 50%;
    }
    span {
      margin-left: 10px;
    }
  }

  // 中部内容
  .content {
    height: 100px;
    margin-top: 15px;
    // background-color: yellow;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .content-left{
      width: 50%;
      display: flex;
      justify-content: space-around;
      line-height: 26px;
      text-align: center;
      border-right: 1px solid rgba(0,0,0,.1);
      .info-sells{
        .sells-text{
          font-size: 12px;
        }
      }
      .info-goods{
        .goods-text{
          font-size: 12px;
        }
      }
    }
    .content-right{
      flex: 1;
      margin-left: 20px;
      font-size: 14px;
      table {
        width: 128px;
        td {
          padding: 5px 0;
        }
      }
      .score {  // isBetter=false 那么就不高亮  第二列
        color: #5ea732;
      }
      .score-better {   // isBetter=true 那么就高亮  第二列
        color: rgb(255, 80, 0);
      }
      .better span {  // 第三列
        background-color: #4ba732;
        padding: 0px 1.5px;
        color: #fff;
        text-align: center;
      }
      .better-more span {
        background-color: #f13e3a;
        color: #fff;
      }
    }
  }
  
  // 尾部 盒子居中方式  text-align+inline-block
  .shop-bottom {
    text-align: center; // 设置居中
    margin-top: 10px;
    .enter-shop {
      display: inline-block; // 设置行内块
      font-size: 14px;
      background-color: #f2f5f8;
      width: 150px;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
    }
  }
}


</style>
