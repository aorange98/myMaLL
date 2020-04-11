<template>
  <!-- 设置wrap的固定高度 -->
  <div class="wrapper" ref="wrapper">
    <!-- 放置滚动的内容插槽 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入官方的组件
import BScroll from "better-scroll";

export default {
  name: "CommonScroll",
  props:{
    pullUpLoad:{
      type:Boolean,
      default:false,   // 默认不开启
    },
    probeType:{
      type:Number,
      default:0
    }
  },
  mounted() {
    // console.log(this.$refs.wrapper)  // 在标签上使用ref 获取的是原生dom

    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 允许点击
      pullUpLoad:this.pullUpLoad,  
      // pullUpLoad: true // 允许监听滚动到最底部
      probeType:this.probeType     // 允许监听滚动
    })

    // 监听 滚动到滚动区域的最底部触发  默认只能监听滚动到最底部一次 
    // pullUpLoad为true时能让这个函数滚动到最底部时触发
    this.scroll.on("pullingUp", () => {
      // console.log("我滚动到底部啦")

      // 获得更多数据 请求是在home组件中的，那么就发射一个事件(执行函数)
      this.$emit("loadMore")
    })

    // 初始化时得到的可滚动内容 没有计算图片的高度 因为图片此时还没有加载完成 
    // console.log('初始滚动高度',this.scroll.scrollerHeight)
    // debugger   


    // 只要滚动就会触发该事件 触发时机取决于probeType 而不是pullUpLoad
    // pullUpLoad为true能滚动的原因是允许滚动到最底部实际上也在滚动
    this.scroll.on("scroll", position => {
      // console.log(position)
      this.$emit("getPosition", position)
    })
    
  },
  methods: {
    // 当上拉加载数据加载完毕后，需要调用此方法来告诉better-scroll数据已完成加载
    // 调用了之后才能让better-scroll再次监控到你拉到滚动区域的最底部
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    // 该函数返回到哪里
    scrollTo(x,y,time=1000){  
      this.scroll.scrollTo(x,y,time)
    },
    // 重新计算滚动高度
    refresh(){
      // console.log('再次更新',this.scroll.scrollerHeight) // 重新计算高度
      this.scroll.refresh()
    }
  }
};
/*
  真正让betterScroll监听滚动的是这个
  probeType  这是需要被通过属性传递的prop接收
  默认值：0
  可选值：1、2、3
*/
</script>


<style lang='less' scoped>
// 这里不写wrap的滚动区域高度，是因为可拓展性 
// 该组件在需要使用的时候那么要给使用该组件的组件中固定wrap的高度即可

</style>
