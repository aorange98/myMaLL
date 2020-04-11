<template>
<div class='common-nav-bar'>
    <div class="left">
        <slot name="left" />
    </div>
    <div class="middle">
        <slot name="middle" />
    </div>
    <!-- 占位 使middle css flex：1 保持居中 -->
    <div class="right">
        <slot name="right" />
    </div>
</div>
</template>

<script>
export default {
    name: "CommonNavBar",
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.common-nav-bar{
    position: relative;
    display: flex;
    height: 44px;
    // background-color: #fabc15; // 背景颜色可以在使用该组件的时候再定义
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
    font-family: "Times New Roman", Georgia, Serif;
    font-weight: bold;
    text-align: center;
    line-height: 44px;
    .left,.right{
        width: 60px;
    }
    .middle{
        flex:1  // 居中 占满所能占满盒子的宽度
    }
}
</style>