<template>
  <div class="detail-bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addMarket">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {
      initNow:0   // 记录初始时间
    };
  },
  components: {},
  methods: {
    addMarket() {
      // 点击按钮通知detail组件把goodinfo存进vuex仓库 子组件与父组件通信
      // 函数节流
      let now = new Date()
      if(now - this.initNow>=1000){
        // console.log(1,new Date().toLocaleString())
        this.$emit("addMarket");
        this.initNow = now 
      }
    }
  }
};
</script>

<style lang='less' scoped>
.detail-bottom-bar {
  display: flex;
  position: absolute;
  height: 56px;
  z-index: 2;
  left: 0; // 水平占满
  right: 0; // 水平占满
  bottom: 0;
  background-color: pink;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-size: 24px;
  background-position: -1px -58px;
}

.bar-left .shop {
  background-size: 24px;
  background-position: -1px -108px;
}

.bar-left .select {
  background-size: 24px;
  background-position: 0 0px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}
</style>
