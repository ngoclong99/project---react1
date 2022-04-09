/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { userAPI } from '../../../api/userAPI'
import { formatUSD } from '../../../constant/common'

UserProduct.propTypes = {}

function UserProduct(props) {
  const [products, setProduct] = useState({})

  const handleProductDelete = async (id) => {
    try {
      const res = await userAPI.deleteProduct(id)
      setProduct(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderListProduct = () => {
    return Object.keys(products).map((key) => (
      <tr className="my-product" key={key}>
        <td>
          <a>
            <p>{products[key].id}</p>
          </a>
        </td>
        <td>
          <a>
            <p>{products[key].name}</p>
          </a>
        </td>
        <td>
          <img
            className="wh50"
            src="https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png"
            alt=""
          />
        </td>
        <td>
          <p className="product-price">{formatUSD(products[key].price)}</p>
        </td>
        <td className="w150">
          <Link to={`/account/edit-product/${products[key].id}`}>
            <i className="fa fa-pencil-square-o"></i>
          </Link>
          <a
            onClick={() => {
              handleProductDelete(products[key].id)
            }}
            className="mr50"
          >
            <i className="fa fa-times"></i>
          </a>
        </td>
      </tr>
    ))
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await userAPI.getAllProduct()
        setProduct(res.data.data)
      } catch (error) {
        console.log(error)
      }
    })()

    // return () => {
    //   second
    // }
  }, [])

  return (
    <section id="cart_items">
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td>Id</td>
              <td>Name</td>
              <td>Image</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{renderListProduct()}</tbody>
        </table>
      </div>
      <Link to="/account/create-product" className="btn btn-primary pull-right">
        Add Product
      </Link>
    </section>
  )
}

export default UserProduct
