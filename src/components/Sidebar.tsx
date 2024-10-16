'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'

import { AUTHOR_PORTFOLIO_LINK } from '@/constants/link'
import { ROUTES } from '@/constants/routes'
import { adminMenu } from '@/constants/sidebar'
import LogoMini from '@/images/logo.svg'

import Button from './ui/button'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const pathname = usePathname()

  return (
    <div
      className={`bg-banner hidden h-screen flex-col gap-3 bg-primary px-2 text-white transition-all duration-300 lg:flex ${isCollapsed ? 'w-16' : 'w-[260px]'} relative rounded-r-2xl shadow-lg`}
    >
      <div className='flex items-center justify-between px-2 py-4'>
        <div className='flex items-center'>
          <Link href={ROUTES.HOME} className='flex items-center gap-x-1.5'>
            <Image src={LogoMini} draggable={false} alt='logo-mini' className='size-[28px]' />
            {!isCollapsed && <div className='gradient-secondary-text text-xl font-semibold italic'>IT CLUB</div>}
          </Link>
        </div>
        <Button onClick={() => setIsCollapsed(!isCollapsed)} className='rounded-full p-2 hover:bg-secondary'>
          <IoIosArrowBack className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <nav className='overflow-y-auto overflow-x-hidden'>
        <ul className='flex flex-col gap-y-1'>
          {adminMenu.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                {item.submenu ? (
                  <button
                    onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)}
                    className={`flex w-full items-center gap-4 rounded-lg px-3 py-4 font-medium hover:bg-secondary ${openSubmenu === index ? 'bg-secondary' : ''}`}
                  >
                    <div className='flex-shrink-0'>
                      <item.icon />
                    </div>
                    {!isCollapsed && <span className='transition-opacity duration-300'>{item.label}</span>}
                    <IoIosArrowDown
                      className={`ml-auto transition-transform duration-300 ${openSubmenu === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-4 rounded-lg px-3 py-4 font-medium hover:bg-secondary ${pathname === item.path ? 'bg-secondary' : ''}`}
                  >
                    <div className='flex-shrink-0'>
                      <item.icon />
                    </div>
                    {!isCollapsed && <span className='transition-opacity duration-300'>{item.label}</span>}
                  </Link>
                )}
              </li>
              {item.submenu &&
                openSubmenu === index &&
                item.submenu.map((submenuItem, submenuIndex) => (
                  <li key={submenuIndex}>
                    <Link
                      href={submenuItem.path}
                      className={`flex items-center gap-4 rounded-lg px-3 py-4 hover:bg-secondary ${pathname === submenuItem.path ? 'bg-secondary' : ''} ml-4`}
                    >
                      <div className='flex-shrink-0'>{submenuItem.icon ? <submenuItem.icon /> : <item.icon />}</div>
                      {!isCollapsed && <span className='transition-opacity duration-300'>{submenuItem.label}</span>}
                    </Link>
                  </li>
                ))}
            </React.Fragment>
          ))}
        </ul>
      </nav>

      <div
        className={`mt-auto p-4 ${isCollapsed ? 'opacity-0' : 'opacity-100'} flex flex-col gap-2 transition-opacity duration-300`}
      >
        <a target='_blank' href={AUTHOR_PORTFOLIO_LINK} className='text-sm hover:underline'>
          © 2024 Le Dat.{' '}
        </a>
        <p className='text-xs text-[#FDFCFB]'>All rights reserved.</p>
      </div>
    </div>
  )
}

export default Sidebar
