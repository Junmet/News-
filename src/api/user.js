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
    // 我们当前所请求的api是需要授权的api,所以要根据后台的要求传入用户状态
    // 这个状态需要根据后台的严格要求进行传递
    // 后台要求使用：Authorization做为键,token做为值
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // },   因为每次请求都要写这行代码不方便  所以用拦截器  在发送请求的时候拦截  有token的时候直接加headers
    // 拦截器写在axios封装里面

    url: `/user/${id}`
  })
}

// 4.编辑用户信息
export const editPersonalInformation = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 5.用户注册
export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 6.关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
// 7.取消关注
export const unfollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
