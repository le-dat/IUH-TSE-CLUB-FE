'use client'

import Image from 'next/image'

import React, { forwardRef, useState } from 'react'

import HidePwIcon from '@/icons/auth/hide-pw.svg'
import ShowPwIcon from '@/icons/auth/show-pw.svg'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder: string
  name: string
  errorMessage?: string
}

const InputWrapper: React.FC<{
  id: string
  errorMessage?: string
  children: React.ReactNode
}> = ({ id, errorMessage, children }) => (
  <div className='relative flex flex-col'>
    <div className='relative flex h-12 w-full cursor-text items-center justify-between rounded-lg border-2 border-gray-200 bg-white text-base transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-md hover:border-purple-300'>
      {children}
    </div>
    {errorMessage && (
      <span className='mt-2 text-sm font-medium text-red-500' id={`${id}-error`}>
        {errorMessage}
      </span>
    )}
  </div>
)

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, placeholder, name, errorMessage, ...props }, ref) => (
    <InputWrapper id={id} errorMessage={errorMessage}>
      <input
        ref={ref}
        placeholder={placeholder}
        id={id}
        name={name}
        aria-describedby={`${id}-description`}
        aria-invalid={!!errorMessage}
        className='block h-full w-full rounded-lg px-4 py-3 text-base font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500'
        {...props}
      />
    </InputWrapper>
  )
)
InputField.displayName = 'InputField'

const InputFieldPw = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, placeholder, name, errorMessage, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toggleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setShowPassword((prev) => !prev)
    }

    return (
      <InputWrapper id={id} errorMessage={errorMessage}>
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          id={id}
          name={name}
          aria-describedby={`${id}-description`}
          aria-invalid={!!errorMessage}
          className='block h-full w-full rounded-lg px-4 py-3 pr-12 text-base font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500'
          {...props}
        />
        <button
          type='button'
          onClick={toggleShowPassword}
          className='absolute right-3 top-1/2 -translate-y-1/2 transform'
        >
          <Image
            src={showPassword ? HidePwIcon : ShowPwIcon}
            draggable={false}
            alt='Toggle password visibility'
            className='h-6 w-6 text-gray-500 transition-colors duration-200 hover:text-purple-500'
          />
        </button>
      </InputWrapper>
    )
  }
)
InputFieldPw.displayName = 'InputFieldPw'

export { InputField, InputFieldPw }
