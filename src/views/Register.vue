<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <Logintextarea type="text" placeholder="请输入用户号码" v-model="user.username"></Logintextarea><br>
        <Logintextarea type="password" placeholder="请输入用户密码" v-model="user.password"></Logintextarea>
        <Logintextarea type="text" placeholder="请输入用户昵称" v-model="user.nickname"></Logintextarea>
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <LoginButton class="btn" @click="registerBtn" text="注册" ></LoginButton>
    </div>
  </div>
</template>
<script>
// 按钮组件封装的引入
import LoginButton from '@/components/LoginButton'
// 文本框组件封装的引入
import Logintextarea from '@/components/Logintextarea'
// 引入发送请求封装文化user.js  调用里面的userRegister的方法
import { userRegister } from '@/api/user'
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    LoginButton,
    Logintextarea
  },
  methods: {
    async  registerBtn () {
      let res = await userRegister(this.user)
      console.log(res)
      if (res.data.message === '注册成功') {
        this.$toast.success('注册成功')
      } else {
        this.$toast.fail('注册失败，请重试！')
      }
    }
  }
}
</script>

<style lang="less" >
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
