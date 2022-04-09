import { useEffect, useState } from 'react'
import { blogAPI } from './../api/blogAPI'

function useBlogDetail(id) {
  const [blog, setBlog] = useState()
  useEffect(() => {
    ;(async () => {
      const res = await blogAPI.getBlog(id)
      console.log(res)
    })()
  }, [id])
  return blog
}

export default useBlogDetail
