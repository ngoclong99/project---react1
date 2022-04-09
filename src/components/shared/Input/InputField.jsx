import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { uptoStringFirst } from '../../../constant/common'

InputField.propTypes = {
  handleInput: PropTypes.func,
  errors: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

function InputField(props) {
  const { handleInput, errors, name, value, type } = props

  const handleInputField = (e) => {
    if (handleInput) handleInput(e)
  }
  return (
    <Fragment>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={uptoStringFirst(name)}
        onChange={handleInputField}
      />
      {errors?.error ? <small className="text-error">{errors?.text}</small> : ''}
    </Fragment>
  )
}

export default InputField
