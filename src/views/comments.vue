<template>
<div class="comments">
<personalHeader title="精彩评论">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
</personalHeader>
 <div class="commentList">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="open(comment)">回复</span>
        </div>
          <comment v-if="comment.parent" :comment="comment.parent" @fastrevert="open (comment)"></comment>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <!-- @cancelComment="alterParameter=null" 点击完对象传过去一次  就存在了  应该清空一次  当点击取消的时候清空  才能多次触发 -->
    <commentArea :application="application" :article="alterParameter" @cancelComment="alterParameter=null" @refresh="init"></commentArea>
  </div>
</template>

<script>
import commentArea from '@/components/commentArea'
import comment from '@/components/comment_item'
import personalHeader from '@/components/personalHeader'
import { getcomments, getArticleDetail } from '../api/newsCat'
export default {
  data () {
    return {
      commentList: [],
      application: [],
      alterParameter: ''
    }
  },
  //   点击回复
  methods: {
    open (comment) {
      this.alterParameter = comment
    },
    // 刷新页面数据
    async init () {
      // console.log(this.$route.params.id)
      let id = this.$route.params.id
      let res = await getcomments(id, { pageSize: 30 })
      // console.log(res)
      this.commentList = res.data.data.map(value => {
        value.user.head_img = localStorage.getItem('baseAddress') + value.user.head_img
        return value
      })
      //   console.log(this.commentList)
      // 根据id获取文章详情
      let ress = await getArticleDetail(this.$route.params.id)
      //   console.log(ress)
      this.application = ress.data.data
    }

  },
  components: {
    personalHeader,
    comment,
    commentArea
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang='less' scoped>
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
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
</style>
