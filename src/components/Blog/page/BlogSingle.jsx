import React, { Fragment, useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'
import { blogAPI } from '../../../api/blogAPI'
import BlogDetail from './../components/BlogDetail'
import Comment from './../components/Comment'
import ListComment from './../components/ListComment'
import Rate from './../components/Rate'

BlogSingle.propTypes = {}

function BlogSingle(props) {
  const { id } = useParams()
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(true)
  const [commentChild, setCommentChild] = useState({})
  useEffect(() => {
    ;(async () => {
      try {
        const res = await blogAPI.getBlog(id)
        setBlog(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    })()
  }, [id])

  const renderListSkeleton = () => {
    let array = new Array(3).fill(1)
    return array.map((x, i) => (
      <div className="col-sm-12 mb30" key={i}>
        <Skeleton height={10} width={'30%'} />
        <Skeleton height={300} className="mb30" />
        <Skeleton height={10} width={'40%'} />
        <Skeleton count="3" />
        <Skeleton height={60} className="mb30" />
      </div>
    ))
  }

  const handleComent = (data) => {
    let newComents = [data, ...blog['comment']]
    setBlog((state) => ({
      ...state,
      comment: newComents || []
    }))
  }

  const replyComment = (comment) => {
    const data = {
      id_blog: comment.id_blog,
      id_user: comment.id_user,
      name_user: comment.name_user,
      id_comment: comment.id,
      comment: comment.comment,
      image_user: comment.image_user
    }
    setCommentChild(data)
  }

  return (
    <Fragment>
      {!loading ? (
        <>
          <BlogDetail blog={blog} />
          <Rate />
          <div className="socials-sharee">
            {/* <a href=""> */}
            <img src={require('../../../asset/images/blog/socials.png')} alt="" />
            {/* </a> */}
          </div>
          <ListComment comment={blog.comment} replyComment={replyComment} />
          <Comment blog={blog} commentChild={commentChild} handleComent={handleComent} />
        </>
      ) : (
        renderListSkeleton()
      )}
    </Fragment>
  )
}

export default BlogSingle
