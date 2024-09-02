'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import { InputField } from '@/components/ui/input'
import Label from '@/components/ui/label'

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Settings updated:', data)
      toast.success('Settings updated successfully')
    } catch (error) {
      console.error('Error updating settings:', error)
      toast.error('Failed to update settings')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-2xl font-bold'>Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <Label htmlFor='username'>Username</Label>
          <InputField
            id='username'
            {...register('username', { required: 'Username is required' })}
            placeholder='Enter your username'
          />
          {/* {errors?.username && <p className='mt-1 text-sm text-red-500'>{errors?.username?.message}</p>} */}
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <InputField
            id='email'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder='Enter your email'
          />
          {/* {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>} */}
        </div>
        <div>
          <Label htmlFor='notification'>Notification Preferences</Label>
          <select
            id='notification'
            {...register('notification')}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          >
            <option value='all'>All Notifications</option>
            <option value='important'>Important Only</option>
            <option value='none'>No Notifications</option>
          </select>
        </div>
        <div>
          <Label htmlFor='theme'>Theme</Label>
          <select
            id='theme'
            {...register('theme')}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          >
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
            <option value='system'>System Default</option>
          </select>
        </div>
        <Button
          type='submit'
          disabled={isLoading}
          className='hover:bg-primary-dark w-full rounded-lg bg-primary py-2 text-white transition duration-300'
        >
          {isLoading ? 'Updating...' : 'Update Settings'}
        </Button>
      </form>
    </div>
  )
}

export default SettingsPage
