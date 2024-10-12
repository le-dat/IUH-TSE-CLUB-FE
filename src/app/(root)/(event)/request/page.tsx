'use client'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { FiUserPlus } from 'react-icons/fi'

import Card from '@/components/Card'
import Button from '@/components/ui/button'
import { useUserStore } from '@/store/user.store'

const EventManager = () => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const { isAdmin } = useUserStore()

  const fakeData = [
    {
      id: '1',
      date: '2022-01-01',
      events: [
        {
          id: '1',
          title: 'New Year Celebration',
          description: 'Ring in the new year with us!',
          // status: 'pending', // Added status field
        },
        {
          id: '2',
          title: 'Winter Sale',
          description: 'Get ready for our winter sale!',
          // status: 'approved', // Added status field
        },
      ],
    },
  ]

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex w-full items-center justify-between gap-14'>
        <h1 className='gradient-text text-[20px] font-semibold'>Event Request</h1>

        {!isAdmin && (
          <Button className='ml-4 flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'>
            <FiUserPlus className='mr-2' />
            Add Event
          </Button>
        )}
      </div>

      {fakeData.map((event) => (
        <div key={event.id} className='mb-6 flex flex-col gap-2'>
          <h2 className='text-[20px] font-semibold text-[#202124]'>{format(parseISO(event.date), 'MMMM yyyy')}</h2>
          <div className='grid grid-cols-5 gap-4'>
            {event.events.map((subEvent) => (
              <Card event={subEvent} hoveredEvent={hoveredEvent} setHoveredEvent={setHoveredEvent} key={subEvent.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventManager
