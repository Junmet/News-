import Vue from 'vue'

import App from './App.vue'

import '@/style/reset.css'

import router from '@/router/router.js'
// 引入vant-ui
import { Toast } from 'vant'
// 挂载到Vue实例上
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
