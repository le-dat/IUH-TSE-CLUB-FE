import Image from 'next/image'

import EmptyImg from '@/images/empty.png'

const Empty = () => {
  return (
    <div className='my-24 flex flex-col items-center justify-start gap-8 gap-y-6'>
      <Image src={EmptyImg} alt='empty' width={175} height={120} />
      <span className='text-sm font-normal text-[rgb(68,79,142)]'>
        Sorry, we couldn&apos;t find anything related to your search.
      </span>
    </div>
  )
}

export default Empty
