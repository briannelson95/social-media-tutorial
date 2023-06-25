import Navigation from '@/components/Navigation'
import '../globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Tutorial',
  description: 'Social Media Tutorial using NextJS and Supabase',
}

export default function RootLayout({ children, }: { children: React.ReactNode}) {

  return (
    <main className={`${inter.className} mb-24 md:mb-2`}>
      <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      </div>
      <div className='flex min-h-screen max-w-4xl mx-auto mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          <div className='fixed bottom-0 md:sticky md:top-0 z-10'>
            <Navigation />
          </div>
          <div className='col-span-1 mx-3 md:mx-0 md:col-span-2'>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
