import PropTypes from 'prop-types'
import React from 'react'

InputArea.propTypes = {
  data: PropTypes.object,
  handleInput: PropTypes.func
}

function InputArea(props) {
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
      <textarea
        name={data.name}
        placeholder={data.name}
        cols="30"
        rows="10"
        defaultValue={data.value}
        onChange={handleDataInput}
      />
      <small className="text-error">{data.error}</small>
    </>
  )
}

export default InputArea
