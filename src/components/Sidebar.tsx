/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'

import { options } from '@/constants/filter'

import { FilterDate, FilterNumberComment } from './ui/filter'

const Sidebar = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  let lastScrollY = 0

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setScrollDirection('down')
    } else {
      setScrollDirection('up')
    }
    lastScrollY = window.scrollY
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        window.addEventListener('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }

    if (mediaQuery.matches) {
      window.addEventListener('scroll', handleScroll)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <aside
      className={`top-[70px] z-10 h-fit grow rounded-lg border border-primary bg-white p-4 shadow-xl transition-transform duration-300 lg:sticky lg:translate-y-0 lg:border-transparent lg:px-4 lg:py-6 lg:shadow-sm ${
        scrollDirection === 'up' ? 'translate-y-0' : '-translate-y-96'
      }`}
    >
      <div className='mb-2 text-xl font-semibold text-primary lg:mb-7'>Filter</div>
      <div className='mt-2 flex items-center gap-6 lg:mt-6 lg:flex-col lg:items-start'>
        <div className='text-lg font-semibold text-slate-800'>Date Posted</div>
        <FilterDate options={options} />
      </div>
      <div className='mt-2 flex items-center gap-6 lg:mt-6 lg:flex-col lg:items-start'>
        <div className='text-lg font-semibold text-slate-800'>Number of comments</div>
        <FilterNumberComment />
      </div>
    </aside>
  )
}

export default Sidebar
