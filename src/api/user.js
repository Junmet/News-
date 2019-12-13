// 这个文件是来处理users表相关业务的

// 1.引入
import axios from '@/utils/axios'

// 2.实现登录验证
export const userLogin = (data) => {
//   axios返回的是一个promise对象
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 3.获取用户详情
export const getUserInfo = (id) => {
  return axios({
    url: `/user/:${id}`
  })
}
