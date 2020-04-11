import BackTop from 'components/content/backtop/BackTop.vue'

// 混入
export const backTopMixin = {
    data(){
        return {
            isShow:false // 初始不显示返回顶部组件
        }
    },
    methods: {
        backTop(){
            this.$refs.scroll.scrollTo(0, 0, 300);
        }
    },
    components:{
        BackTop
    }

}


