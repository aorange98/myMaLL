<template>
  <div class="market">
    <common-nav-bar>
      <template #middle>
        购 物 车 ({{$store.getters.productsLength}})
      </template>
    </common-nav-bar>
    
    <CommonScroll :probeType="3" @getPosition="getPosition" ref="scroll">
      <market-product-list/>
    </CommonScroll>

    <back-top :bottom="'105px'" v-show="isShow" @backTop="backTop"/>

    <market-bottom-bar/>
  </div>
</template>

<script>
import MarketProductList from './base/MarketProductList'; 
import MarketBottomBar from './base/MarketBottomBar'
import {backTopMixin} from 'utils/mixin'
export default {
  name: "Market",
  data(){
    return {
      products:[], // 存放已经选购的数据
      isShow:false  
    }
  },
  methods:{
    getPosition(position){
      // console.log(position)
      const positionY = -position.y
      this.isShow = positionY>=900
    }, 
  },
  components:{
    MarketProductList,
    MarketBottomBar
  },
  mixins:[backTopMixin] // 混入

};
</script>

<style lang="less" scoped>
  @import '~assets/css/varible.less'; 
  // 在使用该组件是可以获取common-nav-bar的第一个类名的
  .common-nav-bar {
    background-color: @themeColor;
    color: #fff;
    z-index: 1;
  }

  .wrapper{
    position: fixed;
    top:44px;
    // bottom:48px;
    bottom: 99px;
    left:0;
    right:0;
  }

</style>