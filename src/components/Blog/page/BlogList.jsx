import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { BaseImageBlog } from '../../../util/setting/config'
import { blogAPI } from './../../../api/blogAPI'
import Pagination from './../components/Pagination'

BlogList.propTypes = {}

function BlogList(props) {
  const [blogList, setBlogList] = useState([])
  const [loading, setLoading] = useState(true)

  function renderBlogList() {
    return blogList?.map((item) => (
      <div className="single-blog-post" key={item.id}>
        <h3>{item.title}</h3>
        <div className="post-meta">
          <ul>
            <li>
              <i className="fa fa-user"></i> Mac Doe
            </li>
            <li>
              <i className="fa fa-clock-o"></i> {moment(item.updated_at).format('LT')}
            </li>
            <li>
              <i className="fa fa-calendar"></i> {moment(item.updated_at).format('ll')}
            </li>
          </ul>
          <span>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
          </span>
        </div>
        <Link to={`/blog-single/${item.id}`}>
          <img src={`${BaseImageBlog}${item.image}`} alt="" />
        </Link>
        <p>{item.description}</p>
        <Link className="btn btn-primary" to={`/blog-single/${item.id}`}>
          Read More
        </Link>
      </div>
    ))
  }

  const renderListSkeleton = () => {
    let array = new Array(3).fill(1)
    return array.map((x, i) => (
      <div className="col-sm-12 mb30" key={i}>
        <Skeleton height={10} width={'30%'} />
        <Skeleton height={300} className="mb30" />
        <Skeleton count="2" />
        <Skeleton height={30} width={50} />
      </div>
    ))
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await blogAPI.getBlogList()
        setBlogList(response.data.blog.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="blog-post-area">
      <h2 className="title text-center">Latest From our Blog</h2>
      {loading === false ? renderBlogList() : renderListSkeleton()}
      <Pagination />
    </div>
  )
}

export default BlogList
