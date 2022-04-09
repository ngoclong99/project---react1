import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

AlertMessage.propTypes = {
  type: PropTypes.string
}

function AlertMessage({ props }) {
  const { type } = props
  const [isShow, setIsShow] = useState(false)

  const handleClose = (e) => {
    e.preventDefault()
    setIsShow(false)
  }

  return (
    <div className={`alert ${type} ${!!isShow && 'hide'}`}>
      <span className="closebtn" onClick={handleClose}>
        &times;
      </span>
      {props.children}
    </div>
  )
}

export default AlertMessage
