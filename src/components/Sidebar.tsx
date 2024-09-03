'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { FiHome, FiLogOut, FiMenu, FiUsers } from 'react-icons/fi'
import { toast } from 'sonner'

import { ROUTES } from '@/constants/routes'
import LogoMini from '@/images/logo.svg'
import authService from '@/service/auth.service'
import { useUserStore } from '@/store/user.store'
import { TokenStorage } from '@/utils/local-storage'

import Button from './ui/button'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { setUser, setIsAuthenticated } = useUserStore()
  const { mutateAsync, isPending } = useMutation({ mutationFn: authService.logout })

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiUsers, label: 'Users', path: '/users' },
  ]

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
    <div
      className={`bg-banner hidden h-screen flex-col gap-3 bg-primary px-2 text-white transition-all duration-300 lg:flex ${isCollapsed ? 'w-16' : 'w-[260px]'} relative rounded-r-2xl shadow-lg`}
    >
      <div className='flex items-center justify-between px-2 py-4'>
        <div className='flex items-center'>
          <Link href={ROUTES.HOME} className='flex items-center gap-x-1.5'>
            <Image src={LogoMini} draggable={false} alt='logo-mini' className='size-[28px]' />
            {!isCollapsed && <div className='text-xl font-semibold italic'>DatBoard</div>}
          </Link>
        </div>
        <Button onClick={() => setIsCollapsed(!isCollapsed)} className='rounded-full p-2 hover:bg-secondary'>
          <FiMenu />
        </Button>
      </div>

      <nav className='overflow-y-auto overflow-x-hidden'>
        <ul className='flex flex-col gap-y-1'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`flex items-center gap-4 rounded-lg px-3 py-4 hover:bg-secondary ${pathname === item.path ? 'bg-secondary' : ''} `}
              >
                <div className='flex-shrink-0'>
                  <item.icon />
                </div>
                {!isCollapsed && <span className='transition-opacity duration-300'>{item.label}</span>}
              </Link>
            </li>
          ))}
          <li>
            <Button
              onClick={handleLogout}
              className='flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-secondary'
            >
              <div className='flex-shrink-0'>
                <FiLogOut />
              </div>
              {!isCollapsed && <span className='transition-opacity duration-300'>Logout</span>}
            </Button>
          </li>
        </ul>
      </nav>

      <div
        className={`mt-auto p-4 ${isCollapsed ? 'opacity-0' : 'opacity-100'} flex flex-col gap-2 transition-opacity duration-300`}
      >
        <a target='_blank' href={'https://ledat-portfolio.vercel.app'} className='text-sm hover:underline'>
          © 2024 Le Dat.{' '}
        </a>
        <p className='text-xs text-[#FDFCFB]'>All rights reserved.</p>
      </div>
    </div>
  )
}

export default Sidebar
