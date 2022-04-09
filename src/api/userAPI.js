import axiosClient from './axiosClient'

export const userAPI = {
  register: function (data) {
    const url = 'register'
    return axiosClient.post(url, data)
  },
  login: function (data) {
    const url = 'login'
    return axiosClient.post(url, data)
  },
  update: function (id, data) {
    const url = `user/update/${id}`
    return axiosClient.post(url, data)
  },
  getAllProduct: function () {
    const url = 'user/my-product'
    return axiosClient.get(url)
  },
  getProduct: function (id) {
    const url = `user/product/${id}`
    return axiosClient.get(url)
  },
  addProduct: function (data) {
    const url = 'user/add-product'
    return axiosClient.post(url, data)
  },
  editProduct: function (data, id) {
    const url = `user/edit-product/${id}`
    return axiosClient.post(url, data)
  },
  deleteProduct: function (id) {
    const url = `user/delete-product/${id}`
    return axiosClient.get(url)
  },
  getCategoryBrand: function () {
    const url = 'category-brand'
    return axiosClient.get(url)
  }
}
