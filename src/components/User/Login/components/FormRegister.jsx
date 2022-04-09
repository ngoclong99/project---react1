import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  checkOnlyNumber,
  checkOnlyString,
  checkRequired,
  checkValidation,
  isEmail
} from '../../../../constant/validation'
import InputField from '../../../shared/Input/InputField'
import { userAPI } from '../../../../api/userAPI'
import InputText from '../../../shared/Input/InputText'

FormRegister.propTypes = {}

function FormRegister(props) {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    level: 0
  })
  const [error, setErrors] = useState({})
  const [avatar, setAvatar] = useState('')
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
    // reader.readAsText(file[0])
  }
  const checkErrors = () => {
    let newErrors = {}
    for (let key in inputs) {
      const textError = checkRequired(inputs[key], key)
      newErrors[key] = textError
    }
    let textErrorName = checkOnlyString(inputs['name'])
    newErrors['name'] = textErrorName
    let textErrorEmail = isEmail(inputs['email'])
    newErrors['email'] = textErrorEmail
    let textErrorPassword = isEmail(inputs['password'])
    newErrors['password'] = textErrorPassword
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
  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    const newData = { ...inputs, avatar: avatar, enctype: 'multipart/form-data' }
    if (!checkErrors()) {
      try {
        const res = await userAPI.register(newData)
        overrideValidate(res.data?.errors)
        alert('đăng ký thành công')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="signup-form">
      <h2>New User Signup!</h2>
      <form onSubmit={handleSubmitRegister}>
        <InputText
          data={{ name: 'name', value: inputs['name'], error: error['name'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'email', value: inputs['email'], error: error['email'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'password', value: inputs['password'], error: error['password'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'phone', value: inputs['phone'], error: error['phone'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'address', value: inputs['address'], error: error['address'] }}
          handleInput={handleInput}
        />
        <input name="avatar" accept="image/*" type="file" onChange={handleAvatar} className="file-upload" />
        {/* {avatar.length === 0 ? (
          <small className="text-error">'Please select your avatar less 1024KB'</small>
        ) : (
          ''
        )} */}

        <button type="submit" className="btn btn-default">
          SignUp
        </button>
      </form>
    </div>
  )
}

export default FormRegister
