/**
 * @desc This component is a text field that can be used to input a password. It has a button that allows the user to show or hide the password.
 * @param {object} props - The properties of the component
 * @param {string} props.name - The name of the input field
 * @param {string} props.id - The id of the input field
 * @param {string} props.label - The label of the input field
 * @param {string} props.variant - The variant of the input field
 * @param {boolean} props.required - The required status of the input field
 * @param {boolean} props.fullWidth - The width of the input field
 * @param {string} props.helperText - The helper text of the input field
 * @param {boolean} props.error - The error status of the input field
 * @param {function} props.onChange - The function to be called when the input field changes
 * @returns
 */

import { useState } from 'react'
import { TextField } from '@mui/material'

const ProtectedField = (props) => {
  const [type, setType] = useState('password');

  const showPassword = (e) => {
    e.preventDefault();
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className='relative'>
      <TextField
        name={props.name}
        id={props.id}
        label={props.label}
        variant={props.variant}
        type={type}
        required={props.required}
        fullWidth={props.fullWidth}
        helperText={props.error ? props.helperText : ''}
        error={props.error}
        onChange={props.onChange} 
      />
      <button
        className={`absolute right-3 top-4 ${props.error ? 'text-red-500' : 'text-blue-600'} hover:text-blue-700 transition-all duration-200`}
        onClick={showPassword}
        >
        {/* TODO: Add an eye icon */}
        {type === 'password' ? 'Show' : 'Hide'}
      </button>
    </div>
  )
}

export default ProtectedField