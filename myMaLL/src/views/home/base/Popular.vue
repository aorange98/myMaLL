<template>
    <div class="popular">
        <img src="~assets/img/home/popular.jpg" alt />
    </div>
</template>

<script>
export default {
    name: "Popular"
};
</script>

<style lang='less' scoped>
.popular {
    width: 100%;
    height: 0; // 解决抖屏 图片虽然是本地的
    padding-bottom: 72.53%; // 这个用来占位 272/375 = 0.7253
    img {
        width: 100%;
    }
}
</style>
