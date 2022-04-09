import React from 'react'
import PropTypes from 'prop-types'
import { BaseImageProduct } from '../../../util/setting/config'

ListMiniProduct.propTypes = {
  listProduct: PropTypes.array,
  idUser: PropTypes.string,
  handleChangeImg: PropTypes.func
}

function ListMiniProduct(props) {
  const { listProduct, idUser, handleChangeImg } = props

  const handleImg = (e) => {
    let img = e.target.src
    if (handleChangeImg) handleChangeImg(img)
  }

  function renderListImgs() {
    return listProduct?.map((e) => (
      <img onClick={handleImg} key={e} src={`${BaseImageProduct}${idUser}/${e}`} alt="" />
    ))
  }

  return (
    <div className="carousel-inner small">
      <div className="item">{renderListImgs()}</div>
    </div>
  )
}

export default ListMiniProduct
