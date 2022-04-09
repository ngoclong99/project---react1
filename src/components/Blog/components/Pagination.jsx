import React from 'react'
import PropTypes from 'prop-types'

Pagination.propTypes = {}

function Pagination(props) {
  return (
    <div className="pagination-area">
      <ul className="pagination">
        <li>
          <a href="" className="active">
            1
          </a>
        </li>
        <li>
          <a href="">2</a>
        </li>
        <li>
          <a href="">3</a>
        </li>
        <li>
          <a href="">
            <i className="fa fa-angle-double-right"></i>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
