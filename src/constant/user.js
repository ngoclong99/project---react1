import StorageKeys from '../util/setting/storage-keys'

const checkToken = () => {
  const token = localStorage.getItem(StorageKeys.TOKEN)
  return token ? true : false
}
const getUser = () => {
  const user = JSON.parse(localStorage.getItem(StorageKeys.AUTH))
  return user
}
const getBrand = () => {
  const brand = JSON.parse(localStorage.getItem('brand'))
  return brand
}

const getBrandById = (id) => {
  const brand = JSON.parse(localStorage.getItem('brand'))
  return brand.find((e) => e.id === id)
}

const getCategory = () => {
  const category = JSON.parse(localStorage.getItem('category'))
  return category
}

const getCategoryById = (id) => {
  const brand = JSON.parse(localStorage.getItem('category'))
  return brand.find((e) => e.id === id)
}
export { checkToken, getUser, getBrand, getCategory, getBrandById, getCategoryById }
