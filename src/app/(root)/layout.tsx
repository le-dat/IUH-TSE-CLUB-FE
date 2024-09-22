import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='font-inter flex w-full bg-[rgb(234,237,242)]'>
      <Sidebar />
      <div className='flex flex-1 flex-col gap-5'>
        <Header />
        <div className='no-scrollbar h-[90vh] overflow-y-auto'>{children}</div>
      </div>
    </main>
  )
}
