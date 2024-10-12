import { useSearchParams } from 'next/navigation'

import { useEffect, useId, useRef, useState } from 'react'

import useClickOutside from '@/hooks/use-click-outside'
import usePushParams from '@/hooks/use-push-params'

import { CloseIcon, SearchIcon } from './ui/icon'

const Search = () => {
  const id = useId()
  const searchParams = useSearchParams()
  const { pushParamsToUrl } = usePushParams()
  const [value, setValue] = useState<string>('')
  const isExistValue = value?.trim()?.length > 0
  const boxRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useClickOutside(boxRef, () => setIsOpen(false))

  const handleResetValue = () => setValue('')

  const handleSubmit = async () => {
    if (!isExistValue) return
    pushParamsToUrl({ content: value })
  }

  useEffect(() => {
    const content = searchParams.get('content')
    if (content) setValue(content)
  }, [searchParams])

  return (
    <div className='relative w-full'>
      <div className='group relative flex h-12 items-center overflow-hidden rounded-full border-2 border-gray-200 bg-white transition-all duration-300 focus-within:border-primary hover:border-primary hover:shadow-md'>
        <label htmlFor={id} className='ml-4 text-gray-400 transition-colors group-hover:text-primary'>
          <SearchIcon className='h-5 w-5' />
        </label>
        <input
          id={id}
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder='Search Content'
          className='h-full w-full bg-transparent px-3 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400'
        />
        {isExistValue && (
          <button
            onClick={handleResetValue}
            className='mr-2 rounded-full bg-gray-100 p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600'
          >
            <CloseIcon className='h-4 w-4' />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={boxRef}
          className='absolute left-1/2 top-[120%] z-10 w-[370px] -translate-x-1/2 transform rounded-lg border bg-white p-4 shadow-xl'
        >
          <div className='flex items-center justify-between'>
            <span className='text-base font-semibold text-gray-700'>Recent searches</span>
            <button className='text-sm font-medium text-blue-500 hover:text-blue-600 hover:underline'>Clear all</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
