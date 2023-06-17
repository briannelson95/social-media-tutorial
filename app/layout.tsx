"use client"
import AuthComponent from '@/components/Auth/AuthComponent'
import './globals.css'
import { Inter } from 'next/font/google'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '@/lib/supabaseClient'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode}) {
    return (
        <html lang="en">
            <SessionContextProvider
                supabaseClient={supabase}
                initialSession={null}
            >
                <body className={`${inter.className} mb-24 md:mb-2`}>
                    {children}
                </body>
            </SessionContextProvider>
        </html>
    )
}