<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="followThisUser" :class='{application:application.has_follow}'>{{application.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{application.title}}</div>
      <div class="desc">
        <span>{{application.user && application.nickname}}</span> &nbsp;&nbsp;
        <span>2019-12-9</span>
      </div>
      <div class="content" v-html="application.content" v-if="application.type===1"></div>
      <video v-if="application.type===2" :src="application.content" controls></video>
      <div class="opt">
        <span class="like" :class="{application:application.has_like}" @click="giveArticles">
          <van-icon name="good-job-o" />
          {{application.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <!-- 遍历getcomment数组  然后把每一条数据  用点语法  动态渲染到评论模块 -->
      <div class="item" v-for="(value,index) in getcomment" :key="index">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nikename}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{value.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 通过父传子改变字体图标的样式  子传父来发送请求  实现收藏功能 -->
    <!-- <commentArea :application="application" @click="btn"></commentArea> -->
    <!-- 父传子  实现收藏功能 -->
    <commentArea :application="application"></commentArea>
  </div>
</template>

<script>
import commentArea from '@/components/commentArea'
import { getArticleDetail, giveArticle, getcomments } from '@/api/newsCat'
import { followUser, unfollowUser } from '@/api/user'
export default {
  components: {
    commentArea
  },
  data () {
    return {
      application: {},
      getcomment: []
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getArticleDetail(this.$route.params.id)
    console.log(res)
    if (res.status === 200) {
      this.application = res.data.data
      // console.log(this.application)
      // 发送请求
      let ress = await getcomments(this.application.id, { pageSize: 5 })
      // console.log(ress)
      this.getcomment = ress.data.data
      console.log(this.getcomment)
      // 数据重造   修改：给图片添加基地址  使用映射的方法
      this.getcomment.map(value => {
        value.user.head_img = localStorage.getItem('baseAddress') + value.user.head_img
        return value
      })
    }
    console.log(this.application)
  },
  methods: {
    // 关注功能
    async followThisUser () {
      let res
      if (this.application.has_follow === true) {
        // 关注用户 已关注
        res = await unfollowUser(this.application.user.id)
        // console.log(res)
      } else {
        // 取消关注 未关注
        res = await followUser(this.application.user.id)
      }
      // 提示
      this.$toast.success(res.data.message)
      // 取反  默认是关注没有颜色  点击关注 显示已关注  改变颜色
      this.application.has_follow = !this.application.has_follow
    },
    async giveArticles () {
      let res = await giveArticle(this.application.id)
      console.log(res)

      if (res.data.message === '点赞成功') {
        this.application.like_length++
      } else if (res.data.message === '取消成功') {
        this.application.like_length--
      }
      this.application.has_like = !this.application.has_like
      this.$toast.success(res.data.message)
    }
    // 根据子传父的方法实现收藏功能
    // async btn () {
    //   let res = await collectingArticle(this.application.id)
    //   console.log(res)
    //   this.application.has_star = !this.application.has_star
    //   this.$toast.success(res.data.message)
    // }

  }
}
</script>

<style lang='less' scoped>
.articaldetail{
  padding-bottom: 50px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border:1px solid #ccc;
    color: #333;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.application{
        color: #fff;
        background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
  video{
      width: 100%;
      margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    &.application{
      color:red;
      border: 1px solid red !important
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}

/deep/.photo{
    img {
        width: 100%!important;
        display: block;
    }
}
</style>
