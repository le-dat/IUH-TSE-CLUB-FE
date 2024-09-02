/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: any) => void
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    // register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm()

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
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          {/* <InputField
            id='name'
            label='Name'
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
            className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          /> */}
        </div>
        <div>
          {/* <InputField
            id='description'
            label='Description'
            {...register('description')}
            className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          /> */}
        </div>
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
    </Modal>
  )
}

export default CreateModal
