/* eslint-disable no-unused-vars */

import { usePathname } from 'next/navigation'

import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import { color, config } from '@/constants/card'
import { useUserStore } from '@/store/user.store'

import Button from './ui/button'

interface SubEvent {
  id: string
  title: string
  description: string
  status?: string
}

const Card: React.FC<{
  event: SubEvent
  hoveredEvent: string | null
  setHoveredEvent: (id: string | null) => void
}> = ({ event, hoveredEvent, setHoveredEvent }) => {
  const background = config?.[event.status as keyof typeof config]?.bg || color?.default
  const text = config?.[event.status as keyof typeof config]?.text || ''
  const textColor = config?.[event.status as keyof typeof config]?.color || color?.default

  const { isAdmin } = useUserStore()
  const pathName = usePathname()
  const isHasRequestUrl = pathName.includes('request')

  return (
    <div
      className={`rounded-lg p-4 shadow-md ${hoveredEvent === event.id ? color.hover : ''} ${background}`}
      onMouseEnter={() => setHoveredEvent(event.id)}
      onMouseLeave={() => setHoveredEvent(null)}
    >
      <h3 className='text-lg font-semibold'>{event.title}</h3>
      <p className='text-gray-600'>{event.description}</p>
      <div className={`mt-4 grid grid-cols-2 gap-2`}>
        {isAdmin && isHasRequestUrl ? (
          <Button className='flex items-center justify-center rounded-lg border-2 border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white'>
            <FaCheck />
          </Button>
        ) : (
          <Button className='flex items-center justify-center rounded-lg border-2 border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white'>
            <FiEdit2 />
          </Button>
        )}
        <Button className='flex items-center justify-center rounded-lg border-2 border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white'>
          <FiTrash2 />
        </Button>
      </div>
      <div className={`mt-3`}>
        <span className={` ${textColor}`}>{text}</span>
      </div>
    </div>
  )
}

export default Card
