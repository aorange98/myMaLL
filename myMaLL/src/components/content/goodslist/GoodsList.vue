<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goods" :itemData="item" :key="index"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,  // 传递过来的是一个数组
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
/**
 *根据传递过来的数组进行遍历结构 遍历结构的时候最好再新建一个组件，那么就可以遍历这个组件即可
 *其实就是多次使用这个组件 而这个组件中是一个显示框的结构而已 遍历得到item的每一项以属性传递给子组件
 *在子组件根据这项来填充对应需要的结构
 *
 */
</script>

<style lang='less' scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 15px;
}
</style>
