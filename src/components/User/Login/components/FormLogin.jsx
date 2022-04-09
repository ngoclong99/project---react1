import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from '../../../shared/Input/InputField'
import { checkPassword, checkRequired, checkValidation, isEmail } from '../../../../constant/validation'
import { userAPI } from '../../../../api/userAPI'
import StorageKeys from '../../../../util/setting/storage-keys'
import { useNavigate } from 'react-router-dom'
import InputText from './../../../shared/Input/InputText'

FormLogin.propTypes = {}

function FormLogin(props) {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    level: 0
  })
  const [errors, setErrors] = useState({})
  const [errorShow, setErrorShow] = useState('')
  const handleInput = (data) => {
    let name = data.name
    let value = data.value
    setInputs((state) => ({ ...state, [name]: value }))
  }
  const checkErrors = () => {
    let newErrors = {}
    for (let key in inputs) {
      const textError = checkRequired(inputs[key], key)
      newErrors[key] = textError
    }
    let textErrorEmail = isEmail(inputs['email'])
    newErrors['email'] = textErrorEmail
    let textErrorPassword = checkPassword(inputs['password'])
    newErrors['password'] = textErrorPassword
    setErrors(newErrors)
    return Object.keys(newErrors).some((key) => newErrors[key].length > 0)
  }
  const handleSubmitLogin = async (e) => {
    e.preventDefault()

    if (!checkErrors()) {
      try {
        const res = await userAPI.login(inputs)
        setErrorShow(res.data.errors?.errors)
        localStorage.setItem(StorageKeys.TOKEN, res.data?.success.token)
        localStorage.setItem(StorageKeys.AUTH, JSON.stringify(res.data?.Auth))
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="login-form">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmitLogin}>
        <InputText
          data={{ name: 'email', value: inputs['email'], error: errors['email'] }}
          handleInput={handleInput}
        />
        <InputText
          data={{ name: 'password', value: inputs['password'], error: errors['password'] }}
          handleInput={handleInput}
        />
        <small className="text-error">{errorShow}</small>
        <span>
          <input type="checkbox" className="checkbox" />
          Keep me signed in
        </span>
        <button type="submit" className="btn btn-default">
          Login
        </button>
      </form>
    </div>
  )
}

export default FormLogin
