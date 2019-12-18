import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'

import personal from '@/views/personal.vue'

import personalInformation from '@/views/personalInformation.vue'

import Register from '@/views/Register.vue'

import Index from '@/views/index.vue'

import ArticleDetail from '@/views/articleDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: personal
    },
    {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    },
    {
      name: 'personalInformation',
      path: '/personalInformation/:id',
      component: personalInformation
    }
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.path.indexOf('/personal/') === 0) {
    // 获取token值  判断
    let token = localStorage.getItem('token')
    if (token) { // 有token这个值说明登陆过
      next()
    } else { // 如果没有就跳转页面就跳去登录页 登录
      next({ name: 'login' })
    }
  } else { // 如果不需要授权的页面自由访问
    next()
  }
})
export default router
