import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FORM_SIGN_AUTH } from '@/constants/form'

import { InputField, InputFieldPw } from './input'
import Label from './label'

interface InputProps {
  errors: any
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'password'
}

const FormInput: React.FC<InputProps> = ({ errors, id, label, placeholder, type = 'text' }) => {
  const { register } = useFormContext()
  const InputComponent = type === 'password' ? InputFieldPw : InputField

  return (
    <div className='space-y-1'>
      <Label htmlFor={id}>{label}</Label>
      <InputComponent id={id} placeholder={placeholder} {...register(id)} errorMessage={errors[id]?.message} />
    </div>
  )
}

const EmailInput: React.FC<{ errors: any }> = ({ errors }) => (
  <FormInput errors={errors} id={FORM_SIGN_AUTH.email} label='Email' placeholder='Your email' />
)

const PasswordInput: React.FC<{ errors: any }> = ({ errors }) => (
  <FormInput
    errors={errors}
    id={FORM_SIGN_AUTH.password}
    label='Password'
    placeholder='Your password'
    type='password'
  />
)

const TextInput: React.FC<{ errors: any }> = ({ errors }) => (
  <FormInput errors={errors} id={FORM_SIGN_AUTH.name} label='Name' placeholder='Your name' />
)

export { EmailInput, PasswordInput, TextInput }
