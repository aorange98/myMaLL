<template>
  <div class="detail">
    <!-- 详情页导航栏 -->
    <detail-nav-bar @itemClick="itemClick" ref="navbar"/>
    <common-scroll ref="scroll" @getPosition="getPosition" :probe-type="3">
      <!-- 轮播图 传递数据-->
      <commom-swiper :banner="banner" :padding-bottom="'80%'" />
      <!-- 商品信息 -->
      <detail-goods-info :goods-info="goodsInfo" />
      <!-- 商家信息 遵循风格指南烤串形式-->
      <detail-shop-info :shop-info="shopInfo" />
      <!-- 商品图片信息 -->
      <detail-img-info :detail-img-info="detailImgInfo" @imgLoad="imgLoad"/>
      <!-- 尺寸信息 -->
      <detail-params :params-info="paramsInfo" ref="params" />
      <!-- 评论信息 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 推荐 -->
      <goods-list :goods="recommendInfo" ref="recommend" />
    </common-scroll>
    <!-- 底部导航组件 -->
    <detail-bottom-bar @addMarket="addMarket"/>

    <!-- 返回 -->
    <back-top @backTop="backTop" v-show="isShow" />

    <!-- 加入购物车弹框提示 -->
    <!-- <toast ref="toast"/> -->

  </div>
</template>

<script>
import {reqDetails, GoodsInfo,ShopInfo,CommentInfo,reqRecommends} from "api/detail";
import DetailNavBar from "./base/DetailNavBar";
import DetailGoodsInfo from "./base/DetailGoodsInfo";
import DetailShopInfo from "./base/DetailShopInfo";
import DetailImgInfo from "./base/DetailImgInfo";
import DetailParams from "./base/DetailParams";
import DetailCommentInfo from "./base/DeatilCommentInfo";
import GoodsList from "components/content/goodslist/GoodsList";
// import BackTop from "components/content/backtop/BackTop";
import {backTopMixin} from 'utils/mixin';
import DetailBottomBar from './base/DetailBottomBar'
// import Toast from '../../components/content/toast/Toast'

