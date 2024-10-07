/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
'use client'

import { lazy, Suspense, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaCheck } from 'react-icons/fa'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

import Pagination from '@/components/Pagination'
import Button from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import userService from '@/service/user.service'
import { useUserStore } from '@/store/user.store'
import { IUser } from '@/types/user.type'

const EditModal = lazy(() => import('@/components/modal/EditModal'))
const DeleteModal = lazy(() => import('@/components/modal/DeleteModal'))

const UserManager = () => {
  const { user: currentUser } = useUserStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [checkedUsers, setCheckedUsers] = useState<string[]>([])
  const [isGridLayout, setIsGridLayout] = useState<boolean>(true)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAllUsers({ page: 1, limit: 10 }),
  })

  const filteredUsers: IUser[] = data?.data?.filter(
    (user: IUser) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedUsers(filteredUsers.map((user) => user._id))
    } else {
      setCheckedUsers([])
    }
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, user: IUser) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setCheckedUsers((prevState) => [...prevState, user._id])
    } else {
      setCheckedUsers((prevState) => prevState.filter((id) => id !== user._id))
    }
  }

  const handleToggleLayout = () => {
    setIsGridLayout(!isGridLayout)
  }

  if (isLoading) return <Loading size='large' className='mt-8' />

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex w-full items-center justify-between'>
        <h1 className='text-[20px] font-semibold text-[#202124]'>Request New Member</h1>
        <Button
          onClick={handleToggleLayout}
          className='ml-4 flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
        >
          {isGridLayout ? 'Convert to Table' : 'Show Grid Layout'}
        </Button>
      </div>

      {isGridLayout ? (
        <div className='mb-6 overflow-hidden rounded-t-xl shadow-md'>
          <div className='flex items-center gap-4 bg-gray-50'>
            <div className='px-6 py-3 text-left font-semibold'>
              <input type='checkbox' onChange={handleCheckAll} checked={checkedUsers.length === filteredUsers.length} />
            </div>
            {checkedUsers.length > 0 && (
              <>
                <div className='px-6 py-3 text-left font-semibold'>
                  <Button onClick={() => {}} className='rounded-full px-2 py-1 transition-all hover:bg-gray-100'>
                    <FaCheck />
                  </Button>
                </div>
                <div className='px-6 py-3 text-left font-semibold'>
                  <Button onClick={() => {}} className='rounded-full px-2 py-1 transition-all hover:bg-gray-100'>
                    <FiTrash2 />
                  </Button>
                </div>
              </>
            )}
            <div className='ml-auto'>
              <Pagination currentPage={data?.currentPage} totalPages={data?.totalPages} onPageChange={() => {}} />
            </div>
          </div>
          <table className='min-w-full bg-white'>
            <thead>
              <tr className='bg-primary/70 text-sm uppercase leading-normal text-white'>
                <th className='px-6 py-3 text-left font-semibold'>Name</th>
                <th className='px-6 py-3 text-left font-semibold'>Name</th>
                <th className='px-6 py-3 text-left font-semibold'>Email</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-600'>
              {filteredUsers?.map((user) => (
                <tr
                  key={user?._id}
                  onClick={() => handleEditUser(user)}
                  className='border-b border-gray-50 hover:bg-gray-100'
                >
                  <td className='px-6 py-4 text-start'>
                    {user._id !== currentUser?._id && (
                      <input
                        type='checkbox'
                        onClick={(e) => e.stopPropagation()}
                        checked={checkedUsers.includes(user._id)}
                        onChange={(e) => handleCheck(e, user)}
                      />
                    )}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.name}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='mb-6 flex flex-wrap items-center gap-4 bg-gray-50'>
          {filteredUsers?.map((user) => (
            <div key={user?._id} className='rounded-xl bg-white p-4 shadow-md'>
              <h2 className='text-lg font-semibold text-[#202124]'>{user.name}</h2>
              <p className='text-sm text-gray-600'>{user.email}</p>
              <div className='mt-4'>
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
              </div>
            </div>
          ))}
        </div>
      )}

      <Suspense fallback={<Loading size='large' className='fixed inset-0 z-[100] bg-black/10' />}>
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
