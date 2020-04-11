<template>
  <div class="profile-login">
    <div class="titile">My Account</div>
    <div class="login-wrap">
      <table>
        <tr>
          <td>用户名</td>
          <td>
            <input type="text" class="userid" v-model="username" />
          </td>
        </tr>
        <tr>
          <td>密码</td>
          <td>
            <input type="password" class="pwd" v-model="password" />
          </td>
        </tr>
      </table>
      <div @click="handleLogin" class="btn">登录/注册</div>
      <div @click="handleExit" class="exit">退出</div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "api/userInfo";
import { mapMutations } from "vuex";
export default {
  name: "ProfileLogin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations(['userInfoState']),

    async handleLogin() {
      let userInfo = {
        username: this.username,
        password: this.password
      };
      if (!userInfo.username == "" && !userInfo.password == "") {
        const result = await reqLogin(userInfo);
        // console.log(result)
        const {status,msg,data} = result
        // console.log(status,msg,data)
        if(status===0){   // 如果status为0 要么就是注册成功 要么就是登录成功
          // 登陆成功仓库保存 因为退出后就不能有登录状态 本地存储数据改变不是响应式的
          localStorage.setItem('userInfo',JSON.stringify(data))
          this.userInfoState(data)
          this.$router.push('/profile')
          this.clear()
        }else{    // 否则就是已存在账号和出入错误
          alert(msg)
          this.clear()
        }
      } else {
          alert("账号和密码不能为空！");
      }
    },
    clear(){
      this.username = ''
      this.password = ''
    },
    handleExit(){
      // 点击退出 修改仓库的数据 
      this.userInfoState([])
      this.$router.push('/profile')
    }

  }
};
</script>

<style lang='less' scoped>
.profile-login {
  height: 100vh;
  background: url("~assets/img/profile/loginbgc.jpg") no-repeat;
  background-size: 100% 100%;
  .titile {
    text-align: center;
    padding-top: 120px;
    font-size: 20px;
    color: #fff;
  }
  .login-wrap {
    position: relative;
    width: 300px;
    margin: 50px auto;
    height: 300px;
    background-color: #ffffff1a;
    border-radius: 5px;
    box-shadow: 3px -2px 12px 1px lightgrey;
    table {
      position: relative;
      width: 100%;
      height: 150px;
      top: 10px;
      th,
      td {
        text-align: center;
        vertical-align: middle;
      }
      .userid,
      .pwd {
        width: 200px;
        height: 25px;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        background-color: transparent;
        outline: none; // 去除选中状态边框
        font-size: 18px;
      }
    }
    .btn {
      width: 280px;
      margin: 30px auto 0;
      background-color: #faa015;
      border-radius: 5px;
      line-height: 50px;
      text-align: center;
    }
    .exit{
      line-height: 50px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
