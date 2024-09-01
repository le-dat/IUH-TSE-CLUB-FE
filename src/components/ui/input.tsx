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
    <div className='relative flex h-10 w-full cursor-text items-center justify-between rounded-md border bg-white text-base focus-within:border-purple-50 focus:border-purple-50 focus-visible:border-purple-50'>
      {children}
    </div>
    {errorMessage && (
      <span className='mt-1 text-sm text-red-600' id={`${id}-error`}>
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
        className='block h-full w-full px-3 py-2 text-base font-normal text-[rgb(68,79,142)] placeholder:text-base placeholder:font-normal read-only:cursor-default focus-visible:outline-none disabled:font-normal'
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
          className='block h-full w-full px-3 py-2 text-base font-normal placeholder:text-base placeholder:font-normal read-only:cursor-default focus-visible:outline-none disabled:font-normal'
          {...props}
        />
        <button
          type='button'
          onClick={toggleShowPassword}
          className='absolute right-3 top-1/2 flex -translate-y-1/2 items-center space-x-1 text-[rgb(68,79,142)]'
        >
          <div className='flex cursor-pointer items-center justify-center'>
            <Image
              src={showPassword ? HidePwIcon : ShowPwIcon}
              draggable={false}
              alt='show-pw-icon'
              className='h-6 w-[25px]'
            />
          </div>
        </button>
      </InputWrapper>
    )
  }
)
InputFieldPw.displayName = 'InputFieldPw'

export { InputField, InputFieldPw }
