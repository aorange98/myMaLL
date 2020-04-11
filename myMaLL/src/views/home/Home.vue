<template>
<div class="Home">
    <!-- 顶部导航栏 -->
    <common-nav-bar>
        <template #middle>购 物 街</template>
    </common-nav-bar>

    <tab-control :titles="Object.values(types)" @tabClick="tabClick" ref="tabControl1" v-show="isShowTabControl"/>

    <!-- 使用封装的滚动组件 -->
    <common-scroll @loadMore="loadMore" ref="scroll" @getPosition="getPosition" :pull-up-load="true">
      <!-- 轮播图组件(全局) 将获得到的banner传递给子组件 设置高度 -->
      <commom-swiper :banner="banner" padding-bottom="52%"/>
      <!-- 推荐组件 将获得到的banner传递给子组件 -->
      <recommend :recommend="recommend" />
      <!-- 流行组件 -->
      <popular />
      <!-- 切换显示内容的组件  子组件与父组件通信事件车--> 
      <!-- <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"/> -->
      <tab-control :titles="Object.values(types)" @tabClick="tabClick" ref="tabControl2" />
      <!-- 好物的组件 传递请求得到的pop/new/sell数组 -->
      <goods-list :goods="goods[currentType].list"/>
    </common-scroll>

    <!-- 返回首页 -->
    <!-- <back-top @click.native="backTop" /> -->
    <back-top @backTop="backTop" v-show="isShow" />

  </div>
</template>

<script>
import {reqHomeMultidata,reqHomeGoods} from "api/home";
import Recommend from "./base/Recommend";
import Popular from "./base/Popular";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";
// import BackTop from 'components/content/backtop/BackTop'
import {backTopMixin} from 'utils/mixin';

export default {
    name: "Home",
    data() {
        return {
            banner: [],         // 轮播图数据
            recommend: [],      // 推荐数据
            currentType:'pop',  // 记录tab切换的类型 
            isShowTabControl:false, // 初始不显示第一个TabControl组件
            // isShow:false,    // 初始不显示返回顶部组件
            // typeList:['pop','new','sell'],  // 父组件传递的数据类型
            types: {
                // 推荐写法  父组件传递的数据类型
                pop: "流行",
                new: "新款",
                sell: "精选"
            },
            goods: {        // 存放商品数据
                pop: {
                    list: [],   // 流行选项  对应的数据
                    page: 1     // 记录请求了第几页的流行数据
                },
                new: {      
                    list: [],   // 新款的数据
                    page: 1
                },
                sell: {    
                    list: [],   // 精选的数据
                    page: 1
                }
            }
        };
    },
    created() {
        this.getHomeMultidata();
        // 传递的是一个字符串 请求分类的不同数据
        // this.getHomeGoods('pop')
        // this.getHomeGoods('new')
        // this.getHomeGoods('sell')
    
        // 写法二
        // Object.keys(this.types).forEach(item=>this.getHomeGoods(item))
        // 高逼格 将getHomeGoods函数作为forEach的回调函数 系统会偷偷的传递参数数据的每一项
        Object.keys(this.types).forEach(this.getHomeGoods)
        // console.log(this.$refs)
        // debugger
    },
    // 减少this.$refs.scroll.refresh函数执行的频率
    // 函数防抖:限制指定函数的执行频率  一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
    // 使用ref，不能在created钩子函数 想获取ref的值必须在mounted中获取
    mounted(){  
        // 绑定事件 这里执行 
        const debounce = function (fn,time){
            let timer = null
            return function(){
                clearTimeout(timer)
                timer = setTimeout(fn,time)
            }
        }
        const fresh = debounce(this.$refs.scroll.refresh,300) // 自己定义
        this.$eventBus.$on('goodListImgLoad',fresh)

        // this.$eventBus.$on('goodListImgLoad',()=>{
        //     // 调用better-scroll的refresh方法
        //     this.$refs.scroll.refresh()
        // })
    },

    // 局部混入
    mixins: [backTopMixin],
    methods: {
        // 获得首页的数据
        async getHomeMultidata() {
            const result = await reqHomeMultidata();
            // console.log(result);

            // 推荐这种写法 效率更高
            const data = result.data;
            // 轮播图 数据  处理数据形式['','',...]
            this.banner = data.banner.list.map(item=>item.image);
            // 推荐数据
            this.recommend = data.recommend.list;
        },

        // 获取goods中分类的pop new sell数据  goods['pop']  === goods.pop
        async getHomeGoods(type){
            // console.log(type)
            // 获取goods中分类的页数 
            const page = this.goods[type].page
            const result = await reqHomeGoods(type,page);
            // console.log(result)
            // 把数组展开然后丢进data数组中
            this.goods[type].list.push(...result.data.list)
        },

        // 子组件与父组件通信 告诉我点击的是第几个 然后根据第几个显示不同的数据
        tabClick(index){
            // 保持两个TabControl组件的行为一致 父组件修改子组件数据
            this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index

            // 当index=1时候 那么就是new 在data定义一个typeList 第一项就是new 那么就可以切换数据显示
            // this.currentType = this.typeList[index]
            this.currentType = Object.keys(this.types)[index]
            // console.log(this.currentType)

        },

        // 加载更多对应类型的数据 这个函数是在scroll触发的 那么就要在scroll组件上绑事件
        loadMore(){
            // 加载额外的30条数据
            this.getHomeGoods(this.currentType)
            // 让page数+1
            this.goods[this.currentType].page++
            // 父组件调用子组件的方法 打上ref/事件车传递
            this.$refs.scroll.finishPullUp()  
        },
        
        // 吸顶效果
        getPosition(position){
            const positionY = -position.y
            // console.log(positionY,this.$refs.tabControl2.$el.offsetTop)

            // 当你滚动竖直方向到y>=tab-control距离到滚动起点的高度offsetTop时，那么就显示
            // 三目
            const isShowTabControl = positionY>=this.$refs.tabControl2.$el.offsetTop
            this.isShowTabControl =  isShowTabControl

            // if(positionY>=this.$refs.tabControl2.$el.offsetTop){
            //     this.isShowTabControl = true
            // }else{
            //     this.isShowTabControl = false
            // }

            // 三目 自定义 当滚动的y大于一定值返回顶部的按钮就会显示
            positionY>=1000?this.isShow = true:this.isShow = false

        },
        // backTop(){  // 点击commonScroll组件返回到最顶端
        //     this.$refs.scroll.scrollTo(0,0,1000)
        // }   

    },
    components: {
        Recommend,
        Popular,
        TabControl,
        GoodsList,
        // BackTop
    }
};

