import StorageKeys from '../util/setting/storage-keys'

// setup state giỏ hàng trên store
const stateCart = {
  cart: JSON.parse(localStorage.getItem(StorageKeys.CART)) || [],
  total: 0
}

// Khai báo reduce
const cartReducer = (state = stateCart, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      {
        const { product, qty } = action.payload
        const newProduct = {
          ...product,
          qty: qty
        }
        const index = state.cart.findIndex((item) => {
          return item.id === product.id
        })
        if (index !== -1) {
          state.cart[index].qty++
        } else {
          state.cart.push(newProduct)
          state.total++
        }
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart))
        alert('Add product success')
      }
      break
    case 'DELETE_PRODUCT':
      {
        const { id } = action.payload
        const index = state.cart.findIndex((item) => {
          return item.id === id
        })
        if (index !== -1) {
          state.cart[index].qty--
          if (state.cart[index].qty <= 0) {
            state.cart = state.cart.filter((item) => item.id !== id)
            state.total--
          }
        }
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart))
      }
      break
    case 'REMOVE_PRODUCT':
      {
        const { id } = action.payload
        state.cart = state.cart.filter((item) => item.id !== id)
        state.total--
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart))
      }
      break
    default:
      return { ...state }
  }
  return { ...state }
}

export default cartReducer
