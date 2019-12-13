import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'

import personal from '@/views/personal.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: personal
    }
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.path.indexOf('/personal/') === 0) {
    // 获取token值  判断
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})
export default router
