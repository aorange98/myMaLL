<template>
<div id="app">
  <!-- 单独抽离transition过渡的组件 -->
  <common-slider-transition :name="direction">
    <keep-alive exclude='Detail,Market'>
      <router-view class="center" />
    </keep-alive>
  </common-slider-transition>
  <Common-tab-bar v-if="!$route.path.includes('detail')&&!$route.path.includes('login')"/>
</div>
</template>


<script>
export default {
  name: "app",
  data() {
    return {
      direction: "" // 防止抖屏
    };
  },
  watch: {
    $route(to, from) {
      // 重定向啥类名都不加
      if (from.path === "/") return;

      // 接收两个参数 一个是变化后的值 
      if (to.meta.index > from.meta.index) {
        this.direction = "left";
      } else {
        this.direction = "right";
      }
    }
  }
};

/**
 * 使home组件不被销毁 那么就可以记录上一次的位置 detail组件是要重新创建的
 * exclude="Detail"
 */
</script>


<style scoped>
  @import 'assets/css/reset.css';
  @import 'assets/css/public.css';
  .center {
    /* 脱离文档流 */
    position: absolute;
    width: 100%;
    height: calc(100%);    /* 设置盒子的高度 */ 
  }
</style>











