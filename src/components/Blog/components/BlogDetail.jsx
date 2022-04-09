import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { BaseImageBlog } from '../../../util/setting/config'
import DOMPurify from 'dompurify'
import { ratingAPI } from '../../../api/ratingAPI'
import { useParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings/build/star-ratings'

BlogDetail.propTypes = {
  blog: PropTypes.object
}

function BlogDetail(props) {
  const { blog } = props
  const { id } = useParams()

  const [rating, setRating] = useState(0)

  var clean = DOMPurify.sanitize(blog.content)

  useEffect(() => {
    ;(async () => {
      const res = await ratingAPI.getRating(id)
      const total = res.data.data?.reduce((total, rating) => total + rating.rate, 0)
      const tb = total / res.data.data.length
      setRating(tb)
    })()
  }, [rating])

  return (
    <div className="blog-post-area">
      <h2 className="title text-center">Latest From our Blog</h2>
      <div className="single-blog-post">
        <h3>{blog.title}</h3>
        <div className="post-meta">
          <ul>
            <li>
              <i className="fa fa-user"></i> Mac Doe
            </li>
            <li>
              <i className="fa fa-clock-o"></i> {moment(blog.updated_at).format('LT')}
            </li>
            <li>
              <i className="fa fa-calendar"></i> {moment(blog.updated_at).format('ll')}
            </li>
          </ul>
          <span>
            <StarRatings rating={rating} starRatedColor="blue" numberOfStars={6} name="rating" />
          </span>
        </div>
        <img src={`${BaseImageBlog}${blog.image}`} alt="" />
        <p dangerouslySetInnerHTML={{ __html: clean }}></p>
        <div className="pager-area">
          <ul className="pager pull-right">
            <li>
              <a href="#">Pre</a>
            </li>
            <li>
              <a href="#">Next</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
