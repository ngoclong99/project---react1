/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { BaseImageProduct } from '../../../util/setting/config'
import { formatUSD } from '../../../constant/common'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

Product.propTypes = {
  p: PropTypes.object
}

function Product(props) {
  const { p } = props
  const dispatch = useDispatch()

  function handleAddToCart() {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { product: p, qty: 1 }
    })
  }

  return (
    <div className="product-image-wrapper">
      <div className="single-products">
        <div className="productinfo text-center">
          <img src={`${BaseImageProduct}${p?.id_user}/${p.image?.[0]}`} alt="" />
          <h2>{formatUSD(p.price)}</h2>
          <p>{p.name}</p>
          <a href="#" className="btn btn-default add-to-cart">
            <i className="fa fa-shopping-cart"></i>Add to cart
          </a>
        </div>
        <div className="product-overlay">
          <div className="overlay-content">
            <h2>{formatUSD(p.price)}</h2>
            <p>{p.name}</p>
            <a className="btn btn-default add-to-cart" onClick={handleAddToCart}>
              <i className="fa fa-shopping-cart"></i>Add to cart
            </a>
          </div>
        </div>
      </div>
      <div className="choose">
        <ul className="nav nav-pills nav-justified">
          <li>
            <a href="#">
              <i className="fa fa-plus-square"></i>Add to wishlist
            </a>
          </li>
          <li>
            <Link to={`/product-details/${p.id}/detail`}>
              <i className="fa fa-plus-square"></i>More
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Product
