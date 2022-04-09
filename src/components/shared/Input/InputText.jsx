import React from 'react'
import PropTypes from 'prop-types'
import { uptoStringFirst } from '../../../constant/common'

InputText.propTypes = {
  data: PropTypes.object,
  handleInput: PropTypes.func
}

function InputText(props) {
  const { data, handleInput } = props
  const handleDataInput = (e) => {
    let data = {
      name: e.target.name,
      value: e.target.value
    }
    if (handleInput) handleInput(data)
  }
  return (
    <>
      <input
        type="text"
        name={data?.name}
        defaultValue={data?.value}
        placeholder={uptoStringFirst(data?.name)}
        onChange={handleDataInput}
      />
      <small className="text-error">{data?.error}</small>
    </>
  )
}

export default InputText
