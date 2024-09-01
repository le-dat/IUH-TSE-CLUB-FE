import Header from '@/components/Header'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='font-inter bg-[rgb(234,237,242)]'>
      <Header />
      <div className='flex min-h-screen w-full pt-[80px]'>{children}</div>
    </main>
  )
}
