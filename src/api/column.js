// 这个文件主要用来处理与栏目分类相关的业务
// 1.引入axios

import axios from '@/utils/axios'

// 获取栏目数据 默认get请求
export const getcolumnData = () => {
  return axios({
    url: '/category'
  })
}
