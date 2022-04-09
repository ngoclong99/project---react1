import { useEffect, useState } from 'react'
import { blogAPI } from '../api/blogAPI'
import { productAPI } from './../api/productAPI'
import { replaceImgs } from '../constant/common'

function useProductDetail(id) {
  const [product, setProduct] = useState({})
  useEffect(() => {
    ;(async () => {
      try {
        const res = await productAPI.getProductById(id)
        res.data.data['image'] = replaceImgs(res.data.data['image'])
        setProduct(res.data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])
  return product
}

export default useProductDetail
