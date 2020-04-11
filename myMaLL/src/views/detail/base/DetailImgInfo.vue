<template>
    <div class="detail-img-info" v-if="Object.keys(detailImgInfo).length">
        <div class="info-desc clear-fix">
            <i class="start"></i>
            <p class="desc">{{detailImgInfo.desc}}</p>
            <i class="end"></i>
        </div>
        <h4 class="info-key">{{detailImgInfo.detailImage[0].key}}</h4>
        <ul>
            <li v-for="(item, index) in detailImgInfo.detailImage[0].list" :key="index">
                <img :src="item" alt @load="imgLoad"/>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "DetailInfo",
    props: {
        detailImgInfo: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data(){
        return {
            count:0 // 存放图片的张数
        }
    },
    methods: {
        // 图片是异步的 是一张一张加载的 有几张图片就会触发几次onload
        imgLoad(){  // 等到所有的图片加载完成之后  告诉detail组件  获取滚动的具体位置
            this.count++    // 计算每次触发imgload的次数
            let length = this.detailImgInfo.detailImage[0].list.length
            // console.log(`加载了${this.count}`)
            if(this.count===length){    // 当完全加载完之后才发射这个事件
                this.$emit('imgLoad',this.count)
            }
        }
    }
};
</script>

<style lang='less' scoped>
.detail-img-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;  //设置底部颜色
    .info-desc {
        padding: 0 15px;
        .desc{
            padding: 15px 0;
            font-size: 15px;
            line-height: 18px;
        }
        .start,.end {
            position: relative;
            width: 90px;
            height: 1px;
            background-color: #a3a3a5;
        }
        .start {
            float: left;
            &::before {
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                background-color: #333;
                bottom: 0;
            }
        }
        .end {
            float: right;
            &::after {
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                background-color: #333;
                bottom: 0;
                right: 0;
            }
        }
        
    }
    .info-key {
        margin: 10px 0 10px 15px;
        color: #333;
        font-size: 15px;
    }
    li {
        width: 100%;
        img {
            display: block; // 解决img的间隙
            width: 100%;
        }
    }
}
</style>
