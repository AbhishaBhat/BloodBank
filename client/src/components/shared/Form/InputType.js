import React from 'react'
import PropTypes from 'prop-types'

const InputType = ({labelText,lableForm, inputType, value, onChange, name}) => {
  return (
    <>
        <div className="form-outline mb-4">
{/*email*/} <input 
                type={inputType} 
                name={name}
                value={value}
                onChange={onChange}
                className="form-control form-control-lg" />
            <label className="form-label" htmlFor={lableForm}>{labelText}</label>
        </div>
    </>
  )
}

InputType.propTypes = {
  labelText: PropTypes.string.isRequired,
  lableForm: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputType