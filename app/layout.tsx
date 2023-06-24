import './globals.css'
import { Inter } from 'next/font/google'
import Session from '@/components/Auth/Session'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode}) {
    return (
        <html lang="en">
            <Session>
                <body className={`${inter.className} mb-24 md:mb-2`}>
                    {children}
                </body>
            </Session>
        </html>
    )
}
