<template>
  <div class="back-top" @click="backTop" :style="{bottom}">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>


<script>
export default {
  name: "BackTop",
  props:{
    bottom:{
      type:String,
      default:'60px'
    }
  },
  methods: {
    backTop() {
      this.$emit("backTop");
    }
  }
};

/*
 *bottom值不能写死 样式动态绑定 可以传递
*/
</script>

<style lang='less' scoped>
.back-top {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 10px;
  // bottom: 60px;
  z-index: 999;
  img {
    width: 50px;
  }
}
</style>
