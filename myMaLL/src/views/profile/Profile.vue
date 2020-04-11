<template>
  <div class="profile">
    <common-nav-bar>
      <template #middle>我 的</template>
    </common-nav-bar>

    <user-info/>

    <list-view :list-data="orderList"/>
    <list-view :list-data="serviceList"/>
    <list-view :list-data="moreList"/>

  </div>
</template>

<script>
import UserInfo from "./base/UserInfo";
import ListView from './base/ListView';
export default {
  name: "Profile",
  data() {
    return {
      orderList: ["我的订单", "我的收藏", "会员卡"],
      serviceList: ["我的购物车", "下载购物APP"],
      moreList: ["设置", "更多"]
    };
  },
  methods: {

  },
  components: {
    UserInfo,
    ListView,
  }
};
</script>


<style scoped lang="less">
@import "~assets/css/varible.less";
// 在使用该组件是可以获取common-nav-bar的第一个类名的
.common-nav-bar {
  background-color: @themeColor;
  color: #fff;
  z-index: 1;
}
.profile{
  height: 100vh;
  // position: relative;  // 解决白屏
  background-color: #f2f2f2;
}
</style>