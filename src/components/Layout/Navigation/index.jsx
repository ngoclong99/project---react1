import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Carousel from './Carousel'
import './styles.css'

Navigation.propTypes = {}

function Navigation(props) {
  const { pathname } = useLocation()

  return (
    <div>
      {pathname === '/' && <Carousel timeOut={'1200'} />}
      {pathname === '/shop' && (
        <section id="advertisement">
          <div className="container">
            <img src={require('../../../asset/images/shop/advertisement.jpg')} alt="" />
          </div>
        </section>
      )}
    </div>
  )
}

export default Navigation
