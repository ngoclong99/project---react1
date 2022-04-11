import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { checkToken } from '../../../constant/user'
import { useSelector } from 'react-redux'
import cartReducer from './../../../redux/cartReducer'

TheHeader.propTypes = {}
const navLink = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Shop',
    path: '/shop',
    menu: [
      {
        childName: 'Products',
        childPath: '/shop'
      },
      {
        childName: 'Products Details',
        childPath: '/product-details/17/detail'
      },
      {
        childName: 'Checkout',
        childPath: '/checkout'
      },
      {
        childName: 'Cart',
        childPath: '/my-cart'
      },
      {
        childName: 'Login',
        childPath: '/login'
      }
    ]
  },
  {
    name: 'Blog',
    path: '/blog',
    menu: [
      {
        childName: 'Blog List',
        childPath: '/blog'
      },
      {
        childName: 'Blog Single',
        childPath: '/blog-single/4'
      }
    ]
  },
  {
    name: '404',
    path: '/404'
  },
  {
    name: 'Contact',
    path: '/contact-us'
  }
]

function TheHeader(props) {
  const navigation = useNavigate()
  const total = useSelector((state) => state.cartReducer.total)

  const handleLogout = () => {
    localStorage.clear()
    navigation('/')
  }

  return (
    <Fragment>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a className="cuso">
                        <i className="fa fa-phone"></i> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a className="cuso">
                        <i className="fa fa-envelope"></i> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a className="cuso">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a className="cuso">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a className="cuso">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a className="cuso">
                        <i className="fa fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a className="cuso">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a className="cuso">
                    <img src={require('../../../asset/images/home/logo.png')} />
                  </a>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      USA
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="cuso">Canada</a>
                      </li>
                      <li>
                        <a className="cuso">UK</a>
                      </li>
                    </ul>
                  </div>

                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      DOLLAR
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="cuso">Canadian Dollar</a>
                      </li>
                      <li>
                        <a className="cuso">Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    {checkToken() ? (
                      <li>
                        <NavLink to={'account/update'}>
                          <i className="fa fa-user"></i> Account
                        </NavLink>
                      </li>
                    ) : (
                      ''
                    )}
                    <li>
                      <a className="cuso">
                        <i className="fa fa-star"></i> Wishlist
                      </a>
                    </li>
                    <li>
                      <a className="cuso">
                        <i className="fa fa-crosshairs"></i> Checkout
                      </a>
                    </li>
                    <li>
                      <Link to="/my-cart">
                        <i className="fa fa-shopping-cart"></i> Cart <sup>{total === 0 ? '' : total}</sup>
                      </Link>
                    </li>
                    <li>
                      {checkToken() === false ? (
                        <NavLink to={'/login'}>
                          <i className="fa fa-lock"></i> Login
                        </NavLink>
                      ) : (
                        <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                          <i className="fa fa-lock"></i> LogOut
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    {navLink.map((link, index) => (
                      <li key={index} className={link?.menu ? 'dropdown' : ''}>
                        <NavLink to={link.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                          {link.name} {link?.menu && <i className="fa fa-angle-down" />}
                        </NavLink>
                        {link?.menu ? (
                          <ul role="menu" className="sub-menu">
                            {link?.menu.map((link, index) => (
                              <li key={index}>
                                <NavLink to={link.childPath} className={({ isActive }) => (isActive ? 'active' : '')}>
                                  {link.childName}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          ''
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default TheHeader
