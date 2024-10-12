'use client'
import { useState } from 'react'
import { FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi'

import Filter from '@/components/Filter'
import Button from '@/components/ui/button'

// interface Device {
//   id: string
//   name: string
//   description: string
//   status: string // Added status field
// }

const DeviceManager = () => {
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fakeData = [
    {
      id: '1',
      name: 'Laptop',
      description: 'For general use',
      status: 'available', // Added status field
    },
    {
      id: '2',
      name: 'Desktop',
      description: 'For heavy computing',
      status: 'borrowed', // Added status field
    },
  ]

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex w-full items-center justify-between gap-14'>
        <h1 className='gradient-text text-[20px] font-semibold'>Device Manager</h1>
        <Filter value={searchTerm} onChange={setSearchTerm} onTagSelect={() => {}} />

        <Button className='ml-4 flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'>
          <FiUserPlus className='mr-2' />
          Add Device
        </Button>
      </div>

      {fakeData.map((device) => (
        <div key={device.id} className='mb-6 flex flex-col gap-2'>
          <h2 className='text-[20px] font-semibold text-[#202124]'>{device.name}</h2>
          <div className='grid grid-cols-5 gap-4'>
            <div
              className={`rounded-lg p-4 shadow-md ${hoveredDevice === device.id ? 'bg-gray-100' : 'bg-white'} ${device.status === 'borrowed' ? 'bg-yellow-100' : ''} ${device.status === 'available' ? 'bg-green-100' : ''}`}
              onMouseEnter={() => setHoveredDevice(device.id)}
              onMouseLeave={() => setHoveredDevice(null)}
            >
              <p className='text-lg font-semibold'>{device.description}</p>
              <div className={`mt-4 grid grid-cols-2 gap-2`}>
                <Button className='flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'>
                  <FiEdit2 />
                </Button>
                <Button className='flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700'>
                  <FiTrash2 />
                </Button>
              </div>
              <div
                className={`mt-2 ${device.status === 'borrowed' ? 'text-yellow-500' : ''} ${device.status === 'available' ? 'text-green-500' : ''}`}
              >
                <span>
                  {device.status === 'borrowed' ? 'Borrowed' : device.status === 'available' ? 'Available' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeviceManager
