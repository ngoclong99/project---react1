import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import cartReducer from './../../redux/cartReducer'
import { BaseImageProduct } from '../../util/setting/config'
import { formatUSD } from '../../constant/common'
import StorageKeys from '../../util/setting/storage-keys'
import { cartAPI } from '../../api/cart.API'

TheCart.propTypes = {}

function TheCart(props) {
  const cart = useSelector((state) => state.cartReducer.cart)
  const [check, setCheck] = useState(false)

  const dispatch = useDispatch()
  const handleSize = (action, product) => {
    if (action === 1) {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { product: product, qty: 1 }
      })
    } else if (action === -1) {
      dispatch({
        type: 'DELETE_PRODUCT',
        payload: { id: product.id }
      })
    } else if (action === 0) {
      dispatch({
        type: 'REMOVE_PRODUCT',
        payload: { id: product.id }
      })
    }
    setCheck((state) => !state)
  }

  function renderCart() {
    return cart.map((i, index) => (
      <tr key={i.id}>
        <td className="cart_product">
          <img className="sm-table-img" src={`${BaseImageProduct}${i?.id_user}/${i.image?.[0]}`} alt="" />
        </td>
        <td className="cart_description">
          <h4>{i.name}</h4>
          <p>Web ID: {i.web_id}</p>
        </td>
        <td className="cart_price">
          <p>{formatUSD(i.price)}</p>
        </td>
        <td className="cart_quantity">
          <div className="cart_quantity_button">
            <a className="cart_quantity_up cuso" onClick={() => handleSize(1, i)}>
              +
            </a>
            <input
              className="cart_quantity_input"
              type="text"
              name="quantity"
              size="2"
              readOnly
              value={i.qty}
            />
            <a className="cart_quantity_down cuso" onClick={() => handleSize(-1, i)}>
              -
            </a>
          </div>
        </td>
        <td className="cart_total">
          <p className="cart_total_price">{formatUSD(i.qty * i.price)}</p>
          {/* * i.price */}
        </td>
        <td className="cart_delete">
          <a className="cart_quantity_delete cuso" onClick={() => handleSize(0, i)}>
            <i className="fa fa-times"></i>
          </a>
        </td>
      </tr>
    ))
  }

  async function onSubmitCart() {
    let newObj = {}
    cart?.map((item) => (newObj[item.id] = item.qty))
    try {
      const res = await cartAPI.createCart(newObj)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li>
              <a href="#">Home</a>
            </li>
            <li className="active">Shopping Cart</li>
          </ol>
        </div>
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image tb-item-img ">Item</td>
                <td className="description"></td>
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td></td>
              </tr>
            </thead>
            <tbody>{cart.length !== 0 && renderCart()}</tbody>
          </table>
          {cart.length === 0 && <h3 className="text-center">Not Data</h3>}
        </div>
        <button onClick={() => onSubmitCart()} className="btn btn-primary">
          Buy
        </button>
      </div>
    </section>
  )
}

export default TheCart
