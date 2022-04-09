import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import { checkToken, getUser } from '../../../constant/user.js'
import { useNavigate, useParams } from 'react-router-dom'
import { ratingAPI } from './../../../api/ratingAPI'
Rate.propTypes = {}

function Rate(props) {
  const { id } = useParams()
  const [rating, setRating] = useState(0)
  const [listrating, setListrating] = useState([])

  function changeRating(rating) {
    setRating(rating)
    console.log(rating)
  }

  useEffect(() => {
    ;(async () => {
      const res = await ratingAPI.getRating(id)
      const total = res.data.data?.reduce((total, rating) => total + rating.rate, 0)
      const tb = total / res.data.data.length
      setRating(tb)
      setListrating(res.data.data)
    })()
  }, [])

  return (
    <div className="rating-area">
      <ul className="ratings">
        <li className="rate-this">Rate this item:</li>
        <li>
          <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name="rating"
          />
        </li>
        <li className="color">({listrating.length} votes)</li>
      </ul>
      <ul className="tag">
        <li>TAG:</li>
        <li>
          <a className="color" href="">
            Pink <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href="">
            T-Shirt <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href="">
            Girls
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Rate
