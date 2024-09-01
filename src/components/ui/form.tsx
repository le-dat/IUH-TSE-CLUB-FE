import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FORM_SIGN_AUTH } from '@/constants/form'

import { InputField, InputFieldPw } from './input'
import Label from './label'

const EmailInput: React.FC<{ errors: any }> = ({ errors }) => {
  const { register } = useFormContext()

  return (
    <div className='space-y-1'>
      <Label htmlFor={FORM_SIGN_AUTH.email}>Email</Label>
      <InputField
        id={FORM_SIGN_AUTH.email}
        placeholder='Your email'
        {...register(FORM_SIGN_AUTH.email)}
        errorMessage={errors[FORM_SIGN_AUTH.email]?.message}
      />
    </div>
  )
}

const PasswordInput: React.FC<{ errors: any }> = ({ errors }) => {
  const { register } = useFormContext()

  return (
    <div className='space-y-1'>
      <Label htmlFor={FORM_SIGN_AUTH.password}>Password</Label>
      <InputFieldPw
        id={FORM_SIGN_AUTH.password}
        placeholder='Your password'
        {...register(FORM_SIGN_AUTH.password)}
        errorMessage={errors[FORM_SIGN_AUTH.password]?.message}
      />
    </div>
  )
}

const TextInput: React.FC<{ errors: any }> = ({ errors }) => {
  const { register } = useFormContext()

  return (
    <div className='space-y-1'>
      <Label htmlFor={FORM_SIGN_AUTH.name}>Name</Label>
      <InputField
        id={FORM_SIGN_AUTH.name}
        placeholder='Your name'
        {...register(FORM_SIGN_AUTH.name)}
        errorMessage={errors[FORM_SIGN_AUTH.email]?.message}
      />
    </div>
  )
}

export { EmailInput, PasswordInput, TextInput }
