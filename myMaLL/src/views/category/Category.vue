<template>
    <div class='category'>
        <common-nav-bar>
            <template #middle>分 类</template>
        </common-nav-bar>

        <!-- 左侧导航栏 + 滚动区 -->
        <common-scroll class="container1">
            <category-left-nav :categorys="categorys" @itemClick="itemClick"/>
        </common-scroll>

        <!-- 右侧内容 + 滚动区 -->
        <common-scroll class="container2">
            <category-grid-view :subcategory="subcategory" :cols="3"/>
            <!-- 控制条 -->
            <tab-control :titles="Object.values(types)" @tabClick="tabClick"/>
            <!-- good-list -->
            <goods-list :goods="goods[currentType].list"/>
        </common-scroll>
        


    </div>
</template>

<script>
    import {reqCategory,reqSubcategory,reqCategoryDetail} from 'api/category'
    import CategoryLeftNav from './base/CategoryLeftNav'
    import CategoryGridView from './base/CategoryGridView'
    import TabControl from 'components/content/tabcontrol/TabControl'
    import GoodsList from 'components/content/goodslist/GoodsList'
    export default {
        name: "category",
        data(){
            return {
                categorys:[], // 存储左侧滚动区域的数据
                subcategory:[], // 储存右侧subcategory(顶部)的数据
                
                currentIndex:0,  // 记录leftnav点击的index值 
                currentType:'pop',  
                typeList:['pop','new','sell'],  // 定义商品类型的数据
                types:{
                    pop:'综合',
                    new:'新品',
                    sell:'精选'
                },
                goods: {        // 存放商品数据
                    pop: {
                        list: [],   // 流行选项  对应的数据
                    },
                    new: {      
                        list: [],   // 新款的数据
                    },
                    sell: {    
                        list: [],   // 精选的数据
                    }
                }
            }
        },
        created(){
            // 初始化时候获取数据
            this.getCategory()
        },
        methods:{
            // 初始化时候获取数据
            async getCategory(){
                // 请求左侧导航栏的数据 给leftNav渲染
                const result = await reqCategory()
                this.categorys = result.data.category.list
                // console.log(this.categorys)

                // 请求右侧的初始化数据
                this.getSubcategory()

                // 请求右侧下面的数据 渲染goodList组件 基于指定商品的miniWallKey值 
                // this.getCategoryDetail('pop')  // 页面初始化时请求pop类型的数据
                // this.getCategoryDetail('sell')
                // this.getCategoryDetail('new')
                Object.keys(this.types).forEach(this.getCategoryDetail)
            },

            // 当点击不同左侧导航栏触发 接收子组件传递的点击index
            itemClick(index){
                if(index===this.currentIndex)return  //  当已经点击了左侧分类的按钮时候，第二次就不再获取数据了
                // 在本组件用以一个值记录着你当前点击左侧导航栏下的categorys数组对应的索引
                this.currentIndex = index
                // 点击的时候获取上面的数据  CategoryGridView渲染 
                this.getSubcategory()

                // 简写 请求右侧下面的数据 渲染goodList组件 基于指定商品的miniWallKey值 
                Object.keys(this.types).forEach(this.getCategoryDetail)
            },

            // 点击切换控制条获取数据
            tabClick(index){
                // 点击的时候改变typeList的值 根据商品类型不同然后显示不同的数据
                this.currentType = this.typeList[index]
            },

            async getSubcategory(){
                // console.log(this.currentIndex)
                // 根据点击的索引获得categorys数组中的下标 解构maitKey用来获取数据 
                const {maitKey} = this.categorys[this.currentIndex]
                const result = await reqSubcategory(maitKey)
                this.subcategory = result.data.list
                
            },
            // 推荐的数据 右侧下面
            async getCategoryDetail(type){
                // miniWallKey值是在categorys中的，那么你点击正在流行，那么就获取流行页的推荐数据
                // currentIndex记录着点击左侧导航来的索引，那么点了谁就获取谁的对象上的miniWallkey然后发请求拉数据
                const {miniWallkey} = this.categorys[this.currentIndex]
                // console.log(miniWallkey)
                const result = await reqCategoryDetail(miniWallkey,type)
                // console.log(result)
                this.goods[type].list = result   // 将结果赋值给goods对应的数组中
            }            
        },
        components:{
            CategoryLeftNav,
            CategoryGridView,
            TabControl,
            GoodsList
        }

    }
    /**
     * 绑定事件 接收navleft组件传递当前点击的li的索引，并且在本组件中存储,然后根据这个索引找到categorys
     * 中指定的索引，然后获取该对象上的maitKey 进行发起请求获得数据
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

// 当使用了两个相同的better-scroll组件的时候 那么类名会重复  所以需要给他们不同的类名
// 在本组件中重新给定类名

// 设置滚动区域的高度
.container1{
    position: fixed;
    top: 44px;
    bottom: 48px;
    width: 100px;
}

.container2{
    position: fixed;
    top: 44px;
    bottom: 48px;
    // 让盒子的left值距离左侧100px  然后right铺满值最右边 
    left: 100px;
    right: 0;
}

</style>