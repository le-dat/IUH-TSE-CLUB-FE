'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'sonner'

import { ROUTES } from '@/constants/routes'
import DefaultAvatar from '@/images/default-avatar.png'
import authService from '@/service/auth.service'
import { useUserStore } from '@/store/user.store'
import { TokenStorage } from '@/utils/local-storage'

import Button from './ui/button'

const Account = () => {
  const { user } = useUserStore()
  const router = useRouter()
  const { setUser, setIsAuthenticated } = useUserStore()
  const { mutateAsync, isPending } = useMutation({ mutationFn: authService.logout })

  const handleLogout = async () => {
    if (isPending) return
    try {
      await mutateAsync({ refreshToken: TokenStorage.getRefreshToken()! })
      setUser(null)
      setIsAuthenticated(false)
      TokenStorage.clearToken()
      router.push(ROUTES.LOGIN)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'An error occurred during logout')
    }
  }

  return (
    <div className='group relative flex items-center space-x-4'>
      <div className='flex flex-col text-end'>
        <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
        <p className='text-xs font-medium text-gray-500'>{user?.email}</p>
      </div>
      <div className='h-8 w-px bg-gray-300' />
      <div className='flex-shrink-0'>
        <Image
          src={DefaultAvatar}
          draggable={false}
          alt='User avatar'
          className='h-10 w-10 rounded-full border-[3px] object-cover shadow-lg'
        />
      </div>

      {/* Dropdown menu */}
      <div className='absolute right-0 top-[calc(100%+0.5rem)] z-[2] hidden rounded-lg border bg-white p-2 pt-3 shadow-lg hover:block group-hover:block'>
        <div className='absolute -top-2 right-0 h-6 w-12 -translate-y-1/2 bg-transparent' />
        <div className='absolute right-3 top-0 z-10 h-4 w-4 -translate-y-1/2 rotate-45 bg-white' />
        <div className='flex w-40 flex-col gap-2'>
          <Button
            onClick={handleLogout}
            className='flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-gray-200'
          >
            <div className='flex-shrink-0'>
              <FiLogOut />
            </div>
            <span className='transition-opacity duration-300'>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Account
