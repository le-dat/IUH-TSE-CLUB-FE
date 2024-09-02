import Image from 'next/image'

import React from 'react'

import SpinIcon from '@/icons/spinner.svg'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', className = '' }) => {
  const sizeMap = {
    small: 32,
    medium: 56,
    large: 80,
  }

  const dimensions = sizeMap[size]

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={SpinIcon}
        alt='Loading spinner'
        width={dimensions}
        height={dimensions}
        className='animate-spin object-contain'
      />
    </div>
  )
}

export default Loading
