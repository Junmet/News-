<template>
  <div class="focus">
    <personalHeader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </personalHeader>
    <div class="list">
      <div class="box" v-for="(value,index) in Personalinformation" :key="index">
        <img :src="value.head_img" alt />
        <div class="center">
          <p>{{value.nickname}}</p>
          <span>2019-12-9----{{index}}</span>
        </div>
        <span @click="unfollow(value.id,index)">取消关注</span>
      </div>

    </div>
  </div>
</template>

<script>
import personalHeader from '@/components/personalHeader.vue'
import { getMyCente, unfollowUser } from '@/api/user'
export default {
  components: {
    personalHeader
  },
  data () {
    return {
      // 个人用户关注信息
      Personalinformation: []
    }
  },
  async mounted () {
    let res = await getMyCente()
    // console.log(res)
    this.Personalinformation = res.data.data
    // console.log(this.Personalinformation)
    this.Personalinformation.map(value => {
      value.head_img = localStorage.getItem('baseAddress') + value.head_img
      return value
    })
    // console.log(this.Personalinformation)
  },
  methods: {
    async unfollow (id, index) {
      let ress = await unfollowUser(id)
      //   console.log(ress)
      if (ress.data.message === '取消关注成功') {
        this.$toast.success('取消关注成功')
        this.Personalinformation.splice(index, 1)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
