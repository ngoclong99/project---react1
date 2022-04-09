import React from 'react'
import PropTypes from 'prop-types'

Pagination.propTypes = {}

function Pagination(props) {
  return (
    <ul className="pagination">
      <li className="active">
        <a href="">1</a>
      </li>
      <li>
        <a href="">2</a>
      </li>
      <li>
        <a href="">3</a>
      </li>
      <li>
        <a href="">»</a>
      </li>
    </ul>
  )
}

export default Pagination
