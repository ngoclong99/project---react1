import axiosClient from './axiosClient'

export const blogAPI = {
  getBlogList: function () {
    const url = 'blog'
    return axiosClient.get(url)
  },
  getBlog: function (id) {
    const url = `blog/detail/${id}`
    return axiosClient.get(url)
  },
  postComment: function (id, data) {
    const url = `blog/comment/${id}`
    return axiosClient.post(url, data)
  }
}
