import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { userAPI } from './../../../api/userAPI'
import InputArea from '../../shared/Input/InputArea'
import InputText from '../../shared/Input/InputText'
import SelectOption from '../../shared/Input/SelectOption'
import { checkDuplicateImg } from '../../../constant/common'
import { checkNumberNot0, checkOnlyString, checkRequired, checkSale } from '../../../constant/validation'
import { BaseImageProduct } from '../../../util/setting/config'
import useShowProduct from './../../../hook/useShowProduct'
import { getUser } from '../../../constant/user'

EditProduct.propTypes = {}
const statusSale = [
  {
    id: 1,
    name: 'new'
  },
  {
    id: 0,
    name: 'sale'
  }
]

function EditProduct(props) {
  const { productId } = useParams()
  const product = useShowProduct(productId)
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    sale: '0',
    status: '0',
    company: '',
    detail: '',
    category: '0',
    brand: '0'
  })
  const [error, setErrors] = useState({})

  // List Img
  const [listImg, setListImg] = useState([])
  const [oldImgs, setOldImgs] = useState([])
  const [deteleImgs, setDeleteImgs] = useState([])
  let length = listImg?.length + oldImgs?.length - deteleImgs?.length

  const handleInput = (data) => {
    let name = data.name
    let value = data.value
    setInputs((state) => ({ ...state, [name]: value }))
  }
  const validate = () => {
    const { image, ...newInputs } = inputs
    let newErrors = {}
    for (let key in newInputs) {
      const textError = checkRequired(inputs[key], key)
      newErrors[key] = textError
    }
    let textErrorPrice = checkNumberNot0(inputs['price'])
    newErrors['price'] = textErrorPrice
    let textErrorSale = checkSale(inputs['sale'])
    newErrors['sale'] = textErrorSale
    let textErrorName = checkOnlyString(inputs['name'])
    newErrors['name'] = textErrorName
    let textErrorImg = length === 0 || length > 3 ? 'Please select less 3 image' : ''
    newErrors['file'] = textErrorImg

    setErrors(newErrors)
    return Object.keys(newErrors).some((key) => newErrors[key].length > 1)
  }
  const overrideValidate = (data) => {
    for (const key in data) {
      setErrors((state) => ({
        ...state,
        [key]: data[key][0]
      }))
    }
  }
  const handleAvatar = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
      if (checkDuplicateImg(listImg, file.name) === false && length < 3) {
        let check = oldImgs.findIndex((i) => i.includes(file.name))
        if (check === -1) setListImg((state) => [...state, file])
      } else return
    }
  }
  const handleSelect = (e) => {
    let name = e.target.name
    let value = e.target.value
    setInputs((state) => ({ ...state, [name]: value }))
  }
  const handleSubmitCreate = async (e) => {
    e.preventDefault()
    let id = product.id
    let newData = {
      category: Number(inputs['category']),
      brand: Number(inputs['brand']),
      name: inputs['name'],
      price: Number(inputs['price']),
      status: Number(inputs['status']),
      sale: Number(inputs['sale']),
      detail: inputs['detail'],
      company: inputs['company']
    }
    let formData = new FormData()
    for (const key in newData) {
      formData.append(key, newData[key])
    }
    formData.append('avatarCheckBox[]', deteleImgs)
    listImg.length === 0
      ? formData.append('file[]', listImg)
      : listImg?.map((value, index) => formData.append(`file[${index}]`, value))
    if (!validate()) {
      try {
        console.log(formData)
        const res = await userAPI.editProduct(formData, id)
        overrideValidate(res.data?.errors)
        alert('Edit thành công')
      } catch (error) {
        console.log(error)
      }
    }
  }

  // prop
  const handleChangeSelect = (name, value) => {
    setInputs((state) => ({ ...state, [name]: value }))
  }
  const handleCheckBox = (e, data) => {
    let status = e.target.checked
    if (typeof data === 'string') {
      if (status === false && !!oldImgs.includes(data) && !deteleImgs.includes(data)) {
        return setDeleteImgs((state) => [...state, data])
      } else {
        let state = deteleImgs.filter((e) => e !== data)
        return setDeleteImgs(state)
      }
    } else {
      if (status === false) {
        let state = listImg.filter((i) => i.name !== data.name)
        setListImg(state)
      }
    }
  }

  // render
  const renderImgs = () => {
    let totalImgs = oldImgs?.concat(listImg)
    return (
      <div className="listImg">
        {totalImgs?.map((i, ind) => (
          <div className="img-item-sm" key={ind}>
            <img
              key={ind}
              src={i?.name ? URL.createObjectURL(i) : `${BaseImageProduct}${getUser().id}/${i}`}
              alt=""
            />
            <input type="checkbox" onChange={(e) => handleCheckBox(e, i)} defaultChecked />
          </div>
        ))}
      </div>
    )
  }

  // effect
  useEffect(() => {
    ;(async () => {
      try {
        const res2 = await userAPI.getCategoryBrand()
        setCategory(res2.data.category)
        setInputs((state) => ({ ...state, category: product['id_brand'] }))
        setBrand(res2.data.brand)
        setInputs((state) => ({ ...state, brand: product['id_category'] }))
        setInputs((state) => ({ ...state, company: product['company_profile'] }))
        setOldImgs(product.image)
        for (let key1 in product) {
          for (let key2 in inputs) {
            if (key1 === key2) {
              setInputs((state) => ({ ...state, [key1]: product[key1] }))
            }
          }
        }
      } catch (error) {}
    })()
  }, [product])

  return (
    <div className="signup-form ">
      <h2>Edit product!</h2>
      <form onSubmit={handleSubmitCreate} if="fomr123">
        <InputText
          data={{ name: 'name', value: inputs['name'], error: error['name'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'price', value: inputs['price'], error: error['price'] }}
          handleInput={handleInput}
        />
        <SelectOption
          check={inputs['category']}
          error={error['category']}
          name={'category'}
          data={category}
          text={'Please choose category'}
          onChangeSelect={handleChangeSelect}
        />
        <SelectOption
          check={inputs['brand']}
          error={error['brand']}
          name={'brand'}
          data={brand}
          text={'Please choose brand'}
          onChangeSelect={handleChangeSelect}
        />
        <select value={inputs['status']} name="status" onChange={handleSelect}>
          {statusSale.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {inputs['status'] === '0' && (
          <>
            <input
              className="input-sale"
              type="number"
              name="sale"
              value={inputs['sale']}
              onChange={handleInput}
            />
            %<small className="text-error">{error['sale']}</small>
          </>
        )}
        <InputText
          data={{ name: 'company', value: inputs['company'], error: error['company'] }}
          handleInput={handleInput}
        />
        <input
          name="file"
          accept="image/png, image/jpg, image/jpeg"
          type="file"
          onChange={handleAvatar}
          className="file-upload"
        />
        {renderImgs()}
        <small className="text-error">{error['file']}</small>
        <InputArea
          data={{ name: 'detail', value: inputs['detail'], error: error['detail'] }}
          handleInput={handleInput}
        />
        <button type="submit" className="btn btn-default">
          Edit
        </button>
      </form>
    </div>
  )
}

export default EditProduct
