import axiosClient from './axiosClient'

export const cartAPI = {
  createCart: function (data) {
    const url = 'product/cart'
    return axiosClient.post(url, data)
  }
}
