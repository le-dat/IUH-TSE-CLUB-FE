'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

import Button from '@/components/ui/button'
import { InputField } from '@/components/ui/input'
import Loading from '@/components/ui/loading'

// Mock user service - replace with actual API call
const userService = {
  getUsers: async () => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
      // Add more mock users as needed
    ]
  },
}

const UserManager = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch users')
    }
  }, [error])

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <Loading size='large' className='mt-8' />

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-6 text-3xl font-bold text-gray-800'>User Manager</h1>
      <div className='mb-6 flex items-center'>
        <div className='relative flex-grow'>
          <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <InputField
            id='search'
            name='search'
            placeholder='Search users...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 pr-4'
          />
        </div>
        <Button className='ml-4 bg-green-500 px-4 py-2 text-white hover:bg-green-600'>Add User</Button>
      </div>

      <div className='overflow-hidden rounded-lg shadow-md'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr className='bg-gray-100 text-sm uppercase leading-normal text-gray-600'>
              <th className='px-6 py-3 text-left font-semibold'>Name</th>
              <th className='px-6 py-3 text-left font-semibold'>Email</th>
              <th className='px-6 py-3 text-left font-semibold'>Role</th>
              <th className='px-6 py-3 text-center font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-600'>
            {filteredUsers?.map((user) => (
              <tr key={user.id} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.name}</td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4'>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className='px-6 py-4 text-center'>
                  <Button
                    onClick={() => toast.info(`Edit user: ${user.name}`)}
                    className='mr-2 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600'
                  >
                    <FiEdit2 />
                  </Button>
                  <Button
                    onClick={() => toast.info(`Delete user: ${user.name}`)}
                    className='rounded-full bg-red-500 p-2 text-white hover:bg-red-600'
                  >
                    <FiTrash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManager
