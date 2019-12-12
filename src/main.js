import Vue from 'vue'

import App from './App.vue'

import '@/style/reset.css'

import router from '@/router/router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
