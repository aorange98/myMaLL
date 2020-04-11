<template>
  <div class="nav-bar">
    <common-nav-bar>
      <template #left>
        <img src="~assets/img/common/back.svg" alt @click="handleGoBack"/>
      </template>
      <template #middle>
        <ul class="nav-bar-title">
          <li 
            v-for="(item,index) in list" 
            :key="index" 
            @click="handleClick(index)"
            :class="{active:currentIndex===index}"
          >{{item}}</li>
        </ul>
      </template>
    </common-nav-bar>
  </div>
</template>

<script>
export default {
  name: "DetailNavBar",
  data() {
    return {
      list: ["商品", "参数", "评论", "推荐"],
      currentIndex:0   // 记录当前的index
    };
  },
  methods: {
    handleGoBack() {
        this.$router.go(-1)
    },
    handleClick(index){
      // 点击谁谁就高亮
      this.currentIndex = index
      // 还要跳到那个地方 发射事件 告诉detail组件我点的是谁 子组件与父组件通信 
      // console.log(index)
      this.$emit('itemClick',index)
    }
  },
  components: {

  },
  
};
/**
 * @click="handleClick(index)" ===  @click="currentIndex = index"
 * 
 */
</script>

<style lang='less' scoped>
@import '~assets/css/varible.less'; 
.common-nav-bar{
  z-index:1;
  background-color: #fff;
}
.nav-bar{
    img{
        margin-top: 12px;
        width: 20px;
    }
    .nav-bar-title{
        font-size: 14px;
        display: flex;
        li{
            flex: 1;
        }
    }
    .active{
        color: @hightTextColor;
    }
}


</style>
