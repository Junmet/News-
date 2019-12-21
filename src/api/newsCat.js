// 这个文件主要用于处理与新闻相关的业务
// 1.引入axios
import axios from '@/utils/axios'

// 2. 获取指定栏目的所有新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 3.根据文章id获取文章的详情
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 4.根据文章id点赞文章
export const giveArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 5.收藏文章
export const collectingArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 6.获取我的收藏文章列表
export const getStar = () => {
  return axios({
    url: '/user_star'
  })
}

// 7.评论列表
export const getcomments = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}

// 8.发布评论
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

// 9.根据关键字搜索
export const searchArticle = (params) => {
  return axios({
    url: '/post_search',
    params
  })
}
