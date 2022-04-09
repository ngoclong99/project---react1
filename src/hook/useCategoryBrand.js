import { useEffect, useState } from 'react'
import { userAPI } from '../api/userAPI'

export default function useCategoryBrand(productId) {
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])

  useEffect(() => {
    ;(async () => {
      const res = await userAPI.getCategoryBrand()
      setCategory(res.data.category)
      setBrand(res.data.brand)
    })()
  }, [productId])
  return { brand, category }
}
