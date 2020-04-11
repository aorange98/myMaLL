<template>
  <div class='select-box'  :class="{'active':checked}" >
    <img src="~/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'SelectBox',
  props: {
    checked:{
        type:Boolean,
        default:true,// 默认选中
    },
  },
  // methods: {
  //   btnClick(){
  //     //修改vuex中 products 数组中指定商品(iid)的数据
  //     this.$store.commit('updateCheck',this.iid)
  //   }
  // }
}

/**
 * 本组件是MarketProductListItem和MarketBottomBar组件都需要使用的
 * 那么都需要点击事件 ，所以不可以在本组件中写死了，需要在使用的地方绑定类名
 * 
 * 
 */
</script>


<style lang='less' scoped>
.select-box{
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border:2px solid #ccc;
  img{
    width: 20px;
  }
}

.active {
  background-color: #faa015;
  border-color: #faa015;
}


</style>
