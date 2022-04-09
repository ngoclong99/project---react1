import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../../../constant/user.js'
import { blogAPI } from '../../../api/blogAPI.js'

Comment.propTypes = {
  blog: PropTypes.object,
  commentChild: PropTypes.object,
  handleComent: PropTypes.func
}

function Comment(props) {
  const { blog, handleComent, commentChild } = props
  const user = getUser()
  const [comment, setComment] = useState('')
  const handlecomment = (e) => {
    const value = e.target.value
    setComment(value)
  }
  const handleSubmitComment = async () => {
    const data = {
      id_blog: blog?.id,
      id_user: user?.id,
      name_user: user?.name,
      id_comment: 0,
      comment: comment,
      image_user: user?.avatar
    }
    let dataChild = { ...commentChild, comment: comment }
    try {
      if (comment.length === 0) {
        return
      }
      const res = await blogAPI.postComment(
        blog.id,
        Object.keys(commentChild).length === 0 ? data : dataChild
      )
      setComment('')
      if (handleComent) handleComent(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="replay-box" id="box-comment">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>
          <div className="text-area">
            <div className="blank-arrow">
              <label>{user?.name}</label>
            </div>
            <span>*</span>
            <textarea name="message" rows="11" onChange={handlecomment} value={comment} />
            <a className="btn btn-primary" onClick={handleSubmitComment}>
              post comment
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
