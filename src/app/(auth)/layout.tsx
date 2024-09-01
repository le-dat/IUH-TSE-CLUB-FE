import { Metadata } from 'next'
import Image from 'next/image'

import Intro from '@/components/ui/intro'
import Background from '@/images/auth/background.webp'

export const metadata: Metadata = {
  title: 'Everyone needs a place to be in Beicom',
  description: 'Everyone needs a place to be in Beicom.',
  icons: {
    icon: '/images/logo-mini.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='font-inter xs:h-auto relative flex h-dvh min-h-full w-full items-center justify-center overflow-auto overflow-x-hidden bg-purple-600 p-8'>
      <Image
        src={Background}
        alt='Auth image'
        fill
        draggable={false}
        className='absolute inset-0 z-0 rounded-l-xl object-fill'
      />
      <Intro />
      {children}
    </main>
  )
}
