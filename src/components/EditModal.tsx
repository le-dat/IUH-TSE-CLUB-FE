/* eslint-disable no-unused-vars */
'use client'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import { EmailInput, TextInput } from '@/components/ui/form'
import Modal from '@/components/ui/modal'
import { IUser } from '@/types/user.type'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  initialData: IUser
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const methods = useForm({
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await onSave(data)
      toast.success('User updated successfully', {
        icon: '🎉',
      })
      onClose()
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user', {
        icon: '❌',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Edit User'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <TextInput
            id='name'
            label='Name'
            placeholder='Enter user name'
            errors={errors}
            {...methods.register('name')}
          />
          <EmailInput
            id='email'
            label='Email'
            placeholder='Enter user email'
            errors={errors}
            {...methods.register('email')}
          />
          <div className='mt-4 flex justify-end space-x-2'>
            <Button
              type='button'
              onClick={onClose}
              className='rounded-md bg-gray-300 px-4 py-2 text-gray-800 transition duration-150 ease-in-out hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
              className={`rounded-md px-4 py-2 text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isLoading ? 'cursor-not-allowed bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default EditModal
