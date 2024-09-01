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
  const [isOpen, setIsOpen] = useState(false)
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
      <div
        className={`relative flex h-10 min-w-[40px] flex-1 items-center justify-start gap-x-2 rounded-lg border bg-white before:w-1 before:flex-initial before:content-[''] focus-within:border-primary hover:border-primary`}
      >
        <label htmlFor={id} className='text-[rgba(68,79,142)]'>
          <SearchIcon className='size-[20px]' />
        </label>
        <input
          id={id}
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder='Search Content'
          className='disabled:text-neutral-20 block h-full w-full bg-transparent pr-2 text-sm font-normal text-[rgba(46,54,96)] outline-none placeholder:text-sm placeholder:text-[rgba(179,185,218)] placeholder-shown:truncate focus:border-primary disabled:cursor-not-allowed'
        />
        {isExistValue && (
          <button
            onClick={handleResetValue}
            className='absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-slate-100 p-1'
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={boxRef}
          className='absolute left-1/2 top-[120%] z-[1] w-[370px] -translate-x-1/2 transform rounded-md border bg-white p-[1rem] text-[rgba(46,54,96)] shadow-xl'
        >
          <div className='flex h-10 items-center justify-between p-2'>
            <span className='text-neutral-60 text-base font-semibold'>Recent searches</span>
            <span className='cursor-pointer text-sm font-semibold text-blue-500 hover:underline'>Clear all</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
