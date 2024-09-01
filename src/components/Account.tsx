'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useId, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Tooltip } from 'react-tooltip'
import { toast } from 'sonner'

import { ROUTES } from '@/constants/routes'
import useClickOutside from '@/hooks/use-click-outside'
import DefaultAvatar from '@/images/default-avatar.png'
import authService from '@/service/auth.service'
import { useUserStore } from '@/store/user.store'
import { TokenStorage } from '@/utils/local-storage'

const Account = () => {
  const id = useId()
  const route = useRouter()
  const { setUser, setIsAuthenticated } = useUserStore()
  const { mutateAsync, isPending } = useMutation({ mutationFn: authService.logout })

  const boxRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  useClickOutside(boxRef, () => setIsOpen(false))

  const handleLogout = async () => {
    if (isPending) return
    await mutateAsync({ refreshToken: TokenStorage.getRefreshToken()! })
      .then(async () => {
        setUser(null)
        setIsAuthenticated(false)
        TokenStorage.clearToken()
        route.push(ROUTES.LOGIN)
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.message)
      })
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='relative flex h-12 w-20 items-center justify-end'>
        <button onClick={() => setIsOpen(true)} data-tooltip-id={id} className='overflow-hidden rounded-full shadow-md'>
          <Image src={DefaultAvatar} draggable={false} alt='logo-mini' className='size-[28px]' />
          {!isOpen && <Tooltip id={id} content='Your profile' delayShow={200} style={{ fontSize: 12 }} />}
        </button>

        {isOpen && (
          <div
            ref={boxRef}
            className='absolute right-0 top-[120%] w-[358px] rounded-md border bg-white p-[1rem] text-[rgba(46,54,96)] shadow-xl'
          >
            <button
              disabled={isPending}
              onClick={handleLogout}
              className='w-full p-2 transition-all hover:bg-[rgba(248,248,251)] disabled:cursor-not-allowed disabled:opacity-50'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Account
