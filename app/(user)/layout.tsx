import Navigation from '@/components/Navigation'
import '../globals.css'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Tutorial',
  description: 'Social Media Tutorial using NextJS and Supabase',
}

export default function RootLayout({ children, }: { children: React.ReactNode}) {
  let session = true; //if this is false, user will be redirect to /login

  if (!session) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex min-h-screen max-w-4xl mx-auto mt-4'>
          <div className='grid grid-cols-3 gap-4 w-full'>
            <div className='sticky top-0'>
              <Navigation />
            </div>
            <div className='col-span-2'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
