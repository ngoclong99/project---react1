import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import useProductDetail from '../../../hook/useProductDetail'
import { formatUSD } from '../../../constant/common'
import { getBrandById } from '../../../constant/user'
import FormUpdate from './../../Account/components/FormUpdate'
import TabDetail from './../components/TabDetail'
import CompanyProfile from './../components/CompanyProfile'
import Tag from './../components/Tag'
import Reviews from './../components/Reviews'
import { BaseImageProduct } from '../../../util/setting/config'
import ListMiniProduct from '../components/ListMiniProduct'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import '../styles/react-popupbox.css'
import Skeleton from 'react-loading-skeleton'

ProductDetail.propTypes = {}

const tabContent = [
  {
    path: 'detail',
    name: 'DETAILS'
  },
  {
    path: 'company-profile',
    name: 'COMPANY PROFILE'
  },
  {
    path: 'tag',
    name: 'TAG'
  },
  {
    path: 'reviews',
    name: 'REVIEWS'
  }
]

function ProductDetail(props) {
  const { id } = useParams()
  const { product, loading } = useProductDetail(id)
  const [showImg, setShowImg] = useState('')

  const handleChangeImg = (img) => {
    setShowImg(img)
  }

  const renderSkeleton = () => {
    return (
      <div className="product-details">
        <div className="col-sm-5">
          <Skeleton height={300} />
        </div>
        <div className="col-sm-7">
          <Skeleton count={4} />
        </div>
        <Skeleton className="category-tab shop-details-tab mt30 " height={50} />
      </div>
    )
  }

  function openPopupbox() {
    const content = <img src={showImg || ` ${BaseImageProduct}${product?.id_user}/${product?.image?.[0]}`} alt="" />

    PopupboxManager.open({
      content,
      config: {
        fadeIn: true,
        fadeInSpeed: 500
      }
    })
  }

  return (
    <>
      {loading ? (
        renderSkeleton()
      ) : (
        <>
          <div className="product-details">
            <div className="col-sm-5">
              <div className="view-product">
                <img src={showImg || ` ${BaseImageProduct}${product?.id_user}/${product?.image?.[0]}`} alt="" />
                <h3 className="cuso" onClick={openPopupbox}>
                  ZOOM
                </h3>
                <PopupboxContainer />
              </div>
              <div id="similar-product" className="carousel slide" data-ride="carousel">
                <ListMiniProduct
                  idUser={product.id_user}
                  listProduct={product.image}
                  handleChangeImg={handleChangeImg}
                />
                <a className="left item-control" data-slide="prev">
                  <i className="fa fa-angle-left"></i>
                </a>
                <a className="right item-control" data-slide="next">
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="product-information">
                <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                <h2>{product.name}</h2>
                <p>Web ID: {product.web_id}</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                  <span>{formatUSD(product.price)}</span>
                  <label>Quantity:</label>
                  <input type="text" />
                </span>
                <button type="button" className="btn btn-fefault cart">
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
                <p>
                  <b>Availability:</b> In Stock
                </p>
                <p>
                  <b>Condition:</b> {product.condition}
                </p>
                <p>
                  <b>Brand:</b> {getBrandById(product.id_brand)?.brand}
                </p>
                <a href="">
                  <img src="images/product-details/share.png" className="share img-responsive" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="category-tab shop-details-tab">
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                {tabContent.map((i) => (
                  <li key={i.name}>
                    <NavLink to={i.path}>{i.name}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content">
              <Routes>
                <Route path="/detail" element={<TabDetail detail={product.detail} />} />
                <Route path="/company-profile" element={<CompanyProfile profile={product.company_profile} />} />
                <Route path="/tag" element={<Tag />} />
                <Route path="/reviews" element={<Reviews product={product} />} />
              </Routes>
              {props.children}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetail
