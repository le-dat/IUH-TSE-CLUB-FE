/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
'use client'

import { lazy, Suspense, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaUserPlus } from 'react-icons/fa'
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

import Pagination from '@/components/Pagination'
import Button from '@/components/ui/button'
import { InputField } from '@/components/ui/input'
import Label from '@/components/ui/label'
import Loading from '@/components/ui/loading'
import userService from '@/service/user.service'
import { useUserStore } from '@/store/user.store'
import { IUser, IUserWithPassword } from '@/types/user.type'

const CreateModal = lazy(() => import('@/components/modal/CreateModal'))
const EditModal = lazy(() => import('@/components/modal/EditModal'))
const DeleteModal = lazy(() => import('@/components/modal/DeleteModal'))

const UserManager = () => {
  const { user: currentUser } = useUserStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAllUsers({ page: 1, limit: 10 }),
  })

  const filteredUsers: IUser[] = data?.data?.filter(
    (user: IUser) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDeleteUser = (user: IUser) => {
    if (user._id === currentUser?._id) {
      toast.error('You cannot delete yourself')
      return
    }
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleCreate = async (data: IUserWithPassword) => {
    await userService.createUser(data)
    await refetch()
  }

  const handleEdit = async (data: IUser) => {
    await userService.updateUser({ id: selectedUser?._id as string, email: data.email, name: data.name })
    await refetch()
  }

  const handleDelete = async () => {
    if (!selectedUser) return
    try {
      const res = await userService.deleteUser({ id: selectedUser?._id })
      await refetch()
      setIsDeleteModalOpen(false)
      toast.success(res?.message)
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  if (isLoading) return <Loading size='large' className='mt-8' />

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex w-full items-center justify-between'>
        <h1 className='text-[20px] font-semibold text-[#202124]'>User Manager</h1>
        <Button
          onClick={handleAddUser}
          className='ml-4 flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
        >
          <FaUserPlus className='mr-2' />
          Add User
        </Button>
      </div>

      <div className='mb-6 flex items-center'>
        <div className='relative flex-grow'>
          <Label htmlFor='search' className='absolute left-3 top-1/2 z-[1] -translate-y-1/2 transform text-gray-400'>
            <FiSearch />
          </Label>
          <InputField
            id='search'
            name='search'
            placeholder='Search users...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='h-full w-full rounded-lg py-2 pl-10 pr-4 shadow-md focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary'
          />
        </div>
      </div>

      <div className='mb-6 overflow-hidden rounded-t-xl shadow-md'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr className='bg-primary/85 text-sm uppercase leading-normal text-white'>
              <th className='px-6 py-3 text-left font-semibold'>Name</th>
              <th className='px-6 py-3 text-left font-semibold'>Email</th>
              <th className='px-6 py-3 text-center font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-600'>
            {filteredUsers?.map((user) => (
              <tr key={user?._id} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.name}</td>
                <td className='px-6 py-4'>{user.email}</td>
                {user._id !== currentUser?._id && (
                  <td className='px-6 py-4 text-center'>
                    <Button
                      onClick={() => handleEditUser(user)}
                      className='mr-2 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600'
                    >
                      <FiEdit2 />
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(user)}
                      className='rounded-full bg-red-500 p-2 text-white hover:bg-red-600'
                    >
                      <FiTrash2 />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={data?.currentPage} totalPages={data?.totalPages} onPageChange={() => {}} />

      <Suspense fallback={<Loading size='large' className='fixed inset-0 z-[100] bg-black/10' />}>
        {isCreateModalOpen && (
          <CreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreate} />
        )}
        {isEditModalOpen && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            initialData={selectedUser!}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDelete}
            itemName={selectedUser?.name as string}
          />
        )}
      </Suspense>
    </div>
  )
}

export default UserManager
