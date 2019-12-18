<template>
<div class="myCollect">
<personalHeader title="我的收藏">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
</personalHeader>
<!-- 循环遍历出每一条数据   动态绑定  把获取的数据传给子组件   达到使用子组件的时候数据动态渲染 -->
<newsModule v-for="value in collect" :key="value.id" :value="value"></newsModule>
</div>
</template>

<script>
import { getStar } from '@/api/newsCat'
import personalHeader from '@/components/personalHeader.vue'
import newsModule from '@/components/newsModule.vue'
export default {
  components: {
    personalHeader,
    newsModule
  },
  data () {
    return {
      collect: []
    }
  },
  //   获取收藏文章列表
  async mounted () {
    let res = await getStar()
    // console.log(res)
    this.collect = res.data.data
    console.log(this.collect)
  }
}
</script>

<style>

</style>
