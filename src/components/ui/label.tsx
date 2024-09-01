'use client'

import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({ children, ...rest }) => (
  <label className='text-sm font-medium text-[rgb(68,79,142)] peer-disabled:cursor-not-allowed' {...rest}>
    {children}
  </label>
)

export default Label