/**
 * 1.确保每个组件都是面向一个数据来实现的
 * 2.若获取多个不同分类的数据和同一接口下,涉及页数的话,那么不同分类数据就要在不同对象中存储page和list:[]
 *
 * 3.流行 新换 精选这三个按钮，点击后会显示不同的数据，那么以流行为例，第一次：获取30条数据并且page：1  
 *  当拖到底部的时候，再次发起请求获取30条数据并且往元素组中添加 且对应分类的值page++
 * 
 * 4.刚开始goods-list组件是显示流行分类的的数据 点击不同的分类信息那么就显示不同的分类列表
 * 传递给goodList的值也就不一样  那么currentType:'pop', 为一开始传递的值
 * 
 * 5.我们发现传递的title是一个数组和定义的typeList很相似 那么做成一个对象的形式 然后使用 Object.values()得到对象的属性值
 * 返回的是属性值组成的数组
 * 
 * Object.values({a:1,b:23}) -->  [1,23]  即可
 * Object.keys({a:1,b:23}) --> ['a','b']
 * 
 * 6.打上相同的ref如果是同一个组件的话，那么只能获取第二个 所以要给tab-control打上不同的ref
 *   使用两次tab-control组件出现的问题：表现不一致，使他们表现一致 在tabClick函数中，使打上不同标记的tab-control组件的
 *   currentIndex都为当前点击的index相等  
 * 
 * 7.处理传递给commonSwiper组件确保就是一个由图片链接组成数组 banner:['','',...]
 * 
 * 8.遵循风格指南传值的写法  
 * 
 */
</script>


<style lang="less" scoped>

@import '~assets/css/varible.less'; 


// 在使用该组件是可以获取common-nav-bar的第一个类名的
.common-nav-bar {
    background-color: @themeColor;
    color: #fff;
    z-index: 1;
}

// 设置myScroll组件的样式 可以获取myScroll的第一个类名
.wrapper {
    position: fixed;
    top:44px;
    bottom:48px;
    left:0;
    right:0;
}
</style>