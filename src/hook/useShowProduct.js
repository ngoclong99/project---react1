import { useEffect, useState } from 'react'
import { userAPI } from '../api/userAPI'

export default function useShowProduct(productId) {
  const [product, setProduct] = useState({})

  useEffect(() => {
    ;(async () => {
      const res1 = await userAPI.getProduct(productId)
      setProduct(res1.data.data)
    })()
  }, [productId])
  return product
}
