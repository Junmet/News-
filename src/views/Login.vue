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
        <!-- <Logintextarea type="text" placeholder="请输入邮箱/用户名" :value="user.username" @input="logintext"></Logintextarea><br> -->
        <!-- <Logintextarea type="password" placeholder="请输入邮箱/用户名" :value="user.password"  ></Logintextarea> -->
        <Logintextarea type="text" placeholder="请输入电话号码" v-model="user.username" :rules="/^1\d{10}$/" msg="手机号码不正确，请输入11号码"></Logintextarea><br>
        <Logintextarea type="password" placeholder="请输入用户密码" v-model="user.password"></Logintextarea>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <LoginButton class="btn" @click="loginBtn" text="登录提交" ></LoginButton>
    </div>
  </div>
</template>
<script>
// 按钮组件封装的引入
import LoginButton from '@/components/LoginButton'
// 文本框组件封装的引入
import Logintextarea from '@/components/Logintextarea'
// 引入发送请求封装文化user.js  调用里面的userLogin的方法
import { userLogin } from '@/api/user'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    LoginButton,
    Logintextarea
  },
  methods: {
    loginBtn () {
      // console.log('123')
      // console.log(this.user)
      userLogin(this.user)
        .then((res) => {
          console.log(res)
          if (res.data.message === '登录成功') {
            // 登录成功后获取token值  本地存储起来
            localStorage.setItem('token', res.data.data.token)
            this.$toast.success('恭喜登录成功')
            // 页面跳转
            this.$router.push({ path: `/personal/:${res.data.data.user.id}` })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
          // 发送请求失败的时候提示
          this.$toast.fail('登录失败，请重试！')
        })
    },
    logintext (data) {
      this.user.username = data
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
