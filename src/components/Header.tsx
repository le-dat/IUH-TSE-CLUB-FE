'use client'

import Account from './Account'
import Search from './Search'

const Header = () => {
  return (
    <header className='flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm lg:px-8 xl:px-12'>
      <div className='max-w-md flex-1'>
        <Search />
      </div>
      <div className='flex items-center space-x-4'>
        <Account />
      </div>
    </header>
  )
}

export default Header
