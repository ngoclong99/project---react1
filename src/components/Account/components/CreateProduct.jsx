import React, { useEffect, useRef, useState } from 'react'
import { userAPI } from '../../../api/userAPI'
import { checkDuplicateImg, uptoStringFirst } from '../../../constant/common'
import { getUser } from '../../../constant/user'
import { checkNumberNot0, checkOnlyString, checkRequired, checkSale } from '../../../constant/validation'
import InputText from '../../shared/Input/InputText'
import SelectOption from '../../shared/Input/SelectOption'
import InputArea from './../../shared/Input/InputArea'
CreateProduct.propTypes = {}

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

function CreateProduct(props) {
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    sale: '0',
    status: '0',
    company: '',
    detail: '',
    category: '',
    brand: ''
  })
  const [error, setErrors] = useState({})
  const [listImg, setListImg] = useState([])

  const handleInput = (data) => {
    let name = data.name
    let value = data.value
    setInputs((state) => ({ ...state, [name]: value }))
  }
  const handleSelect = (e) => {
    let name = e.target.name
    let value = e.target.value
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
    let textErrorImg = listImg.length === 0 ? 'Please enter image' : ''
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
      if (checkDuplicateImg(listImg, file.name) === false && listImg.length < 3) {
        setListImg((state) => [...state, file])
      } else return
    }
  }
  const handleSubmitCreate = async (e) => {
    e.preventDefault()
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
    listImg.map((value, index) => formData.append(`file[${index}]`, value))

    if (!validate()) {
      try {
        console.log(formData)
        const res = await userAPI.addProduct(formData)
        overrideValidate(res.data?.errors)
        alert('tạo thành công')
      } catch (error) {
        console.log(error)
      }
    }
  }

  // prop
  const handleChangeSelect = (name, value) => {
    setInputs((state) => ({ ...state, [name]: value }))
  }

  useEffect(() => {
    ;(async () => {
      const res = await userAPI.getCategoryBrand()
      setCategory(res.data.category)
      setBrand(res.data.brand)
    })()
  }, [])

  return (
    <div className="signup-form ">
      <h2>Create product!</h2>
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
          error={error['category']}
          name={'category'}
          data={category}
          text={'Please choose category'}
          onChangeSelect={handleChangeSelect}
        />
        <SelectOption
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
        <div className="listImg">
          {listImg.map((i, ind) => (
            <img key={ind} className="img-item" src={URL.createObjectURL(i)} alt="" />
          ))}
        </div>
        <small className="text-error">{error['file']}</small>
        <InputArea
          data={{ name: 'detail', value: inputs['detail'], error: error['detail'] }}
          handleInput={handleInput}
        />
        <button type="submit" className="btn btn-default">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
