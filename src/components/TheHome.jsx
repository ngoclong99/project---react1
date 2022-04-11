import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { productAPI } from './../api/productAPI'
import { formatUSD, replaceImgs } from '../constant/common'
import { BaseImageProduct } from '../util/setting/config'
import { Link } from 'react-router-dom'
import Product from './Product/components/Product'
import Skeleton from 'react-loading-skeleton'

TheHome.propTypes = {}
// replaceImgs
function TheHome(props) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const renderListProduct = () => {
    return products.map((p) => (
      <div className="col-sm-4" key={p.id}>
        <Product p={p} />
      </div>
    ))
  }

  const renderListSkeleton = () => {
    let array = new Array(6).fill(1)
    return array.map((x, i) => (
      <div className="col-sm-4" key={i}>
        <Skeleton height={200} className="mb30" />
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
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })()
    return () => {}
  }, [loading])

  return (
    <div className="features_items">
      <h2 className="title text-center">Features Items1</h2>
      {loading === false ? renderListProduct() : renderListSkeleton()}
    </div>
  )
}

export default TheHome
