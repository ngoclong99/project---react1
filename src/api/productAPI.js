import axiosClient from './axiosClient'

export const productAPI = {
  getProductHome: function () {
    const url = 'product'
    return axiosClient.get(url)
  },
  getProductList: function (params) {
    const url = 'product/list'
    return axiosClient.get(url, { params: { page: params.page } })
  },
  getProductById: function (id) {
    const url = `product/detail/${id}`
    return axiosClient.get(url)
  }
}
