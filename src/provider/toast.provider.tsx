import { Toaster } from 'sonner'

import 'react-tooltip/dist/react-tooltip.css'

interface IProps {
  children: React.ReactNode
}
const ToastProvider = ({ children }: IProps) => {
  return (
    <div>
      {children}
      <Toaster
        className='pointer-events-auto [&[data-close-button="true"]]:right-0'
        position='bottom-right'
        richColors
        closeButton
        duration={3000}
      />
    </div>
  )
}

export default ToastProvider
