import React from 'react'
import { useFormContext } from 'react-hook-form'

import { InputField, InputFieldPw } from './input'
import Label from './label'

interface InputProps {
  errors: any
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'password'
}

const TextInput: React.FC<InputProps> = ({ errors, id, label, placeholder }) => {
  const { register } = useFormContext()

  return (
    <div className='space-y-1'>
      <Label htmlFor={id}>{label}</Label>
      <InputField id={id} placeholder={placeholder} {...register(id)} errorMessage={errors[id]?.message} />
    </div>
  )
}

const EmailInput: React.FC<InputProps> = ({ errors, id, label, placeholder }) => {
  const { register } = useFormContext()

  return (
    <div className='space-y-1'>
      <Label htmlFor={id}>{label}</Label>
      <InputField type='email' id={id} placeholder={placeholder} {...register(id)} errorMessage={errors[id]?.message} />
    </div>
  )
}

const PasswordInput: React.FC<InputProps> = ({ errors, id, label, placeholder }) => {
  const { register } = useFormContext()

  return (
    <div className='space-y-1'>
      <Label htmlFor={id}>{label}</Label>
      <InputFieldPw id={id} placeholder={placeholder} {...register(id)} errorMessage={errors[id]?.message} />
    </div>
  )
}

export { EmailInput, PasswordInput, TextInput }
