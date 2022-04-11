import { useEffect, useState } from 'react'
import { blogAPI } from '../api/blogAPI'
import { productAPI } from './../api/productAPI'
import { replaceImgs } from '../constant/common'

function useProductDetail(id) {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await productAPI.getProductById(id)
        res.data.data['image'] = replaceImgs(res.data.data['image'])
        setProduct(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    })()
  }, [id])
  return { product, loading }
}

export default useProductDetail
