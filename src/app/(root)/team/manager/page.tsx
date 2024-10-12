/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
'use client'

import { lazy, Suspense, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaUserPlus } from 'react-icons/fa'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'
import Button from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import userService from '@/service/user.service'
import { useUserStore } from '@/store/user.store'
import { IUser } from '@/types/user.type'

const EditModal = lazy(() => import('@/components/modal/EditModal'))
const AcceptModal = lazy(() => import('@/components/modal/AcceptModal'))
const DeleteModal = lazy(() => import('@/components/modal/DeleteModal'))

const UserManager = () => {
  const { user: currentUser } = useUserStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [checkedUsers, setCheckedUsers] = useState<string[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`user-manager`],
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

  const handleAddUser = () => {
    setIsCreateModalOpen(true)
  }

  const handleApprove = async () => {
    if (!checkedUsers.length) {
      toast.error('Please select at least one user')
      return
    }
    try {
      // const res = await userService.approveUsers({ ids: checkedUsers })
      await refetch()
      setCheckedUsers([])
      setIsApproveModalOpen(false)
      // toast.success(res?.message)
    } catch (error) {
      console.error('Error approving users:', error)
      toast.error('Failed to approve users')
    }
  }

  const handleDelete = async () => {
    if (!selectedUser) return
    try {
      const res = await userService.deleteUser({ id: selectedUser?._id })
      await refetch()
      setIsDeleteModalOpen(false)
      setCheckedUsers([])
      toast.success(res?.message)
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedUsers(filteredUsers.filter((user) => user._id !== currentUser?._id).map((user) => user._id))
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

  const handleDeleteAll = async () => {
    if (!checkedUsers.length) {
      toast.error('Please select at least one user')
      return
    }
    try {
      // await userService.deleteUsers({ ids: checkedUsers })
      await refetch()
      setCheckedUsers([])
      toast.success('Users deleted successfully')
    } catch (error) {
      console.error('Error deleting users:', error)
      toast.error('Failed to delete users')
    }
  }

  if (isLoading) return <Loading size='large' className='mt-8' />

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex w-full items-center justify-between gap-14'>
        <h1 className='gradient-text text-[20px] font-semibold'>User Manager</h1>

        <div className='flex flex-1 items-center justify-center'>
          {checkedUsers.length > 0 ? (
            <Button
              onClick={handleDeleteAll}
              className='flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700'
            >
              <FiTrash2 />
              Delete
            </Button>
          ) : (
            <Filter value={searchTerm} onChange={setSearchTerm} onTagSelect={() => {}} />
          )}
        </div>

        <Button
          onClick={handleAddUser}
          className='ml-4 flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
        >
          <FaUserPlus className='mr-2' />
          Add User
        </Button>
      </div>
      <div className='mb-4 overflow-hidden rounded-t-xl shadow-md'>
        <table className='min-w-full cursor-pointer bg-white'>
          <thead>
            <tr className='bg-primary/85 text-sm uppercase leading-normal text-white'>
              <th className='px-6 py-3 text-left font-semibold'>
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    onChange={handleCheckAll}
                    checked={checkedUsers.length === filteredUsers.length - 1}
                    className='cursor-pointer'
                  />
                  {checkedUsers.length > 0 && '( ' + checkedUsers.length + ' )'}
                </div>
              </th>
              <th className='px-6 py-3 text-left font-semibold'>Name</th>
              <th className='px-6 py-3 text-left font-semibold'>Email</th>
              {checkedUsers.length === 0 && <th className='px-6 py-3 text-center font-semibold'>Actions</th>}
            </tr>
          </thead>
          <tbody className='text-sm text-gray-600'>
            {filteredUsers?.map((user) => (
              <tr key={user?._id} className='border-b border-gray-50 hover:bg-gray-100'>
                <td className='px-6 py-4 text-start'>
                  {user._id !== currentUser?._id && (
                    <input
                      type='checkbox'
                      onClick={(e) => e.stopPropagation()}
                      checked={checkedUsers.includes(user._id)}
                      onChange={(e) => handleCheck(e, user)}
                      className='cursor-pointer'
                    />
                  )}
                </td>
                <td className='whitespace-nowrap px-6 py-4 font-medium'>{user.name}</td>
                <td className='px-6 py-4'>{user.email}</td>
                {checkedUsers.length === 0 && (
                  <td className='px-6 py-4 text-center'>
                    {user._id !== currentUser?._id && (
                      <>
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
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={data?.currentPage} totalPages={data?.totalPages} onPageChange={() => {}} />

      <Suspense fallback={<Loading size='large' className='fixed inset-0 z-[100] bg-black/10' />}>
        {isEditModalOpen && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            initialData={selectedUser!}
          />
        )}
        {isApproveModalOpen && (
          <AcceptModal
            isOpen={isApproveModalOpen}
            onClose={() => setIsApproveModalOpen(false)}
            onSave={handleApprove}
            initialData={selectedUser!}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDelete}
            itemName={selectedUser?.name as string}
            itemNumber={checkedUsers.length}
          />
        )}
      </Suspense>
    </div>
  )
}

export default UserManager
