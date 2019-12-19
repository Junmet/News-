<template>
  <div class="comment">
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />

      <span class="comment" @click="$router.push({path:`/comments/${application.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{application.comment_length}}</em>
      </span>

      <i class="iconfont iconshoucang " :class="{application:application.has_star}" @click="iconshoucangBtn" ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" :placeholder="placeholder"></textarea>
        <div>
            <span @click="send">发送</span>
            <br>
            <!-- <span @click='isFocus=false'>取消</span> -->
            <span @click='replacement'>取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { collectingArticle, sendComment } from '@/api/newsCat'
export default {
  // 获取父组件的application数据
  props: ['application', 'article'],
  data () {
    return {
      isFocus: false,
      placeholder: ''
    }
  },
  watch: {
    article () {
      // console.log(222)
      if (this.article) {
        // console.log(111)
        this.isFocus = true
        this.placeholder = '@' + this.article.user.nickname
      }
    }
  },
  methods: {
    // 发表文章
    async send () {
      // 评论内容
      let data = {
        content: this.$refs.commtext.value
      }
      if (this.article) {
        data.parent_id = this.article.id
      }
      let res = await sendComment(this.application.id, data)
      // console.log(res)
      if (res.data.message === '评论发布成功') {
        this.$toast.success(res.data.message)
        this.replacement()
        this.isFocus = false
        // 通知父组件进行数据的刷新
        this.$emit('refresh')
        this.$refs.commtext.value = ''
        this.placeholder = ''
        // 发布成功后页面回到顶部
        // window.scrollTo(0, 0)
      }
    },
    // 取消评论 子传父  告诉父亲给点了  清空数据
    replacement () {
      // 关闭文本弹框
      this.isFocus = false
      this.$emit('cancelComment')
    },
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
    // 收藏功能
    async iconshoucangBtn () {
      let res = await collectingArticle(this.application.id)
      console.log(res)
      this.application.has_star = !this.application.has_star
      this.$toast.success(res.data.message)
      console.log(this.application.id)
      console.log(this.application)
    }
    // 子传父 收藏功能写法
    // iconshoucangBtn () {
    //   this.$emit('click')
    // }
  }
}
</script>

<style lang='less' scoped>
.application{
    color: #f00
}
.comment{
    position: fixed;
    bottom: 0;
    left: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
