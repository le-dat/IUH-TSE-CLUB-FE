/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  initialData: {
    name: string
    email: string
    role: string
  }
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await onSave(data)
      toast.success('User updated successfully')
      onClose()
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Edit User'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          {/* <InputField
            id='name'
            label='Name'
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          /> */}
        </div>
        <div>
          {/* <InputField
            id='email'
            // label='Email'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
          /> */}
        </div>
        <div>
          <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
            Role
          </label>
          <select
            id='role'
            {...register('role', { required: 'Role is required' })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          >
            <option value='User'>User</option>
            <option value='Admin'>Admin</option>
          </select>
          {errors.role && <p className='mt-1 text-sm text-red-600'>{errors.role.message}</p>}
        </div>
        <div className='flex justify-end space-x-2'>
          <Button type='button' onClick={onClose} className='bg-gray-300 text-gray-800'>
            Cancel
          </Button>
          <Button type='submit' disabled={isLoading} className='bg-blue-500 text-white'>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditModal
