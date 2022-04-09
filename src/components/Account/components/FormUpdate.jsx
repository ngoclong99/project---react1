import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  checkOnlyNumber,
  checkOnlyString,
  checkRequired,
  checkValidation,
  isEmail
} from '../../../constant/validation'
import InputField from '../../shared/Input/InputField'
import { userAPI } from '../../../api/userAPI'
import { getUser } from '../../../constant/user'
import InputText from '../../shared/Input/InputText'
FormUpdate.propTypes = {}

function FormUpdate(props) {
  const [inputs, setInputs] = useState({
    name: getUser().name || '',
    email: getUser().email || '',
    password: '',
    phone: getUser().phone || '',
    address: getUser().address || '',
    level: 0
  })
  const [errors, setErrors] = useState({})
  const [avatar, setAvatar] = useState(getUser().avatar || '')
  const [fileAvatar, setFileAvatar] = useState({})

  const handleInput = (data) => {
    let name = data.name
    let value = data.value
    setInputs((state) => ({ ...state, [name]: value }))
  }
  const handleAvatar = (e) => {
    var file = e.target.files
    var reader = new FileReader()
    reader.readAsDataURL(file[0])
    reader.onload = function (event) {
      setAvatar(reader.result)
      setFileAvatar(file[0])
    }
  }
  const checkErrors = () => {
    let newErrors = {}
    const { password, ...newInputs } = inputs
    for (let key in newInputs) {
      const textError = checkRequired(inputs[key], key)
      newErrors[key] = textError
    }
    let textErrorName = checkOnlyString(inputs['name'])
    newErrors['name'] = textErrorName
    let textErrorEmail = isEmail(inputs['email'])
    newErrors['email'] = textErrorEmail
    let textErrorPhone = checkOnlyNumber(inputs['phone'])
    newErrors['phone'] = textErrorPhone

    setErrors(newErrors)
    return Object.keys(newErrors).some((key) => newErrors[key].length > 0)
  }
  const overrideValidate = (data) => {
    for (const key in data) {
      setErrors((state) => ({
        ...state,
        [key]: data[key][0]
      }))
    }
  }
  const handleSubmitUpdate = async (e) => {
    e.preventDefault()
    const id = getUser().id
    const newData = { ...inputs, avatar: avatar }
    if (!checkErrors()) {
      try {
        const res = await userAPI.update(id, newData)
        overrideValidate(res.data?.errors)
        alert('cập nhật thành công')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="signup-form update-form">
      <h2>User Update!</h2>
      <form onSubmit={handleSubmitUpdate}>
        <InputText
          data={{ name: 'name', value: inputs['name'], error: errors['name'] }}
          handleInput={handleInput}
        />
        <input type="text" name="email" value={inputs['email']} readOnly />
        <InputText
          data={{ name: 'password', value: inputs['password'], error: errors['password'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'phone', value: inputs['phone'], error: errors['phone'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'address', value: inputs['address'], error: errors['address'] }}
          handleInput={handleInput}
        />
        <input
          name="avatar"
          accept="image/*"
          type="file"
          onChange={handleAvatar}
          className="file-upload"
          value={inputs['avatar']}
        />

        <button type="submit" className="btn btn-default">
          Update
        </button>
      </form>
    </div>
  )
}

export default FormUpdate
