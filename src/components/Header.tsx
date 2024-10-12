'use client'

import dynamic from 'next/dynamic'

// const Search = dynamic(() => import('./Search'), { ssr: false })
const Account = dynamic(() => import('./Account'), { ssr: false })

const Header = () => {
  return (
    <header className='flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm lg:px-8 xl:px-12'>
      <div className='ml-auto flex items-center space-x-4'>
        <Account />
      </div>
    </header>
  )
}

export default Header
