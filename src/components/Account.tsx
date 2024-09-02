'use client'

import Image from 'next/image'

import DefaultAvatar from '@/images/default-avatar.png'
import { useUserStore } from '@/store/user.store'

const Account = () => {
  const { user } = useUserStore()

  return (
    <div className='flex items-center space-x-4'>
      <div className='flex flex-col'>
        <p className='text-sm font-medium text-gray-900'>User</p>
        <p className='text-xs font-medium text-gray-500'>{user?.email}</p>
      </div>
      <div className='h-8 w-px bg-gray-300'></div>
      <div className='flex-shrink-0'>
        <Image
          src={DefaultAvatar}
          draggable={false}
          alt='User avatar'
          className='h-10 w-10 rounded-full border-[3px] object-cover shadow-lg'
        />
      </div>
    </div>
  )
}

export default Account
