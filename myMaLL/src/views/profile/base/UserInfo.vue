<template>
<div class="user-info">
    <!-- 未登录状态 -->
    <section class="user-info-top" v-if="this.userInfo.length===0">
        <div class="img-wrap">
            <img src="~assets/img/profile/login.svg" alt="">
        </div>
        <div class="info" @click="handleLogin">登录/注册</div>
    </section>

    <!-- 登录显示 -->
    <section class="user-info-top" v-else>
        <div class="img-wrap">
            <img src="~assets/img/profile/avatar.jpg" alt="">
        </div>
        <div class="info" @click="handleLogin">{{userInfo[0].username}}</div>
    </section>

    <ul class="account">
        <li class="account-item">
            <div class="number">
                <span class="balance">0.00</span>元
            </div>
            <div class="account-info">我的余额</div>
        </li>
        <li class="account-item">
            <div class="number">
                <span class="balance">0</span>个
            </div>
            <div class="account-info">我的优惠</div>
        </li>
        <li class="account-item">
            <div class="number">
                <span class="balance">0</span>分
            </div>
            <div class="account-info">我的积分</div>
        </li>
    </ul>

</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "UserInfo",
    data() {
        return {};
    },
    methods: {
        handleLogin() {
            this.$router.push('/login')
        }
    },
    computed:{
        ...mapState(['userInfo'])
    }
};
</script>

<style lang='less' scoped>
.user-info {
    .user-info-top {
        display: flex;
        background-color: #faa015;
        padding: 15px;
        .img-wrap {
            width: 60px;
            height: 60px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .info {
            margin: 21px 0 0 10px;
            color: #fff;
        }
    }
    .account {
        display: flex; // height: 100px;
        background-color: #fff; // border-bottom: 10px solid #eaeaea;
        .account-item {
            width: 33.33%;
            text-align: center;
            color: #666;
            font-size: 13px;
            padding: 18px 0 18px; // 给了padding 高度就不需要给了 也不用考虑居中问题
            .balance {
                color: #ff5f3e;
                font-size: 24px;
                font-weight: 700;
            }
            .account-info {
                margin-top: 10px;
            }
        }
    }
}
</style>
