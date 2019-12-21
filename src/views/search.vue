<template>
  <div class="search">
    <div class="header">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="userkey"  placeholder="请输入搜索关键词" shape="round" >
      </van-search>
      <span @click="search(userkey)">搜索</span>
    </div>
    <div class="searchList">
        <h2>历史记录</h2>
        <p v-for="(value,index) in historyList" :key="index"  @click="search(value)" >{{value}}</p>
    </div>
    <div class="searchResult">
        <h2>搜索结果</h2>
        <p v-for="value in searchList" :key="value.id" @click="$router.push({path:`/articleDetail/${value.id}`})">{{value.title}}</p>
    </div>
  </div>
</template>

<script>
import { searchArticle } from '@/api/newsCat'
export default {
  data () {
    return {
      userkey: '',
      searchList: [],
      historyList: []
    }
  },
  mounted () {
    // 进来页面自动获取本都存储的搜索关键字  然后渲染到页面上  这些数据都是从我们搜索中的输入的关键字去获取的
    // 获取的是字符串  所以要转成对象才可以用点的语法去点属性，让每次进入搜索页的时候自动渲染页面的数据
    this.historyList = JSON.parse(localStorage.getItem('keywords') || '[]')
  },
  methods: {
    async search (item) {
      if (item.trim() === '') {
        this.$toast.fail('请输入关键字')
        return
      }
      let res = await searchArticle({ keyword: item || this.userkey })
      console.log(res)
      if (res.status === 200) {
        this.searchList = res.data.data

        // 1.获取当前的可能拥有的本地存储数据 转成对象的格式
        let arr = JSON.parse(localStorage.getItem('keywords') || '[]')
        // 2.操作：将当前搜索关键字添加到数组
        // 2.1 判断当前关键字是否已存在，如果存在 ，则先删除，再添加
        let index = arr.indexOf(item) // 找到相同的数据
        if (index !== -1) { // 说明这个关键字已经存在
        // 如果输入了相同的关键字就会把对应的另外一个根据索引值删除
          arr.splice(index, 1)
        //   console.log(arr)
        }
        // 2.2 如果超出了指定的记录数量，那么应该删除最先存储的记录，再添加
        if (arr.length >= 8) {
          // 删除数组最后一个
          arr.splice(arr.length - 1, 1)
        }
        // 前添加
        arr.unshift(item)
        //   3.将搜索关键字存储到本地存储:转换 + 存储 arr是对象  要把arr转成字符串
        localStorage.setItem('keywords', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header{
    height: 54*100vw/360;
    display: flex;
    align-items: center;
    background-color: #eee;
    border-bottom: 1px solid #bbb;
    .van-search{
        flex: 1;
        height: 54*100vw/360;
        background-color: #eee!important;
    }
    >span{
        padding: 0 10px;
    }
}
.searchList,.searchResult{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    h2{
        line-height: 40px;
        font-weight: bold;
    }
    p {
        line-height: 30px;
        text-decoration: underline;
    }
}
</style>
