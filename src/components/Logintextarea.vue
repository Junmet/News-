<template>
  <input class="inp"
  :type="type"
  :value="value"
  :class="{error:!iscolor,success:iscolor}"
  @input="logintextarea"
  @blur='handlerblur'>
</template>

<script>
export default {
  // rules:文本框的验证规则
  // 接收父亲传来的数据
  // msg:输入不合法时的提示文本
  props: ['type', 'value', 'rules', 'msg'],
  data () {
    return {
      iscolor: false
    }
  },
  mounted () {
    // 判断是否value有值
    // this.iscolor = this.value?true:false
    // this.iscolor = !!this.value
  },
  methods: {
    // 1.先判断文本框的响应内容
    // 输入文本框响应变化
    logintextarea (event) {
      // console.log(event.target.value)
      // console.log(event)
      let value = event.target.value
      this.$emit('input', value)
      // 当有正则表达式的时候 就进行下面判断  如果没有就执行this.iscolor=this.valur?true:false
      // 针对密码输入框完善代码
      if (this.rules) {
        if (this.rules.test(value)) {
          this.iscolor = true
        } else {
          this.iscolor = false
        }
      } else {
        // 判断密码输入框是否有输值
        // this.iscolor=this.valur?true:false
        this.iscolor = !!this.value
      }
    },
    // 2.文本框失去焦点的弹窗响应
    handlerblur (event) {
      // 取反 输入不正确的时候给提示
      if (this.rules && !this.rules.test(event.target.value)) {
        // console.log(this.msg)
        this.$toast(this.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inp{
  width: 314*100vw/360;
  height: 40*100vw/360;
  border: none;
  outline: none;
  border-bottom: 2px solid rgb(117,117,117);
  font-size: 18px;
  margin: 5px 0;
  background-color: transparent;
}
.error{
    border-bottom-color:red;
}
.success{
    border-bottom-color:green;
}
</style>
