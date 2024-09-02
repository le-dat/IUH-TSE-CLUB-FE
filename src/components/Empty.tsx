import Image from 'next/image'

import { FiSearch } from 'react-icons/fi'

import EmptyImg from '@/images/empty.png'

const Empty: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center px-4 py-16 text-center'>
      <div className='relative mb-8'>
        <Image src={EmptyImg} alt='No results found' width={200} height={137} className='drop-shadow-md' />
        <div className='absolute -bottom-4 -right-4 rounded-full bg-white p-3 shadow-lg'>
          <FiSearch className='h-6 w-6 text-gray-400' />
        </div>
      </div>
      <h2 className='mb-2 text-2xl font-semibold text-gray-800'>No results found</h2>
      <p className='max-w-md text-base text-gray-600'>
        We couldn&apos;t find anything matching your search. Please try again with different keywords or filters.
      </p>
    </div>
  )
}

export default Empty
