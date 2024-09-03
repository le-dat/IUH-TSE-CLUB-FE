/* eslint-disable no-unused-vars */
'use client'

import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { FORM_SIGN_AUTH } from '@/constants/form'
import { validationSignUpSchema } from '@/utils/validate'

import { EmailInput, PasswordInput, TextInput } from './ui/form'

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: any) => void
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm({
    resolver: yupResolver(validationSignUpSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await onCreate(data)
      toast.success('Item created successfully', {
        icon: '🎉',
      })
      reset()
      onClose()
    } catch (error) {
      console.error('Error creating item:', error)
      toast.error('Failed to create item', {
        icon: '❌',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create New Item'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <TextInput
            id={FORM_SIGN_AUTH.name}
            label='Name'
            placeholder='Enter your name'
            errors={errors}
            {...methods.register(FORM_SIGN_AUTH.name)}
          />
          <EmailInput
            id={FORM_SIGN_AUTH.email}
            label='Email'
            placeholder='Enter your email'
            errors={errors}
            {...methods.register(FORM_SIGN_AUTH.email)}
          />
          <PasswordInput
            id={FORM_SIGN_AUTH.password}
            label='Password'
            placeholder='Enter your password'
            errors={errors}
            {...methods.register(FORM_SIGN_AUTH.password)}
          />

          <div className='flex justify-end space-x-3'>
            <Button
              type='button'
              onClick={onClose}
              className='rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
              className='inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              {isLoading ? (
                'Creating...'
              ) : (
                <>
                  <FiPlus className='mr-2' />
                  Create
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default CreateModal
