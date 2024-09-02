export const dynamic = 'force-dynamic'

import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Serif, Inter } from 'next/font/google'

import ProtectRouter from '@/provider/protect-router'
import ReactQueryProvider from '@/provider/react-query.provider'
import ToastProvider from '@/provider/toast.provider'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif',
})

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Best admin page for managing the dashboard.',
  icons: {
    icon: '/images/logo.svg',
  },
  openGraph: {
    title: 'Dashboard',
    description: 'Best admin page for managing the dashboard.',
    siteName: 'Dat Dashboard',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: '100%',
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <ReactQueryProvider>
          <ProtectRouter>
            <ToastProvider>{children}</ToastProvider>
          </ProtectRouter>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
