import Vue from 'vue'

import App from './App.vue'

import '@/style/reset.css'

import router from '@/router/router.js'
// 引入vant-ui
import { Toast, Uploader, Dialog, Field, Picker, Icon, Tab, Tabs } from 'vant'
// 挂载到Vue实例上
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
