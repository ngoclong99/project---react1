import React from 'react'
import PropTypes from 'prop-types'
import TheCategory from './components/TheCategory'
import TheBrands from './components/TheBrands'
import ThePriceRange from './components/ThePriceRange'

MenuLeftProduct.propTypes = {}

function MenuLeftProduct(props) {
  return (
    <>
      {/* <!--Category--> */}
      <TheCategory />
      {/* <!--Brands--> */}
      <TheBrands />
      {/* <!--PriceRange--> */}
      <ThePriceRange />
      {/* <!--shipping--> */}
      <div className="shipping text-center">
        <img src={require('../../../asset/images/home/shipping.jpg')} alt="" />
      </div>
    </>
  )
}

export default MenuLeftProduct
