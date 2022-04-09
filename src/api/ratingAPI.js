import axiosClient from './axiosClient'

export const ratingAPI = {
  rating: function (data) {
    const url = 'blog/rate/id'
    return axiosClient.post(url, data)
  },
  getRating: function (id) {
    const url = `blog/rate/${id}`
    return axiosClient.get(url)
  }
}
