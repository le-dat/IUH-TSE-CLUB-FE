import { Metadata } from 'next'
import Image from 'next/image'

import BackgroundGif from '@/images/auth/background.gif'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Best admin page for managing the dashboard.',
  icons: {
    icon: '/images/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='font-inter xs:h-auto relative grid h-dvh min-h-full w-full grid-cols-1 overflow-auto overflow-x-hidden bg-gray p-8 lg:grid-cols-2'>
      <div className='flex items-center justify-center'>
        <Image src={BackgroundGif} alt='Auth image' draggable={false} className='relative z-[1] rounded-lg shadow-xl' />
      </div>
      <div className='flex items-center justify-center'>{children}</div>
    </main>
  )
}
