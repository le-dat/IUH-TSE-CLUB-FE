'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants/routes'

import { CommunicateIcon, HomeIcon } from './ui/icon'
import Tab from './ui/tab'

const pages = [
  { path: ROUTES.HOME, label: 'Newsfeed', icon: <HomeIcon /> },
  { path: ROUTES.COMMUNICATE, label: 'Communicate', icon: <CommunicateIcon /> },
]

const Tabs = () => {
  const pathName = usePathname()

  return (
    <div className='hidden items-center text-primary lg:flex'>
      {pages.map((item, index) => {
        const isActive = item.path === pathName
        return (
          <Tab key={index} path={item.path} label={item.label} icon={item.icon} isActive={isActive} index={index} />
        )
      })}
    </div>
  )
}

export default Tabs
