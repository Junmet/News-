<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
       <van-icon name="smile-o" class="icon" @click="jump"/>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for='(value,index) in cateList' :key='index'>
        <!-- 上拉加载 -->
        <van-list v-model="value.loading" :finished="value.finished" :offset='10' :immediate-check='false' finished-text="没有更多了"  @load="onLoad">
          <!-- 下拉刷新 -->
           <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <!-- 动态渲染当前栏目的新闻数据 -->
          <newsModule v-for='(value,index) in value.postList' :key='index' :value='value'></newsModule>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
    <div class="newsList"></div>
  </div>
</template>

<script>
import { getcolumnData } from '@/api/column'
import { getArticleList } from '@/api/newsCat'
import newsModule from '@/components/newsModule'
export default {
  components: {
    newsModule
  },
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      cateList: []
    }
  },
  watch: {
    active () {
      // 获取当前栏目的新闻数据
      // 如果当前栏目的新闻列表数据长度为0,说明还没有获取过这个栏目的新闻数据，那么就需要发起请求获取数据
      // 如果已经有数据，则无需再次发起请求
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  async mounted () {
    // 获取所有栏目数据
    let res = await getcolumnData()
    // console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      // 对数据进行改造，添加能够满足业务需求的成员
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [], // 当前栏目的新闻列表数据 存放对应栏目的数据
          pageIndex: 1, // 当前栏目的页码 主页面的页码数字
          pageSize: 11, // 当前栏目每页所显示的新闻数量  页面的数据量

          // -------------下面是添加的新成员  来处理上拉加载数据效果-----------
          loading: false, // 当前栏目更多数据加载状态 ， 默认为不在加载数据
          finished: false, // 数据是否已经完毕 加载完毕 ， 默认为没有完毕
          isLoading: false // 标记是否处于下拉刷新的状态，默认为false
        }
      })
      // console.log(this.cateList)
      this.getPostList()
    }
  },
  methods: {
    // 获取栏目的新闻数据
    async getPostList () {
      // 获取默认栏目的新闻数据
      let res = await getArticleList({
        // 页码数
        pageIndex: this.cateList[this.active].pageIndex,
        // 数据量
        pageSize: this.cateList[this.active].pageSize,
        // 对应的数据id
        category: this.cateList[this.active].id
      })
      console.log(res)
      console.log(this.cateList[this.active].postList)

      // 新闻数据存储在当前栏目的postList中，每个栏目都有一个单独的文章列表数组
      // this.cateList[this.active].postList = res.data.data

      this.cateList[this.active].postList.push(...res.data.data)

      // 本次获取数据之后，将loading重置为false  数据更新完毕设置成false  不在加载
      this.cateList[this.active].loading = false

      // 重置isLoading,让下拉刷新的提示消失
      this.cateList[this.active].isLoading = false

      // 判断是否数据已经完全加载完毕
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        // 数据加载完毕，不在加载         数据全部加载完毕的时候，直接把finished设置成为true
        this.cateList[this.active].finished = true
      }
    },
    // 上拉加载更多的数据
    onLoad () {
      // 加载下一页数据  1.页码加1
      this.cateList[this.active].pageIndex++
      // 2.根据新的页码参数获取数据
      setTimeout(() => {
        this.getPostList()
      }, 2000)
    },
    onRefresh () {
      // console.log(11)
      // 重置页码为1
      this.cateList[this.active].pageIndex = 1

      setTimeout(() => {
        // 清空数据
        this.cateList[this.active].postList.length = 0
        // 获取数据
        this.getPostList()
      }, 2000)

      // 重置为False的作用就是让这个栏目可以重新的上拉加载更多数据
      this.cateList[this.active].finished = false
    },
    jump () {
      this.$router.push({ path: `/personal/${window.localStorage.getItem('loginid')}` })
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size:30px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    a{
      color: #fff
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
