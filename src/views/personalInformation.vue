<template>
  <div class="personalInformation">
<personalHeader title="编辑资料">
    <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    <span slot="right" @click="quit" style=" color: #aaa; font-size: 14px">退出</span>
</personalHeader>
  <div class="head">
      <img alt :src="currentPP.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
 <personalCell title="昵称" :desc="currentPP.nickname" @click="nickshow=!nickshow"></personalCell>
 <van-dialog v-model="nickshow" title="" show-cancel-button @confirm='updateNickname'>
    <van-field required  label="昵称" placeholder="请输入昵称" :value="currentPP.nickname" ref="nickname" />
</van-dialog>

 <personalCell title="密码" desc="******"  @click="cipher=!cipher"></personalCell>
  <van-dialog v-model="cipher" title="修改密码" show-cancel-button @confirm='amendpassword' :before-close="beforeClose">
    <van-field required  label="原密码" placeholder="请输原密码" ref="wornpassword" />
    <van-field required  label="新密码" placeholder="请输入新密码" ref="newpassword" />
</van-dialog>

 <personalCell title="性别" :desc="currentPP.gender===1?'男':'女'" @click="gendershow=!gendershow" ></personalCell>
 <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm='amendgender'>
<van-picker :columns="['女','男']" :default-index="currentPP.gender" @change="onChange"/>
</van-dialog>

  </div>
</template>

<script>
import personalCell from '@/components/personalCell'
import personalHeader from '@/components/personalHeader'
import { getUserInfo, editPersonalInformation } from '@/api/user'
import { uploadFile } from '@/api/uploadFile'
export default {
  data () {
    return {
      id: '',
      currentPP: {},
      nickshow: false,
      cipher: false,
      gendershow: false,
      replacegenderIndex: ''
    }
  },
  components: {
    personalHeader, personalCell
  },
  //  点击编辑页面的时候实现数据的填充
  async mounted () {
    this.id = this.$route.params.id
    // getUserInfo(id)
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      // 创建一个对象来接收 登录成功后获取数据
      // console.log(res)
      this.currentPP = res.data.data
      // 返回的数据可能没有图片数据，那么我们应该进行判断，如果有图片数据，则设置为当前图片，如果没有图片数据则需要设置为默认图片
      if (this.currentPP.head_img) {
        this.currentPP.head_img = localStorage.getItem('baseAddress') + this.currentPP.head_img
      } else {
        this.currentPP.head_img = localStorage.getItem('baseAddress') + '/uploads/image/default.png'
      }
    } else {
      this.$toast.fail('获取数据失败')
    }
  },
  methods: {
    // 点击跳转页面
    quit () {
      window.location.href = '#/login'
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      // 转二进制
      let Formdata = new FormData()
      Formdata.append('file', file.file)
      // console.log(Formdata)
      let res = await uploadFile(Formdata)
      // console.log(res)
      if (res.data.message === '文件上传成功') {
        // 4.实现用户头像数据的更新 让我们可以以同步的方式调用异步方法
        let consequence = await editPersonalInformation(this.id, { head_img: res.data.data.url })
        // console.log(consequence)
        if (consequence.data.message === '修改成功') {
          this.$toast.success('修改用户头像成功')
          // 为了即时刷新头像的显示
          this.currentPP.head_img = localStorage.getItem('baseAddress') + res.data.data.url
        } else {
          this.$toast.fail('修改用户头像失败')
        }
      } else {
        this.$toast.fail('文件上传失败，请重试')
      }
    },
    // 修改昵称
    async updateNickname () {
      // console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      // let nickname = this.$refs.
      let modifier = await editPersonalInformation(this.id, { nickname })
      console.log(modifier)
      if (modifier.data.message === '修改成功') {
        this.$toast.success('恭喜修改成功')
        this.currentPP.nickname = nickname
      } else {
        this.$toast.fail('修改失败，请重试')
      }
    },
    // 修改密码1
    async amendpassword () {
      let wornpassword = this.$refs.wornpassword.$refs.input.value
      let newpassword = this.$refs.newpassword.$refs.input.value
      // console.log(newpassword)
      if (wornpassword === this.currentPP.password) {
        let res = await editPersonalInformation(this.id, { password: newpassword })
        if (!/^\w+$/.test(newpassword)) {
          this.$toast.fail('请输入3~16位的新密码或者密码格式有误')
          return
        }
        if (res.data.message === '修改成功') {
          this.$toast.success('恭喜修改成功')
          this.currentPP.password = newpassword
          // localStorage.removeItem('baseAddress')
          localStorage.removeItem('token')
          this.$router.push({ name: 'login' })
        }
      } else {
        this.$toast.fail('原始密码输入错误')
      }
    },
    // 修改密码2
    beforeClose (action, done) {
      let wornpassword = this.$refs.wornpassword.$refs.input.value
      let newpassword = this.$refs.newpassword.$refs.input.value
      // console.log(action)
      if (action === 'confirm' && this.currentPP.password !== wornpassword) {
        done(false)
      } else if (action === 'confirm' && !/^\w+$/.test(newpassword)) {
        done(false)
      } else {
        done()
      }
    },
    // 修改性别
    async amendgender () {
      let replacegender = await editPersonalInformation(this.id, { gender: this.replacegenderIndex })
      // console.log(replacegender)

      if (replacegender.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        this.currentPP.gender = this.replacegenderIndex
      } else {
        this.$toast.fail('修改性别失败')
      }
    },
    onChange (picker, value, index) {
      // 0女 1男
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.replacegenderIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
 /deep/.van-uploader__upload{
    width: 102 / 360 * 100vw;
    height: 102 / 360 * 100vw;
     border-radius: 50%;
  }
 /deep/ .van-uploader{
 position: absolute;
  left: 50%;
  top:50%;
  transform:translate(-46%,-46%);
  opacity: 0;
 }
}
</style>
