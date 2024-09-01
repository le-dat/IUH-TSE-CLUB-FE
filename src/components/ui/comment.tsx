import Image from 'next/image'

import React from 'react'

import DefaultAvatar from '@/images/default-avatar.png'

interface CommentProps {
  content: string
}

const Comment: React.FC<CommentProps> = ({ content }) => {
  return (
    <div className='flex items-center gap-4'>
      <Image src={DefaultAvatar} alt='avatar' width={40} height={40} className='rounded-full shadow-sm' />

      <div className='flex w-full flex-col rounded-lg bg-[rgba(248,248,251)] text-[rgba(46,54,96)]'>
        <div className='relative overflow-hidden px-4 py-3 transition-all duration-200'>
          <p className='text-neutral-60 break-word text-base font-normal'>{content}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
