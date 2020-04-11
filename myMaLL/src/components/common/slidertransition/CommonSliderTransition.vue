<template>
  <div class="SliderTransition">
    <!-- 插槽 使用后就会直接替换掉slot这个标签 -->
    <transition :name="name">
      <slot></slot>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CommonSliderTransition",
  data() {
    return {};
  },
  props: {
    name: {
      type: String
    }
  },
};
</script>

<style lang="less" scoped>
// 点击向右 向左滑动
.left-enter-active {
  transform: translateX(100%);
  transition: 1s; // 过渡
}
.left-enter-to {
  transform: translateX(0px);
}

.left-leave-active {
  // 离开过程中
  transform: translateX(0px); // 平移
  transition: 1s; // 过渡
}
.left-leave-to {
  // 离开完毕
  transform: translateX(-100%); // 平移
}

// 点击左 向右滑动
.right-enter-active {
  transform: translateX(-100%);
  transition: 1s; // 过渡
}
.right-enter-to {
  transform: translateX(0px);
}

.right-leave-active {
  // 离开过程中
  transform: translateX(0px); // 平移
  transition: 1s; // 过渡
}
.right-leave-to {
  // 离开完毕
  transform: translateX(100%); // 平移
}
</style>