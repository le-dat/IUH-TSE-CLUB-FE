/* eslint-disable no-unused-vars */
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

import useDebounce from '@/hooks/use-debounce'
import usePushParams from '@/hooks/use-push-params'
import { delay } from '@/utils/function'

const FilterDate = ({ options }: { options: { label: string; value: string }[] }) => {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const searchParams = useSearchParams()
  const date = searchParams.get('date') ?? ''
  const { pushParamsToUrl } = usePushParams()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value)
    await delay(800)
    pushParamsToUrl({ date: e.target.value })
  }

  useEffect(() => {
    setSelectedValue(date)
  }, [date])

  return (
    <div className='flex gap-[0.5rem] gap-x-4 lg:flex-col'>
      {options.map((option, index) => (
        <label key={index} className='flex w-fit items-center gap-x-2 text-[14px] leading-[21px] text-[rgb(46,54,96)]'>
          <input type='radio' value={option.value} checked={selectedValue === option.value} onChange={handleChange} />
          {option?.label}
        </label>
      ))}
    </div>
  )
}

const FilterNumberComment = () => {
  const [inputValue, setInputValue] = useState<number | ''>('')
  const router = useRouter()
  const debouncedValue = useDebounce(inputValue, 800)
  const searchParams = useSearchParams()
  const numberOfComments = searchParams.get('number_of_comments') ?? 0
  const { pushParamsToUrl } = usePushParams()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10)
    setInputValue(value)
  }

  useEffect(() => {
    if (debouncedValue !== '') {
      pushParamsToUrl({ number_of_comments: debouncedValue })
    }
  }, [debouncedValue, pushParamsToUrl, router])

  return (
    <input
      type='number'
      value={inputValue}
      onChange={handleChange}
      className='rounded border p-2'
      placeholder={numberOfComments ? numberOfComments : 'Enter a number...'}
    />
  )
}

export { FilterDate, FilterNumberComment }
