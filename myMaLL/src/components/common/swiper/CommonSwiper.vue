<template>
  <div class="commom-swiper" :style="{paddingBottom}">
    <swiper :options="swiperOption" v-if="banner.length!==0">
      <!-- slides -->
      <swiper-slide v-for="item in banner" :key="item.acm">
        <img :src="item" alt />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "CommomSwiper",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true, // 是否循环轮播
        autoplay: { // 是否自动播放及参数
          delay: 2000   
        }
      }
    }
  },
  props: {
    // prop验证要求 对象或数组作为默认值必须是函数的形式
    banner: {
      type: Array,
      default: function() {
        return []; // 如果没有传递那么就返回一个数组
      }
    },
    paddingBottom:{ // 这个属性用来控制轮播图的高度的
      type:String,
      default:'52%'
    }
  },
};

/**
 * swiper-pagination  分页器  https://www.swiper.com.cn/api/pagination/362.html
 *
 * 注意：
 * loop:true 想要生效 那么就需要在官方的swiper组件中使用v-if判断是否有数据才渲染这个节点
 * 因为数据是异步获取的，loop是同步
 * 
 * padding 是一个动态的值 是需要传递过来的 传递过来样式绑定即可
 */
</script>

<style lang='less' scoped>
.commom-swiper {
  // 解决抖屏(就是图片还没加载进来,下面的组件或者文字就会网上顶,等图片加载完后高度从0立马变到195px 出现抖屏)
  position: relative;
  overflow: hidden;
  height: 0;  
  // padding-bottom: 52%; // 此处的百分比是相对于盒子width值  195(图片的高度)/375(盒子的宽度) = 0.52 

  img {
    width: 100%;
  }

  // 让他分页器相对于commom-swiper定位  而不是相对于swiper-container定位
  /deep/ .swiper-container{
    position: static; // 默认不定位
  } 

  // 样式穿透   如果需要在当前项目中修改第三方库的样式
  /deep/ .swiper-pagination-bullet-active {
    background:red;
  }
}
</style>
