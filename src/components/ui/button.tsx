import React, { useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleMouseDown = () => setIsLoading(true)
  const handleMouseUp = () => setIsLoading(false)

  return (
    <button
      style={{ transform: isLoading ? 'scale(0.9)' : 'scale(1)' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
