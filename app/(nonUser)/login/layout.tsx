import '../../globals.css';
import { Inter } from 'next/font/google';
import AuthComponent from '@/components/Auth/AuthComponent';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Login - Social Tutorial',
  description: 'Social Media Tutorial using NextJS and Supabase',
}

export default function LoginLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-6xl mx-auto`}>
        <AuthComponent>
          {children}
        </AuthComponent>
      </body>
    </html>
  )
}
