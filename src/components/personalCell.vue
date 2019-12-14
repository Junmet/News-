<template>
  <div class="personalCell" @click="cellclick">
      <div class="left">{{title}}</div>
      <div class="right">{{desc}}
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc'],
  methods: {
    cellclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang = "less" scoped>
.personalCell{
    height:60*100vw/360;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #CCC;
    padding:0 10px;
    margin:0 10px;
    .right{
        color: #aaa;
        font-size: 13px;
    }
}
</style>
