import React from 'react'
import PropTypes from 'prop-types'

SelectOption.propTypes = {
  data: PropTypes.array,
  text: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  check: PropTypes.string,
  onChangeSelect: PropTypes.func
}

function SelectOption(props) {
  const { onChangeSelect, error, data, text, name, check } = props
  const handleChangeSelect = (e) => {
    const value = e.target.value
    if (onChangeSelect) onChangeSelect(name, value)
  }
  return (
    <>
      <select onChange={handleChangeSelect} value={check}>
        <option value="">{text}</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.category || item.brand}
          </option>
        ))}
      </select>
      <small className="text-error">{error}</small>
    </>
  )
}

export default SelectOption
