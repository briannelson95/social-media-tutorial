"use client"

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '../../globals.css'
import { Inter } from 'next/font/google'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-6xl mx-auto`}>
        <SessionContextProvider
            supabaseClient={createBrowserSupabaseClient()}
            initialSession={null}
        >
            {children}
        </SessionContextProvider>
      </body>
    </html>
  )
}
