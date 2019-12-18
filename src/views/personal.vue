<template>
  <div class="personal">
    <router-link :to="'/personalInformation/'+currentUser.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
     <personalCell title="我的关注" desc="关注的用户" @click="$router.push({name:'myCenter'})"></personalCell>
     <personalCell title="我的跟帖" desc="跟帖/回复" ></personalCell>
     <personalCell title="我的收藏" desc="文章/视频"></personalCell>
     <personalCell title="设置" desc=""></personalCell>
     <LoginButton class="LoginButton" text="退出" @click="exitApp"></LoginButton>
  </div>
</template>

<script>
import personalCell from '@/components/personalCell'
// 按钮组件封装的引入
import LoginButton from '@/components/LoginButton'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      // 创建一个对象来接收 登录成功后获取数据
      currentUser: {}
    }
  },
  methods: {
    // 退出按钮
    exitApp () {
      localStorage.removeItem('baseAddress')
      localStorage.removeItem('token')
      this.$router.push({ name: 'index' })
    }
  },
  components: {
    personalCell, LoginButton
  },
  async mounted () {
    // 获取对应的id 渲染对应的数据
    let id = this.$route.params.id
    getUserInfo(id)
    let res = await getUserInfo(id)
    // console.log(this.$route)
    // console.log(res)
    if (res.data.message === '获取成功') {
      // 创建一个对象来接收 登录成功后获取数据
      this.currentUser = res.data.data
      // 返回的数据可能没有图片数据，那么我们应该进行判断，如果有图片数据，则设置为当前图片，如果没有图片数据则需要设置为默认图片
      if (this.currentUser.head_img) {
        this.currentUser.head_img = localStorage.getItem('baseAddress') + this.currentUser.head_img
      } else {
        this.currentUser.head_img = localStorage.getItem('baseAddress') + '/uploads/image/default.png'
      }
    } else {
      this.$toast.fail('获取数据失败')
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.LoginButton{
  margin: 50px auto;
}
</style>
