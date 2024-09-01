'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import LogoMini from '@/images/logo-mini.webp'
import Logo from '@/images/logo-purple.webp'

import Account from './Account'
import Search from './Search'
import Tabs from './Tabs'

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-10 grid h-[60px] w-screen grid-cols-[1fr_3fr_1fr] gap-x-2 border-b bg-white px-6 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-x-6 xl:gap-x-12 xl:px-12'>
      <div className='flex items-center'>
        <Link href={ROUTES.HOME} className='flex items-center gap-x-1.5'>
          <Image src={LogoMini} draggable={false} alt='logo-mini' className='size-[28px]' />
          <Image src={Logo} draggable={false} alt='logo' className='hidden h-[22.5px] w-[110px] lg:block' />
        </Link>
      </div>

      <div className='flex h-full items-center gap-x-6'>
        <Tabs />
        <Search />
      </div>

      <Account />
    </header>
  )
}

export default Header
