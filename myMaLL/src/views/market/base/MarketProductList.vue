<template>
  <div class='market-product-list'>
    <market-product-list-item v-for="(item,index) in products" :key="index" :product="item"/>
  </div>
</template>

<script>
import MarketProductListItem from './MarketProductListItem'
import {mapState} from 'vuex'
export default {
  name: 'MarketProductList',
  data() {
    return {}
  },
  computed:{
    ...mapState(['products'])
  },
  components: {
    MarketProductListItem
  },
}
</script>

<style lang='less' scoped>

</style>
