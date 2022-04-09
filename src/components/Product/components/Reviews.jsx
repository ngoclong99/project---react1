import React from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../../../constant/user'
import moment from 'moment'

Reviews.propTypes = {
  product: PropTypes.object
}

function Reviews(props) {
  const { product } = props
  console.log(product)

  return (
    <div className="tab-pane fade active in" id="reviews">
      <div className="col-sm-12">
        <ul>
          <li>
            <a href="">
              <i className="fa fa-user"></i>
              {getUser().name}
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-clock-o"></i>
              {moment(product.updated_at).format('LT')}
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-calendar-o"></i>
              {moment(product.updated_at).format('DD MMM YYYY')}
            </a>
          </li>
        </ul>
        <p>{product.detail}</p>
        <p>
          <b>Write Your Review</b>
        </p>

        <form action="#">
          <span>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
          </span>
          <textarea name=""></textarea>
          <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
          <button type="button" className="btn btn-default pull-right">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reviews
