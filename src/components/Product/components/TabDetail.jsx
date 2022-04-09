import React from 'react'
import PropTypes from 'prop-types'
import '../styles/styles.css'
TabDetail.propTypes = {
  detail: PropTypes.string
}

function TabDetail(props) {
  const { detail } = props
  return (
    <div className="tab-pane " id="details">
      DETAILS: {detail}
    </div>
  )
}

export default TabDetail
