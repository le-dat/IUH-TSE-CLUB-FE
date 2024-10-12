'use client'

import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  itemName: string
  itemNumber?: number
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, itemName, itemNumber }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col items-center'>
        <FiAlertTriangle className='mb-4 text-5xl text-red-500' />
        <h3 className='mb-2 text-lg font-semibold text-gray-900'>
          Are you sure you want to delete {itemNumber ? `${itemNumber} items` : `"${itemName}"`}
        </h3>
        <p className='mb-6 text-center text-sm text-gray-500'>This action cannot be undone.</p>
        <div className='flex w-full justify-center space-x-4'>
          <Button
            onClick={onClose}
            className='rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300'
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            className='rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600'
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
