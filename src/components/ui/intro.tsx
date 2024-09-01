import Image from 'next/image'

import React from 'react'

import { features } from '@/constants/intro'
import CheckIcon from '@/icons/auth/check.svg'
import Logo from '@/images/logo-white.webp'

interface FeatureProps {
  icon: string
  title: string
  description: string
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className='flex gap-4 text-white'>
    <Image src={icon} draggable={false} alt='check-icon' className='size-6 text-white' />
    <div className='space-y-1'>
      <div className='text-base font-semibold text-white'>{title}</div>
      <div className='text-sm font-normal text-white'>{description}</div>
    </div>
  </div>
)

const Intro: React.FC = () => {
  return (
    <div className='relative z-[1] mr-8 hidden w-[31.25rem] space-y-6 lg:mr-[124px] lg:block'>
      <Image src={Logo} draggable={false} alt='check-icon' className='h-[56px] w-[174px] text-white' />

      {features.map((feature, index) => (
        <Feature key={index} icon={CheckIcon} title={feature.title} description={feature.description} />
      ))}
    </div>
  )
}

export default Intro
