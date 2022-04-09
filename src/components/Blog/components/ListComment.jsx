import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { BaseImageUser } from '../../../util/setting/config'
ListComment.propTypes = {
  comment: PropTypes.array,
  replyComment: PropTypes.func
}

function ListComment(props) {
  const { comment, replyComment } = props
  const [dataFilter, setDataFilter] = useState([])

  const handleReplyComment = (data) => {
    const section = document.querySelector('#box-comment')
    section.scrollIntoView({ behavior: 'smooth', block: 'end' })
    if (replyComment) replyComment(data)
  }
  const filterComments = () => {
    const promises = new Promise(function (resolve, reject) {
      const result = {}
      for (let item in comment) {
        let value = comment[item]
        if (value.id_comment === 0) result[value.id] = [value]
      }
      resolve(result)
    })
    promises.then(function (data) {
      comment?.map((e) => {
        Object.keys(data).map((key) => {
          if (e.id_comment !== 0 && e.id_comment === Number(key)) {
            data[key].push(e)
          }
        })
        return data
      })
      // dataFilter.current = Array.prototype.concat(...Object.values(data))
      setDataFilter(Array.prototype.concat(...Object.values(data)))
    })
  }

  useEffect(() => {
    ;(() => {
      filterComments()
    })()
  }, [comment])

  function renderComments() {
    return (
      <ul className="media-list">
        {dataFilter?.map((v, ind) => (
          <li key={ind} className={v.id_comment === 0 ? 'media' : 'media second-media'}>
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src={`${BaseImageUser}${v.image_user}`}
                alt=""
                width={'90px'}
                height={'100%'}
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user"></i>
                  {v.name_user}
                </li>
                <li>
                  <i className="fa fa-clock-o"></i> {moment(v.updated_at).format('LT')}
                </li>
                <li>
                  <i className="fa fa-calendar"></i> {moment(v.updated_at).format('ll')}
                </li>
              </ul>
              <p>{v.comment}</p>
              {v.id_comment === 0 ? (
                <a className="btn btn-primary" onClick={() => handleReplyComment(v)}>
                  <i className="fa fa-reply"></i> Replay
                </a>
              ) : (
                ''
              )}
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="response-area">
      <h2>{comment?.length} RESPONSES</h2>
      {renderComments()}
    </div>
  )
}

export default ListComment