export default {
  name: "Detail",
  data() {
    return {
      banner: [],
      goodsInfo: {}, // 存放good组件的数据
      shopInfo: {}, // 商家信息
      detailImgInfo: {}, // 商品图片信息
      paramsInfo: {}, // 尺寸信息
      commentInfo: {}, // 评论信息
      recommendInfo: [], // 推荐信息
      offsetTopList: [0], // 存放商品参数评论推荐组件距离定位父级的值
      // isShow: false // 初始不显示第一个TabControl组件
    };
  },
  created() {
    // 获取该详情页的数据
    this.getDetails(this.$route.params.iid);
    this.getRecommends();
  },
  // mounted(){
  //   console.log(this.$refs.params.$el)
  //   console.log(this.$refs.comment.$el)
  //   console.log(this.$refs.recommend.$el)
  // },
  // updated(){
  //   debugger
  // },
  // 混入
  mixins: [backTopMixin],
  methods: {
    async getDetails(iid) {
      const { result } = await reqDetails(iid);
      // console.log(result)
      this.banner = result.itemInfo.topImages;
      // 商品信息
      this.goodsInfo = new GoodsInfo(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );
      // 商家信息
      this.shopInfo = new ShopInfo(result.shopInfo);
      // 商品图片信息
      this.detailImgInfo = result.detailInfo;
      // 商品尺寸衣服来源信息
      this.paramsInfo = result.itemParams;
      // 评论信息
      if (result.rate.cRate !== 0) {
        // 放置没有评论信息cRate
        this.commentInfo = new CommentInfo(result.rate.list[0]);
      }
    },

    // 推荐的组件
    async getRecommends() {
      const result = await reqRecommends();
      this.recommendInfo = result.data.list;
    },
    // 绑定事件 获取子组件的数据
    itemClick(index) {
      // 点击的时候获取到可滚动区域（距离父级的高度）的offsetTop值
      // 一般也不会等商品还没加载完就点击吧（折中办法）

      // this.offsetTopList = [0]; // 每次点击都为最初值
      // this.offsetTopList.push(
      //   this.$refs.params.$el.offsetTop,
      //   this.$refs.comment.$el.offsetTop,
      //   this.$refs.recommend.$el.offsetTop
      // );

      this.$refs.scroll.scrollTo(0, -this.offsetTopList[index], 300);
    },
    // 混入方式
    // backTop() {
    //   this.$refs.scroll.scrollTo(0, 0, 300);
    // },
    imgLoad(count){
      // 等图片加载完后获取到可滚动区域（距离父级的高度）的offsetTop值
      this.offsetTopList = [0]; // 每次点击都为最初值
      this.offsetTopList.push(
        this.$refs.params.$el.offsetTop,
        this.$refs.comment.$el.offsetTop,
        this.$refs.recommend.$el.offsetTop
      );
      // console.log(`加载了${count}张图片`,this.offsetTopList)
    },
    // 监控滚动的位置..
    getPosition(position) {
      // 让返回的按钮在适当的地方出现
      const positionY = -position.y;
      this.isShow = positionY > 1000 ? true : false;

      // 联动navbar高亮显示 通过$ref修改navbar中的currentIndex让他高亮显示
      // console.log(positionY);
      const [zero,paramsOffsetTop,commentOffsetTop,goodsOffsetTop] = this.offsetTopList;
      // console.log(zero, paramsOffsetTop, commentOffsetTop, goodsOffsetTop);

      if (positionY >= zero && positionY < paramsOffsetTop) {
        this.$refs.navbar.currentIndex = 0; // 修改navbar中的current高亮
      } else if (positionY >= paramsOffsetTop && positionY < commentOffsetTop) {
        this.$refs.navbar.currentIndex = 1;
      } else if (positionY >= commentOffsetTop && positionY < goodsOffsetTop) {
        this.$refs.navbar.currentIndex = 2;
      } else if(positionY>=goodsOffsetTop&&positionY<1000000){
        this.$refs.navbar.currentIndex = 3;
      }
    },
    // 点击添加到vuex中,market组件从vuex获取数据
    addMarket(){
      const product = {}
      product.image = this.banner[0],
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.$route.params.iid
      // 触发修改仓库的commit动作 仓库的数据只能由仓库修改
      this.$store.commit('addMarket',product)
      //根据这个iid值去仓库中找到这个产品，然后返回count的数量弹框显示
      let findProduct = this.$store.getters.count(product.iid)

      // 方式2 显示弹框的
      // this.$refs.toast.isShow = !this.isShow
      // this.$refs.toast.message = `当前购物车中数量为${findProduct.count}`
      // setTimeout(()=>this.$refs.toast.isShow=false,1000)

      // 方法3 直接通过调用子组件中封装的方法
      // this.$refs.toast.show(`当前购物车中数量为${findProduct.count}`)

      // 插件形式 无需注册
      this.$toast.show(`当前购物车中数量为${findProduct.count}`)
    }
  },

  components: {
    DetailNavBar,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailImgInfo,
    DetailParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
    // BackTop
  }
};
/**
 * created 是一个毫秒数 需要转换为可读时间 yy-MM-dd
 * 
 * 当滚动页面的到不同的内容的时候，那么detailnavbar组件也会跟着你到哪个位置然后而联动 
 * 比如你滚动到推荐页面 那么navbar的推荐就会高亮 
 * 高亮那么就根据currentIndex值来高亮的 同时offsetTopList:[]数组中存着商品 参数 评论推荐 距离定位父级的高度
 * 
 * 那么当滚动位置是
    0<=x<6197      商品按钮高亮   detail-nav-bar内部的currentIndex 0
    6197<=x<6979    参数按钮高亮    1
    6979<=x<7193    评论按钮高亮    2
    >7199           推荐按钮高亮    3
 * 
 * scrollTo的时长会影响从商品到直接点击推荐所度过的时间 而不会立马到了
 * 
*/
</script>

<style lang='less' scoped>
// 设置myScroll组件的样式 可以获取myScroll的第一个类名
.wrapper {
  // 设置滚动内容
  position: fixed;
  top: 44px;
  bottom: 48px;
  left: 0;
  right: 0;
}
</style>
