import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { productAPI } from './../../../api/productAPI'
import { formatUSD, replaceImgs } from '../../../constant/common'
import { BaseImageProduct } from '../../../util/setting/config'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Product from '../components/Product'

ProductList.propTypes = {}

function ProductList(props) {
  const [products, setProducts] = useState([])

  const renderListProduct = () => {
    return products.map((p) => (
      <div className="col-sm-4" key={p.id}>
        <Product p={p} />
      </div>
    ))
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await productAPI.getProductHome()
        const newRes = await res.data.data.map((e) => ({
          ...e,
          image: replaceImgs(e.image)
        }))
        setProducts(newRes)
      } catch (error) {}
    })()
    return () => {}
  }, [])

  return (
    <div className="features_items">
      <h2 className="title text-center">Features Items</h2>
      {renderListProduct()}
      <Pagination />
    </div>
  )
}

export default ProductList
