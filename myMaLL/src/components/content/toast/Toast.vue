<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message:"",
      isShow:false
    }
  },
  methods: {
    show(message,time=1000){ // 设置默认值 可传可不传
      this.isShow = !this.isShow
      this.message = message
      let timer = setTimeout(()=>this.isShow=false,time)
    }
  }
};
</script>

<style lang='less' scoped>
.toast {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 175px;
  height: 35px;
  background-color: #000000c4;
  text-align: center;
  line-height: 35px;
  color: #fff;
}
</style>
